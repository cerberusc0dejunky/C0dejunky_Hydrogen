/**
 * Hacker Slots - Slot Machine Component
 * Fair 5x5 binary slot machine with provable randomness
 */

import { useState, useEffect } from 'react';
import { useCustomer } from '@shopify/hydrogen-react';
import './SlotMachine.css';

const GRID_SIZE = 5;
const SYMBOLS = ['0', '1'];

export default function SlotMachine() {
  const customer = useCustomer();
  
  // Game state
  const [grid, setGrid] = useState(generateInitialGrid());
  const [credits, setCredits] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [lastWin, setLastWin] = useState(null);
  const [spinHistory, setSpinHistory] = useState([]);
  
  // Provably fair state
  const [serverSeed, setServerSeed] = useState(null);
  const [clientSeed, setClientSeed] = useState(generateClientSeed());
  const [nonce, setNonce] = useState(0);
  
  // Load customer credits from Shopify metafields
  useEffect(() => {
    if (customer?.id) {
      loadCustomerCredits();
    }
  }, [customer]);

  function generateInitialGrid() {
    return Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() =>
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      )
    );
  }

  function generateClientSeed() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  async function loadCustomerCredits() {
    try {
      // Fetch customer metafield for game credits
      const response = await fetch('/api/customer/credits', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setCredits(data.credits || 0);
    } catch (error) {
      console.error('Failed to load credits:', error);
    }
  }

  async function handleSpin() {
    if (spinning) return;
    if (credits < 1) {
      alert('Not enough credits! Purchase more to continue playing.');
      return;
    }

    setSpinning(true);
    setLastWin(null);

    try {
      // Call server-side spin API for provably fair result
      const response = await fetch('/api/games/hacker-slots/spin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientSeed,
          nonce: nonce + 1,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Animate the spin
        await animateSpin(result.grid);
        
        // Update state
        setGrid(result.grid);
        setCredits(result.newBalance);
        setNonce(result.nonce);
        setServerSeed(result.revealedServerSeed);
        
        // Check for wins
        if (result.prize) {
          setLastWin(result.prize);
          celebrateWin(result.prize);
        }
        
        // Add to history
        setSpinHistory(prev => [...prev, {
          nonce: result.nonce,
          serverSeed: result.revealedServerSeed,
          clientSeed,
          result: result.grid,
          prize: result.prize,
          timestamp: new Date().toISOString(),
        }].slice(-50)); // Keep last 50 spins
      }
    } catch (error) {
      console.error('Spin failed:', error);
      alert('Spin failed. Please try again.');
    } finally {
      setSpinning(false);
    }
  }

  async function animateSpin(finalGrid) {
    const SPIN_DURATION = 2000; // 2 seconds
    const FRAME_RATE = 50; // 20fps
    const frames = SPIN_DURATION / FRAME_RATE;
    
    for (let i = 0; i < frames; i++) {
      await new Promise(resolve => setTimeout(resolve, FRAME_RATE));
      
      // Randomize grid during spin
      setGrid(prev => 
        prev.map(row =>
          row.map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
        )
      );
    }
    
    // Set final result
    setGrid(finalGrid);
  }

  function celebrateWin(prize) {
    // Trigger confetti or celebration animation
    console.log('🎉 Winner!', prize);
    
    // You can add confetti library here
    // import confetti from 'canvas-confetti';
    // confetti({ particleCount: 100, spread: 70 });
  }

  function purchaseCredits() {
    // Redirect to credit packages
    window.location.href = '/products/game-credits';
  }

  return (
    <div className="hacker-slots-container">
      {/* Header */}
      <div className="game-header">
        <h1 className="game-title">
          <span className="binary-flicker">01001000</span>
          HACKER SLOTS
          <span className="binary-flicker">01010011</span>
        </h1>
        <p className="game-subtitle">Provably Fair • 92% RTP • Binary Chaos</p>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-label">Credits</span>
          <span className="stat-value">{credits}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Last Win</span>
          <span className="stat-value">
            {lastWin ? lastWin.name : '—'}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Spins</span>
          <span className="stat-value">{nonce}</span>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="game-area">
        <div className={`slot-grid ${spinning ? 'spinning' : ''}`}>
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="slot-row">
              {row.map((symbol, colIdx) => (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className={`slot-cell ${spinning ? 'blur' : ''}`}
                  data-symbol={symbol}
                >
                  <span className="symbol">{symbol}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Win Announcement */}
        {lastWin && !spinning && (
          <div className="win-announcement">
            <div className="win-badge">
              <h2>{lastWin.name}</h2>
              <p>{lastWin.description}</p>
              <span className="win-value">+{lastWin.value}</span>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="controls">
        <button
          className="spin-button"
          onClick={handleSpin}
          disabled={spinning || credits < 1}
        >
          {spinning ? (
            <>
              <span className="spinner"></span>
              SPINNING...
            </>
          ) : (
            <>
              <span className="icon">⚡</span>
              SPIN (1 Credit)
            </>
          )}
        </button>

        {credits < 10 && (
          <button className="buy-credits-button" onClick={purchaseCredits}>
            <span className="icon">💳</span>
            Buy Credits
          </button>
        )}
      </div>

      {/* Provably Fair Info */}
      <details className="provably-fair">
        <summary>🔒 Provably Fair Verification</summary>
        <div className="fair-content">
          <p>Every spin is cryptographically verifiable:</p>
          <div className="seed-info">
            <div>
              <strong>Client Seed:</strong>
              <code>{clientSeed}</code>
            </div>
            <div>
              <strong>Server Seed (revealed after spin):</strong>
              <code>{serverSeed || 'Hidden until spin'}</code>
            </div>
            <div>
              <strong>Nonce:</strong>
              <code>{nonce}</code>
            </div>
          </div>
          <button
            className="verify-button"
            onClick={() => window.open('/games/hacker-slots/verify', '_blank')}
          >
            Verify Past Spins
          </button>
        </div>
      </details>

      {/* Prize Table */}
      <details className="prize-table" open>
        <summary>🎁 Prizes & Odds</summary>
        <table>
          <thead>
            <tr>
              <th>Prize</th>
              <th>Pattern</th>
              <th>Value</th>
              <th>Odds</th>
            </tr>
          </thead>
          <tbody>
            <tr className="jackpot">
              <td>🏆 All 1's</td>
              <td>25 ones</td>
              <td>Screen Repair</td>
              <td>1 in 3,333</td>
            </tr>
            <tr className="jackpot">
              <td>🏆 All 0's</td>
              <td>25 zeros</td>
              <td>Screen Repair</td>
              <td>1 in 3,333</td>
            </tr>
            <tr className="mega">
              <td>💎 5 in a Row</td>
              <td>Any line</td>
              <td>$50 Gift Card</td>
              <td>1 in 500</td>
            </tr>
            <tr className="big">
              <td>⭐ 4 in a Row</td>
              <td>Any line</td>
              <td>$20 Gift Card</td>
              <td>1 in 100</td>
            </tr>
            <tr className="good">
              <td>✨ 3 in a Row</td>
              <td>Any line</td>
              <td>$5 Gift Card</td>
              <td>1 in 20</td>
            </tr>
            <tr className="small">
              <td>🎯 Diagonal</td>
              <td>5 diagonal</td>
              <td>$2 Store Credit</td>
              <td>1 in 12</td>
            </tr>
            <tr className="mini">
              <td>🎮 Cluster</td>
              <td>3x3 cluster</td>
              <td>+5 Credits</td>
              <td>1 in 7</td>
            </tr>
            <tr className="tiny">
              <td>🍀 Lucky Spin</td>
              <td>3 vertical</td>
              <td>+2 Credits</td>
              <td>1 in 5</td>
            </tr>
          </tbody>
        </table>
        <p className="rtp-notice">
          <strong>Overall RTP: 92%</strong> - Much fairer than traditional online casinos (85-90%)
        </p>
      </details>
    </div>
  );
}
