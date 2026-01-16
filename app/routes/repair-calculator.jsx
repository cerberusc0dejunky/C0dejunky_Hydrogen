import { useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';
import { calculateRepairEstimate, DEVICE_RESELL_VALUES, REPAIR_TYPES } from '~/data/repairData';
import { Image, Money } from '@shopify/hydrogen';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
    return [{ title: 'Repair Calculator | C0dejunky' }];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({ context }) {
    // Fetch products that might be "Parts"
    const { products } = await context.storefront.query(PARTS_QUERY);
    return { parts: products.nodes };
}

export default function RepairCalculator() {
    const { parts } = useLoaderData();

    const [selectedDevice, setSelectedDevice] = useState('');
    const [selectedRepair, setSelectedRepair] = useState('');
    const [estimate, setEstimate] = useState(null);

    // Auto-calculate estimate
    useEffect(() => {
        if (selectedDevice && selectedRepair) {
            // Find matching part in inventory (simplistic matching)
            const part = parts.find(p =>
                p.title.toLowerCase().includes(selectedDevice.toLowerCase()) &&
                p.title.toLowerCase().includes(selectedRepair.toLowerCase())
            );

            const partPrice = part ? parseFloat(part.variants.nodes[0].price.amount) : 0;
            const result = calculateRepairEstimate(selectedDevice, selectedRepair, partPrice);
            setEstimate({
                ...result,
                partName: part ? part.title : 'Standard Part'
            });
        } else {
            setEstimate(null);
        }
    }, [selectedDevice, selectedRepair, parts]);

    return (
        <div className="repair-calculator-page">
            <div className="calculator-header">
                <h1>Repair Cost Calculator</h1>
                <p>Get an instant quote for your device repair based on current market values and part costs.</p>
            </div>

            <div className="calculator-container">
                <div className="calculator-form card">
                    <div className="form-group">
                        <label htmlFor="calculator-device-select">Select Your Device</label>
                        <select
                            id="calculator-device-select"
                            value={selectedDevice}
                            onChange={(e) => setSelectedDevice(e.target.value)}
                            className="input-field"
                        >
                            <option value="">-- Choose a Device --</option>
                            {Object.keys(DEVICE_RESELL_VALUES).map(device => (
                                <option key={device} value={device}>{device}</option>
                            ))}
                            <option value="Other">Other / Not Listed</option>
                        </select>
                    </div>

                    <fieldset className="form-group">
                        <legend className="form-label">What needs fixing?</legend>
                        <div className="repair-options-grid" role="group">
                            {REPAIR_TYPES.map(repair => (
                                <button
                                    key={repair.id}
                                    className={`repair-type-btn ${selectedRepair === repair.id ? 'active' : ''}`}
                                    onClick={() => setSelectedRepair(repair.id)}
                                >
                                    <span className="repair-icon">
                                        {repair.id === 'screen' && '📱'}
                                        {repair.id === 'battery' && '🔋'}
                                        {repair.id === 'charging' && '🔌'}
                                        {repair.id === 'camera' && '📷'}
                                        {repair.id === 'backglass' && '💎'}
                                        {repair.id === 'water' && '💧'}
                                    </span>
                                    {repair.name}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                </div>

                <div className="calculator-result">
                    {estimate ? (
                        <div className="estimate-card card animate-in">
                            <h3>Repair Estimate</h3>
                            <div className="estimate-details">
                                <div className="estimate-row">
                                    <span>Professional Service Fee (25% Resell)</span>
                                    <span>${estimate.serviceFee}</span>
                                </div>
                                <div className="estimate-row">
                                    <span>{estimate.partName}</span>
                                    <span>${estimate.partCost}</span>
                                </div>
                                <div className="estimate-row">
                                    <span>Priority Shipping (Round Trip)</span>
                                    <span>${estimate.shipping}</span>
                                </div>
                                <hr />
                                <div className="estimate-row total">
                                    <span>Estimated Total</span>
                                    <span className="total-price">${estimate.total}</span>
                                </div>
                            </div>

                            <div className="estimate-actions">
                                <button className="button-primary full-width">Book This Repair</button>
                                <p className="disclaimer">
                                    * Prices are estimates based on standard conditions. Final quote will be provided after diagnostic.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="estimate-placeholder card">
                            <div className="placeholder-content">
                                <p>Select a device and repair type to see your personalized estimate.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Parts in Inventory Section (Optional) */}
            <section className="parts-inventory">
                <h2>Parts in Stock</h2>
                <div className="parts-mini-grid">
                    {parts.slice(0, 4).map(part => (
                        <div key={part.id} className="part-mini-card">
                            {part.variants.nodes[0].image ? (
                                <Image data={part.variants.nodes[0].image} width={60} height={60} />
                            ) : (
                                <div className="part-icon">⚙️</div>
                            )}
                            <div className="part-info">
                                <h6>{part.title}</h6>
                                <Money data={part.variants.nodes[0].price} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

const PARTS_QUERY = `#graphql
  query RepairParts($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    products(first: 100, query: "tag:Part OR title:Screen OR title:Battery") {
      nodes {
        id
        title
        handle
        variants(first: 1) {
          nodes {
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;

/** @typedef {import('./+types/repair-calculator').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
