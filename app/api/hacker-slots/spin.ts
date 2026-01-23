/**
 * Hacker Slots - Server-Side Spin API
 * Provably Fair RNG Implementation with Prize Pool Protection
 */

import { json } from '@remix-run/node';
import crypto from 'crypto';
import prizeConfig from '../../../../prize-config.json';
import { PrizePoolManager } from '../../../lib/prizePool.js';

// In production, store server seeds in database
const SERVER_SEEDS = new Map();

export async function action({ request }) {
    if (request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, { status: 405 });
    }

    try {
        const { clientSeed, nonce } = await request.json();

        // Validate inputs
        if (!clientSeed || !nonce) {
            return json({ error: 'Missing clientSeed or nonce' }, { status: 400 });
        }

        // Get customer from session (Hydrogen provides this)
        const customer = await getCustomer(request);
        if (!customer) {
            return json({ error: 'Not authenticated' }, { status: 401 });
        }

        // Get customer's current credits
        const currentCredits = await getCustomerCredits(customer.id);
        if (currentCredits < 1) {
            return json({ error: 'Insufficient credits' }, { status: 400 });
        }

        // Initialize prize pool manager
        const poolBalance = await getPr izePoolBalance();
        const poolManager = new PrizePoolManager();
        poolManager.balance = poolBalance;

        // Generate server seed (or get existing one for this session)
        const serverSeed = getOrCreateServerSeed(customer.id);

        // Generate provably fair result
        const gridResult = generateProvablyFairGrid(serverSeed, clientSeed, nonce);

        // Check for potential wins
        const potentialPrize = checkWinningCombinations(gridResult, poolManager);

        // Calculate new balance
        let newBalance = currentCredits - 1; // Deduct spin cost
        let prizeAwarded = null;

        if (potentialPrize) {
            // Check if pool can afford the prize
            if (poolManager.canAwardPrize(potentialPrize)) {
                prizeAwarded = potentialPrize;

                // Award from pool (deduct cost)
                const poolResult = poolManager.awardPrize(potentialPrize);
                await updatePrizePoolBalance(poolManager.balance);

                // Add credits if prize is credits
                if (potentialPrize.type === 'game_credits') {
                    newBalance += potentialPrize.value;
                }

                // Log prize for fulfillment (physical prizes)
                if (potentialPrize.type === 'physical_prize') {
                    await logPrizeForFulfillment(customer.id, potentialPrize, nonce);
                }
            } else {
                // Pool can't afford prize, give consolation credits
                console.log(`Prize ${potentialPrize.name} won but pool insufficient ($${poolManager.balance} < $${potentialPrize.actualCost}). Giving consolation.`);
                newBalance += 2; // 2 free credits as consolation
                prizeAwarded = {
                    id: 'consolation',
                    name: 'Consolation Prize',
                    description: 'Prize pool building up! Here are 2 free credits.',
                    type: 'game_credits',
                    value: 2,
                };
            }
        }

        // Update customer credits
        await updateCustomerCredits(customer.id, newBalance);

        // Rotate server seed after revealing
        const revealedServerSeed = serverSeed;
        rotateServerSeed(customer.id);

        // Log spin for audit trail
        await logSpin({
            customerId: customer.id,
            serverSeed: revealedServerSeed,
            clientSeed,
            nonce,
            grid: gridResult,
            prize: prizeAwarded,
            poolBalance: poolManager.balance,
            timestamp: new Date().toISOString(),
        });

        return json({
            success: true,
            grid: gridResult,
            prize: prizeAwarded,
            newBalance,
            nonce,
            revealedServerSeed,
            poolBalance: poolManager.balance,
        });

    } catch (error) {
        console.error('Spin error:', error);
        return json({ error: 'Spin failed' }, { status: 500 });
    }
}

/**
 * Generate provably fair grid using SHA-256
 */
function generateProvablyFairGrid(serverSeed, clientSeed, nonce) {
    const combined = `${serverSeed}:${clientSeed}:${nonce}`;
    const hash = crypto.createHash('sha256').update(combined).digest('hex');

    // Convert hash to grid (5x5 = 25 cells)
    const grid = [];

    for (let row = 0; row < 5; row++) {
        const gridRow = [];
        for (let col = 0; col < 5; col++) {
            const index = row * 5 + col;
            // Use each character of hash to determine symbol
            // Even hex digits = '0', odd = '1'
            const hexChar = hash[index % hash.length];
            const value = parseInt(hexChar, 16);
            gridRow.push(value % 2 === 0 ? '0' : '1');
        }
        grid.push(gridRow);
    }

    return grid;
}

/**
 * Check grid for winning combinations
 * Only return prizes if they meet pool requirements
 */
