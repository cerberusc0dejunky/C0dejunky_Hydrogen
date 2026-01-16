import { Link } from 'react-router';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
    return [{ title: 'Track Repairs | C0dejunky' }];
};

export default function RepairsIndex() {
    return (
        <div className="repairs-page container">
            <div className="repairs-header">
                <h1>Repair Center</h1>
                <div className="header-actions">
                    <Link to="/repair-calculator" className="button-primary">New Repair Quote</Link>
                </div>
            </div>

            <div className="repairs-tabs">
                <button className="tab active">Active Repairs</button>
                <button className="tab">Completed</button>
            </div>

            <div className="repairs-content card">
                <div className="empty-state">
                    <div className="empty-icon">🛠️</div>
                    <h2>No Active Repairs Found</h2>
                    <p>
                        Ready to get your device back in shape? Use our calculator to get an instant quote and book your service.
                    </p>
                    <Link to="/repair-calculator" className="button-secondary">Check Repair Prices</Link>
                </div>
            </div>

            <section className="repair-benefits">
                <div className="benefit">
                    <h3>Expert Technicians</h3>
                    <p>Over 10 years of experience in micro-soldering and complex repairs.</p>
                </div>
                <div className="benefit">
                    <h3>Quality Parts</h3>
                    <p>We only use premium aftermarket or genuine pulled parts from our inventory.</p>
                </div>
                <div className="benefit">
                    <h3>Fast Turnaround</h3>
                    <p>Most screen and battery repairs completed within 24-48 hours of arrival.</p>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
        .repairs-page {
          max-width: 1000px;
          margin: 60px auto;
          padding: 0 20px;
        }
        .repairs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .repairs-header h1 {
          font-family: var(--font-heading);
          font-size: 36px;
          margin: 0;
        }
        .repairs-tabs {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--color-border);
        }
        .tab {
          padding: 12px 24px;
          background: none;
          border: none;
          font-weight: 600;
          cursor: pointer;
          opacity: 0.6;
          position: relative;
        }
        .tab.active {
          opacity: 1;
          color: var(--color-primary);
        }
        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-primary);
        }
        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }
        .empty-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
        .empty-state p {
          max-width: 400px;
          margin: 0 auto 24px;
          opacity: 0.7;
        }
        .repair-benefits {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }
        .benefit h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }
        .benefit p {
          font-size: 14px;
          opacity: 0.8;
          line-height: 1.5;
        }
      `}} />
        </div>
    );
}

/** @typedef {import('./+types/repairs._index').Route} Route */
