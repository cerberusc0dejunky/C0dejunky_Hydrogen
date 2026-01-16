/**
 * Repair Data & Resell Values
 * Based on 25% of Refurbished Resell Value formula
 */

export const DEVICE_RESELL_VALUES = {
    'iPhone 15 Pro Max': 1100,
    'iPhone 15 Pro': 999,
    'iPhone 15': 799,
    'iPhone 14 Pro Max': 899,
    'iPhone 14 Pro': 799,
    'iPhone 14': 699,
    'iPhone 13 Pro Max': 750,
    'iPhone 13': 599,
    'Samsung Galaxy S24 Ultra': 1200,
    'Samsung Galaxy S23 Ultra': 900,
    'Google Pixel 8 Pro': 999,
    'iPad Pro 12.9 (M2)': 1099,
};

export const REPAIR_TYPES = [
    { id: 'screen', name: 'Screen Replacement', baseCost: 50 },
    { id: 'battery', name: 'Battery Replacement', baseCost: 30 },
    { id: 'charging', name: 'Charging Port Repair', baseCost: 40 },
    { id: 'camera', name: 'Camera Repair', baseCost: 60 },
    { id: 'backglass', name: 'Back Glass Repair', baseCost: 70 },
    { id: 'water', name: 'Water Damage Diagnostic', baseCost: 99 },
];

/**
 * Calculate repair cost
 * Formula: (25% of Resell Value) + Part Cost + $20 Shipping
 */
export function calculateRepairEstimate(deviceName, repairType, partPrice = 0) {
    const resellValue = DEVICE_RESELL_VALUES[deviceName] || 500; // Default if not found
    const serviceFee = resellValue * 0.25;
    const shipping = 20;

    return {
        serviceFee: Math.round(serviceFee),
        partCost: partPrice,
        shipping,
        total: Math.round(serviceFee + partPrice + shipping)
    };
}
