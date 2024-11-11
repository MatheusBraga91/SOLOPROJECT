// src/data/Bag.ts

import { items, Item } from './Items';

export interface BagItem {
    item: Item;
    quantity: number;
}

export class Bag {
    private inventory: Record<string, BagItem> = {};

    constructor() {
        // Initialize all visible items with 0 quantity by default
        for (const itemId in items) {
            if (items[itemId].isVisible) {
                this.inventory[itemId] = {
                    item: items[itemId],
                    quantity: 1, // Start with 1/5 as specified
                };
            }
        }
    }

    addItem(itemId: string, quantity: number = 1): void {
        if (!items[itemId]) {
            console.warn(`Item with ID "${itemId}" does not exist.`);
            return;
        }

        if (!items[itemId].isVisible) {
            console.warn(`Item with ID "${itemId}" is not yet visible.`);
            return;
        }

        const maxAmount = items[itemId].maxAmount;

        if (this.inventory[itemId]) {
            this.inventory[itemId].quantity = Math.min(
                this.inventory[itemId].quantity + quantity,
                maxAmount
            );
        } else {
            this.inventory[itemId] = { item: items[itemId], quantity: Math.min(quantity, maxAmount) };
        }

        console.log(`Added ${quantity} ${items[itemId].name}(s) to the bag.`);
    }

    removeItem(itemId: string, quantity: number = 1): void {
        const bagItem = this.inventory[itemId];
        if (!bagItem) {
            console.warn(`Item with ID "${itemId}" is not in the bag.`);
            return;
        }

        if (bagItem.quantity <= quantity) {
            bagItem.quantity = 0; // Keep the item but set to 0 quantity
            console.log(`Used all ${bagItem.item.name}(s). Now at 0/${bagItem.item.maxAmount}`);
        } else {
            bagItem.quantity -= quantity;
            console.log(`Used ${quantity} ${bagItem.item.name}(s). Remaining: ${bagItem.quantity}/${bagItem.item.maxAmount}`);
        }
    }

    useItem(itemId: string): void {
        const bagItem = this.inventory[itemId];
        if (!bagItem || bagItem.quantity === 0) {
            console.warn(`No ${itemId} available to use.`);
            return;
        }

        if (bagItem.quantity > 0) {
            bagItem.item.effect();
            this.removeItem(itemId, 1);
        } else {
            console.warn(`No ${bagItem.item.name}s left to use.`);
        }
    }

    getInventory(): Record<string, BagItem> {
        return this.inventory;
    }
}

// Example usage: Initialize the bag
export const heroBag = new Bag();
console.log("Current Inventory:", heroBag.getInventory());
