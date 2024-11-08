// src/data/Bag.ts

import { items, Item } from './Items';

export interface BagItem {
    item: Item;
    quantity: number;
}

export class Bag {
    private inventory: Record<string, BagItem> = {};

    // Method to add an item to the bag
    addItem(itemId: string, quantity: number = 1): void {
        if (!items[itemId]) {
            console.warn(`Item with ID "${itemId}" does not exist.`);
            return;
        }

        if (this.inventory[itemId]) {
            this.inventory[itemId].quantity += quantity;
        } else {
            this.inventory[itemId] = { item: items[itemId], quantity };
        }

        console.log(`Added ${quantity} ${items[itemId].name}(s) to the bag.`);
    }

    // Method to remove an item from the bag
    removeItem(itemId: string, quantity: number = 1): void {
        const bagItem = this.inventory[itemId];
        if (!bagItem) {
            console.warn(`Item with ID "${itemId}" is not in the bag.`);
            return;
        }

        if (bagItem.quantity <= quantity) {
            delete this.inventory[itemId];
            console.log(`Removed all ${bagItem.item.name}(s) from the bag.`);
        } else {
            bagItem.quantity -= quantity;
            console.log(`Removed ${quantity} ${bagItem.item.name}(s) from the bag. Remaining: ${bagItem.quantity}`);
        }
    }

    // Method to use an item
    useItem(itemId: string): void {
        const bagItem = this.inventory[itemId];
        if (!bagItem) {
            console.warn(`Item with ID "${itemId}" is not in the bag.`);
            return;
        }

        if (bagItem.quantity > 0) {
            bagItem.item.effect();  // Apply the item's effect
            this.removeItem(itemId, 1);  // Remove one unit after using
        } else {
            console.warn(`No ${bagItem.item.name}s left to use.`);
        }
    }

    // Method to view items in the bag
    getInventory(): Record<string, BagItem> {
        return this.inventory;
    }
}

// Example usage: Initialize the bag and add items to it
export const heroBag = new Bag();
heroBag.addItem('potion', 1);  // Add 1 potion to the bag
heroBag.addItem('poison', 1);  // Add 1 poison to the bag

console.log("Current Inventory:", heroBag.getInventory());


