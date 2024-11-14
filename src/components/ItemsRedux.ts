import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { items, Item } from './Items';  // Import the items from Items.ts
import { restoreHealth, restoreEssence, damageHealth } from './HeroStats'; // Import hero stat functions
import { updateEnemyHealth, damageEnemy } from './EnemyStats1Redux'; // Import enemy stat functions

// Define the possible target types
type Target = 'hero' | 'enemy';

interface ItemsState {
  items: Record<string, { maxAmount: number, currentAmount: number, isVisible: boolean }>; // Track current amount
}

const initialState: ItemsState = {
  items: Object.keys(items).reduce((acc, key) => {
    acc[key] = {
      maxAmount: items[key].maxAmount,
      currentAmount: items[key].currentAmount, // Initialize with current amount from Items.ts
      isVisible: items[key].isVisible,
    };
    return acc;
  }, {} as Record<string, { maxAmount: number, currentAmount: number, isVisible: boolean }>),
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // Action to use an item, with target ('hero' or 'enemy')
    useItem: (state, action: PayloadAction<{ itemId: string, target: Target }>) => {
      const { itemId, target } = action.payload;
      const item = items[itemId];  // Get the full item details from Items.ts
      const stateItem = state.items[itemId];  // Get the state-related data (maxAmount, currentAmount, isVisible) from Redux

      if (item && stateItem && stateItem.currentAmount > 0) {
        // Decrease current amount when using the item
        stateItem.currentAmount -= 1;

        switch (itemId) {
          case 'potion':
            if (target === 'hero') {
              restoreHealth(5); // Potion restores 5 health to the hero
              console.log("You used the Potion on the hero... you healed it for 5 points.");
            } else if (target === 'enemy') {
              updateEnemyHealth(5); // Potion restores 5 health to the enemy
              console.log("You threw the potion vial into the enemy's face... you healed it for 5 points.");
            }
            break;

          case 'essenceVial':
            if (target === 'hero') {
              restoreEssence(50); // Essence Vial restores 50 essence to the hero
              console.log("You used the Essence Vial on the hero... you restored 50 essence points.");
            } else if (target === 'enemy') {
              updateEnemyHealth(2); // Essence Vial restores 2 health to the enemy
              console.log("You threw the essence vial into the enemy's face... you healed it for 2 points.");
            }
            break;

          case 'superPoison':
            if (target === 'hero') {
              damageHealth(15); // Super Poison deals 15 damage to the hero
              console.log("You used the Super Poison on the hero... it dealt 15 damage!");
            } else if (target === 'enemy') {
              damageEnemy(15); // Super Poison deals 15 damage to the enemy
              console.log("You threw the Super Poison into the enemy's face! It dealt 15 damage!");
            }
            break;

          default:
            break;
        }

        console.log(`Used ${item.name} on ${target}, effect applied.`);
      } else {
        console.log(`Not enough ${item.name} to use.`);
      }
    },

    setItemVisibility: (state, action: PayloadAction<{ itemId: string, isVisible: boolean }>) => {
      const { itemId, isVisible } = action.payload;
      const stateItem = state.items[itemId];
      if (stateItem) {
        stateItem.isVisible = isVisible;
      }
    },

    // Add an item to the inventory (increase current amount)
    addItem: (state, action: PayloadAction<Item>) => {
      const item = action.payload;
      const stateItem = state.items[item.id];
      if (stateItem) {
        // Increase currentAmount up to maxAmount
        if (stateItem.currentAmount < stateItem.maxAmount) {
          stateItem.currentAmount += 1;
        }
      } else {
        state.items[item.id] = { maxAmount: item.maxAmount, currentAmount: 1, isVisible: item.isVisible };
      }
    },

    // Remove an item from the inventory (decrease current amount)
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const stateItem = state.items[itemId];
      if (stateItem && stateItem.currentAmount > 0) {
        stateItem.currentAmount -= 1;
      }
    },
  },
});

export const { useItem, setItemVisibility, addItem, removeItem } = itemsSlice.actions;
export default itemsSlice.reducer;