function checkWinningCombinations(grid, poolManager) {
    // Get prizes that are available based on pool balance
    const availablePrizes = poolManager.getAvailablePrizes(prizeConfig.prizes);

    // Sort by value (highest first) to check best prizes first
    const sortedPrizes = [...availablePrizes].sort((a, b) => b.value - a.value);

    for (const prize of sortedPrizes) {
        const pattern = prizeConfig.patterns[prize.pattern];
        if (!pattern) continue;

        const isWin = validatePattern(grid, pattern);
        if (isWin) {
            // Probability check (for patterns that match too often)
            const roll = Math.random();
            if (roll < prize.probability) {
                return prize;
            }
        }
    }

    return null;
}

/**
 * Validate pattern against grid
 */
function validatePattern(grid, pattern) {
    const { validator, params } = pattern;

    switch (validator) {
        case 'checkAllSame':
            return checkAllSame(grid, params);
        case 'checkLines':
            return checkLines(grid, params);
        case 'checkDiagonals':
            return checkDiagonals(grid, params);
        case 'checkCluster':
            return checkCluster(grid, params);
        default:
            return false;
    }
}

function checkAllSame(grid, { symbol, count }) {
    let matches = 0;
    for (const row of grid) {
        for (const cell of row) {
            if (cell === symbol) matches++;
        }
    }
    return matches >= count;
}

function checkLines(grid, { length, directions }) {
    // Check horizontal
    if (directions.includes('horizontal')) {
        for (const row of grid) {
            if (hasConsecutive(row, length)) return true;
        }
    }

    // Check vertical
    if (directions.includes('vertical')) {
        for (let col = 0; col < 5; col++) {
            const column = grid.map(row => row[col]);
            if (hasConsecutive(column, length)) return true;
        }
    }

    // Check diagonals
    if (directions.includes('diagonal')) {
        return checkDiagonals(grid, { length });
    }

    return false;
}

function checkDiagonals(grid, { length }) {
    // Main diagonal (top-left to bottom-right)
    const mainDiag = grid.map((row, i) => row[i]);
    if (hasConsecutive(mainDiag, length)) return true;

    // Anti-diagonal (top-right to bottom-left)
    const antiDiag = grid.map((row, i) => row[4 - i]);
    if (hasConsecutive(antiDiag, length)) return true;

    return false;
}

function checkCluster(grid, { size }) {
    // Check for size x size cluster of matching symbols
    for (let row = 0; row <= 5 - size; row++) {
        for (let col = 0; col <= 5 - size; col++) {
            const firstSymbol = grid[row][col];
            let isCluster = true;

            for (let r = row; r < row + size; r++) {
                for (let c = col; c < col + size; c++) {
                    if (grid[r][c] !== firstSymbol) {
                        isCluster = false;
                        break;
                    }
                }
                if (!isCluster) break;
            }

            if (isCluster) return true;
        }
    }

    return false;
}

function hasConsecutive(arr, length) {
    if (arr.length < length) return false;

    for (let i = 0; i <= arr.length - length; i++) {
        const slice = arr.slice(i, i + length);
        if (slice.every(val => val === slice[0])) {
            return true;
        }
    }

    return false;
}

/**
 * Server Seed Management
 */
function getOrCreateServerSeed(customerId) {
    if (!SERVER_SEEDS.has(customerId)) {
        const seed = crypto.randomBytes(32).toString('hex');
        SERVER_SEEDS.set(customerId, seed);
    }
    return SERVER_SEEDS.get(customerId);
}

function rotateServerSeed(customerId) {
    const newSeed = crypto.randomBytes(32).toString('hex');
    SERVER_SEEDS.set(customerId, newSeed);
}

/**
 * Customer Credit Management (implement with Shopify API)
 */
async function getCustomer(request) {
    // TODO: Implement with Hydrogen's customer session
    // This is a placeholder
    return { id: 'customer_123', email: 'user@example.com' };
}

async function getCustomerCredits(customerId) {
    // TODO: Fetch from Shopify customer metafield
    // Example: customer.metafield.namespace = 'game'
    //          customer.metafield.key = 'credits'
    return 100; // Placeholder
}

async function updateCustomerCredits(customerId, newBalance) {
    // TODO: Update Shopify customer metafield
    console.log(`Updated ${customerId} credits to ${newBalance}`);
}

async function logSpin(spinData) {
    // TODO: Store in database for audit trail
    console.log('Spin logged:', spinData);
}

/**
 * Prize Pool Database Functions
 */
async function getPrizePoolBalance() {
    // TODO: Fetch from database or Shopify shop metafield
    // For demo, return a starting value
    return 250; // $250 - enables small/medium prizes
}

async function updatePrizePoolBalance(newBalance) {
    // TODO: Update in database
    console.log(`Prize pool updated to $${newBalance.toFixed(2)}`);
}

async function logPrizeForFulfillment(customerId, prize, nonce) {
    // TODO: Create fulfillment record in database
    // This should trigger an admin notification to send the physical prize
    console.log(`🎁 PRIZE FULFILLMENT NEEDED: Customer ${customerId} won ${prize.name} (cost: $${prize.actualCost}) at nonce ${nonce}`);
    // You might want to:
    // 1. Create a Shopify draft order
    // 2. Send email to admin
    // 3. Add to fulfillment queue
}
