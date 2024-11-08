// src/data/Items.ts

import { heroStats, restoreHealth, damageHealth } from './HeroStats';

export interface Item {
    id: string;
    name: string;
    description: string;
    type: 'consumable' | 'equipment';
    effect: () => void;  // Effect function that applies to the hero
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
        }
    },
    poison: {
        id: 'poison',
        name: 'Poison',
        description: 'Removes 10 health points.',
        type: 'consumable',
        effect: () => {
            damageHealth(10); //DEAL 10 DAMAGE TO HEALTH of hero
            console.log(`Used Poison! Health is now ${heroStats.health}/${heroStats.maxHealth}`);
        },

    },

}