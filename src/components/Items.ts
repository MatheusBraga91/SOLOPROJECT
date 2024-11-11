// src/data/Items.ts

import { heroStats, restoreHealth, damageHealth } from './HeroStats';

export interface Item {
    id: string;
    name: string;
    description: string;
    type: 'consumable' | 'equipment';
    effect: () => void;
    maxAmount: number;  // Maximum amount the hero can hold
    isVisible: boolean; // Whether the item is visible in the inventory
}

export const items: Record<string, Item> = {
    potion: {
        id: 'potion',
        name: 'Potion',
        description: 'Restores 20 health points.',
        type: 'consumable',
        effect: () => {
            restoreHealth(20); // Restores 20 health to the hero
            console.log(`Used Potion! Health is now ${heroStats.health}/${heroStats.maxHealth}`);
        },
        maxAmount: 5,  // Maximum number of potions
        isVisible: true, // Potions start visible
    },
    poison: {
        id: 'poison',
        name: 'Poison',
        description: 'Removes 10 health points.',
        type: 'consumable',
        effect: () => {
            damageHealth(10);
            console.log(`Used Poison! Health is now ${heroStats.health}/${heroStats.maxHealth}`);
        },
        maxAmount: 5,  // Maximum number of poisons
        isVisible: true, // Poisons start visible
    },
    superpoison: {
        id: 'superpoison',
        name: 'Super Poison',
        description: 'Removes 30 health points.',
        type: 'consumable',
        effect: () => {
            damageHealth(30);
            console.log(`Used Super Poison! Health is now ${heroStats.health}/${heroStats.maxHealth}`);
        },
        maxAmount: 3, // Example maximum amount
        isVisible: false, // Not visible until criteria are met
    },
};
