/**
 * Prize Pool Manager
 * Ensures you NEVER pay out of pocket
 */

const REVENUE_ALLOCATION = {
  PRIZE_POOL: 0.50,    // 50% to prize pool
  PROFIT: 0.42,        // 42% your profit
  OPERATING: 0.08,     // 8% operations/fees
};

export class PrizePoolManager {
  constructor() {
    this.balance = 0;
    this.totalRevenue = 0;
    this.totalPaidOut = 0;
  }

  /**
   * Add credit purchase to pool
   * @param {number} amount - Dollar amount of purchase
   */
  addPurchase(amount) {
    const toPool = amount * REVENUE_ALLOCATION.PRIZE_POOL;
    const toProfit = amount * REVENUE_ALLOCATION.PROFIT;
    const toOperating = amount * REVENUE_ALLOCATION.OPERATING;
    
    this.balance += toPool;
    this.totalRevenue += amount;
    
    return {
      addedToPool: toPool,
      yourProfit: toProfit,
      operating: toOperating,
      newPoolBalance: this.balance,
    };
  }

  /**
   * Check if prize can be awarded (pool has sufficient funds)
   * @param {object} prize - Prize from config
   * @returns {boolean}
   */
  canAwardPrize(prize) {
    // Free prizes (credits) always available
    if (prize.actualCost === 0) {
      return true;
    }
    
    // Check if pool meets minimum requirement
    if (this.balance < prize.poolRequired) {
      return false;
    }
    
    // Check if pool can afford the prize
    return this.balance >= prize.actualCost;
  }

  /**
   * Award prize (deduct from pool)
   * @param {object} prize
   * @returns {object}
   */
  awardPrize(prize) {
    if (!this.canAwardPrize(prize)) {
      throw new Error(`Prize pool cannot afford ${prize.name}`);
    }
    
    // Deduct actual cost from pool (not perceived value)
    const cost = prize.actualCost;
    this.balance -= cost;
    this.totalPaidOut += cost;
    
    return {
      prizeName: prize.name,
      cost,
      newPoolBalance: this.balance,
      remainingBalance: this.balance,
    };
  }

  /**
   * Get available prizes based on current pool balance
   * @param {array} allPrizes - All prizes from config
   * @returns {array} - Only prizes that can be awarded
   */
  getAvailablePrizes(allPrizes) {
    return allPrizes.filter(prize => this.canAwardPrize(prize));
  }

  /**
   * Get pool statistics
   */
  getStats() {
    return {
      currentBalance: this.balance,
      totalRevenue: this.totalRevenue,
      totalPaidOut: this.totalPaidOut,
      netProfit: this.totalRevenue * REVENUE_ALLOCATION.PROFIT,
      healthRatio: this.balance / this.totalRevenue,
    };
  }

  /**
   * Get prize tier status
   */
  getTierStatus() {
    return {
      alwaysAvailable: true,
      smallPhysical: this.balance >= 50,
      mediumPhysical: this.balance >= 200,
      premiumPhysical: this.balance >= 1000,
      jackpot: this.balance >= 2000,
    };
  }
}

/**
 * Calculate expected RTP based on available prizes
 */
export function calculateDynamicRTP(availablePrizes) {
  let expectedReturn = 0;
  
  for (const prize of availablePrizes) {
    const contribution = prize.probability * prize.value;
    expectedReturn += contribution;
  }
  
  return expectedReturn; // This is expected return per spin
}

/**
 * Example usage in your spin API:
 * 
 * const poolManager = new PrizePoolManager();
 * poolManager.balance = await getPoolBalanceFromDB();
 * 
 * // When user wins
 * if (prizeWon && poolManager.canAwardPrize(prizeWon)) {
 *   poolManager.awardPrize(prizeWon);
 *   await updatePoolBalanceInDB(poolManager.balance);
 * } else {
 *   // Prize not available, award next tier down or free credits
 * }
 * 
 * // When user buys credits
 * const purchase = poolManager.addPurchase(10.00);
 * // purchase.yourProfit = $4.20 guaranteed!
 */
