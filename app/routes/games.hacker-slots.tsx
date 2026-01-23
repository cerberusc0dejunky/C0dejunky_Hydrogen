/**
 * Hacker Slots Game Route
 * Main entry point for the slot machine game
 */

import { useLoaderData } from 'react-router';
import SlotMachine from '~/components/SlotMachine.jsx';

export async function loader() {
  // For testing, return simple data
  return {
    prizePoolBalance: 250,
    availablePrizes: [],
    customer: null,
    credits: 100, // Demo credits for testing
    gameConfig: {
      name: 'Hacker Slots',
      costPerSpin: 1,
      targetRTP: 92,
    },
  };
}

export default function HackerSlotsRoute() {
  const { prizePoolBalance, customer, credits } = useLoaderData();

  return (
    <div className="hacker-slots-page">
      {/* Page Header */}
      <header className="game-header-bar">
        <div className="header-content">
          <a href="/" className="back-link">
            ← Back to Store
          </a>
          {customer ? (
            <span className="welcome-text">
              Welcome, {customer.firstName || 'Player'}
            </span>
          ) : (
            <a href="/account/login" className="login-link">
              Login to Play
            </a>
          )}
        </div>
      </header>

      {/* Game Component */}
      <SlotMachine />

      {/* Prize Pool Status */}
      <div className="prize-pool-status">
        <h3>💰 Prize Pool Status</h3>
        <p>Current Pool Balance: <strong>${prizePoolBalance.toFixed(2)}</strong></p>
        <p className="pool-status-text">
          {prizePoolBalance >= 2000 && '🔓 ALL PRIZES UNLOCKED including phones!'}
          {prizePoolBalance >= 1000 && prizePoolBalance < 2000 && '🔓 Premium prizes unlocked!'}
          {prizePoolBalance >= 200 && prizePoolBalance < 1000 && '🔓 Medium prizes available'}
          {prizePoolBalance >= 50 && prizePoolBalance < 200 && '🔓 Small prizes available'}
          {prizePoolBalance < 50 && '🎮 Only free credit prizes available (pool building up)'}
        </p>
        <div className="fairness-info">
          <p>✅ <strong>100% Fair:</strong> Every purchase adds 50% to the prize pool</p>
          <p>✅ <strong>0% Out-of-Pocket:</strong> Prizes only awarded when pool can afford them</p>
          <p>✅ <strong>Provably Fair:</strong> Every spin is cryptographically verifiable</p>
        </div>
      </div>

      {/* How It Works */}
      <details className="how-it-works">
        <summary>ℹ️ How This Works (The Fair Way)</summary>
        <div className="how-it-works-content">
          <h4>Why This Is Different From Other Slot Games:</h4>
          <ul>
            <li>
              <strong>Traditional online casinos:</strong> They use low RTP (85-90%) and "honeypot" strategies
              - let you win early, then you never win again. That's why you won $700 the first year but
              nothing since.
            </li>
            <li>
              <strong>Our approach:</strong> 50% of EVERY credit purchase goes to the prize pool. The pool
              pays for prizes, not me. I make my 42% profit upfront, so I'm incentivized to keep you playing
              - not to prevent you from winning!
            </li>
          </ul>

          <h4>Example:</h4>
          <ol>
            <li>You buy $10 in credits (100 spins)</li>
            <li>$5.00 goes to prize pool</li>
            <li>$4.20 is my guaranteed profit</li>
            <li>$0.80 covers fees</li>
            <li>When you win a $5 gadget, it costs the pool $3 (AliExpress price)</li>
            <li>Pool still has $2 left, and I already made my $4.20!</li>
          </ol>

          <h4>The Result:</h4>
          <p>
            You win way more often (high RTP ~92%), I still make consistent profit, and the pool
            grows over time to unlock bigger prizes. <strong>Everybody wins!</strong>
          </p>
        </div>
      </details>

      <style>{`
        .hacker-slots-page {
          min-height: 100vh;
          background: #050705;
        }
        
        .game-header-bar {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid #1a3a1a;
        }
        
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .back-link, .login-link, .welcome-text {
          color: #00ff41;
          text-decoration: none;
          font-size: 1.2rem;
        }
        
        .prize-pool-status, .how-it-works {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 1.5rem;
          background: rgba(10, 20, 10, 0.8);
          border: 1px solid #1a3a1a;
          border-radius: 12px;
          color: #0d8a2d;
        }
        
        .prize-pool-status h3, .how-it-works summary {
          color: #00ff41;
          margin-bottom: 1rem;
        }
        
        .prize-pool-status strong, .how-it-works strong {
          color: #00ff41;
        }
        
        .fairness-info {
          margin-top: 1rem;
          font-size: 0.85rem;
          opacity: 0.8;
        }
        
        .how-it-works-content {
          margin-top: 1rem;
          line-height: 1.8;
        }
        
        .how-it-works-content ul, .how-it-works-content ol {
          padding-left: 1.5rem;
        }
        
        .how-it-works-content h4 {
          color: #00ff41;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
}
