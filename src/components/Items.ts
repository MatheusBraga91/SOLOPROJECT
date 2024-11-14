// src/data/Items.ts

export interface Item {
    id: string;
    name: string;
    description: string;
    type: 'consumable' | 'equipment';
    effect: () => void; // Stub effect function to be handled elsewhere
    maxAmount: number;
    currentAmount: number; // Added currentAmount
    isVisible: boolean;
}

export const items: Record<string, Item> = {
    potion: {
        id: 'potion',
        name: 'Potion',
        description: 'Restores 10 health points.',
        type: 'consumable',
        effect: () => { /* Action handled in Redux */ },
        maxAmount: 5,
        currentAmount: 1,  // Initialize with 0, or adjust as needed
        isVisible: true,
    },
    essenceVial: {
        id: 'essenceVial',
        name: 'Essence Vial',
        description: 'Restores 50 essence points.',
        type: 'consumable',
        effect: () => { /* Action handled in Redux */ },
        maxAmount: 5,
        currentAmount: 2,  // Initialize with 0, or adjust as needed
        isVisible: true,
    },
    superPoison: {
        id: 'superPoison',
        name: 'Super Poison',
        description: 'Removes 30 health points.',
        type: 'consumable',
        effect: () => { /* Action handled in Redux */ },
        maxAmount: 3,
        currentAmount: 0,  // Initialize with 0, or adjust as needed
        isVisible: false,
    },
};
