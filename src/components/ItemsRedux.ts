// src/redux/ItemsRedux.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from './Items';
import { restoreHealth, restoreEssence, damageHealth } from './HeroStats'; // Import hero stat functions
import { updateEnemyHealth, damageEnemy } from './EnemyStats1Redux'; // Import enemy stat functions

// Define the possible target types
type Target = 'hero' | 'enemy';

interface ItemsState {
  items: Record<string, Item>;
}

const initialState: ItemsState = {
  items: {
    potion: {
      id: 'potion',
      name: 'Potion',
      description: 'Restores 5 health points to the target.',
      type: 'consumable',
      effect: () => {}, // Empty, because effects are dispatched through actions
      maxAmount: 5,
      isVisible: true,
    },
    essenceVial: {
      id: 'essenceVial',
      name: 'Essence Vial',
      description: 'Restores 2 health points to the target.',
      type: 'consumable',
      effect: () => {},
      maxAmount: 5,
      isVisible: true,
    },
    superPoison: {
      id: 'superPoison',
      name: 'Super Poison',
      description: 'Deals 15 damage to the target.',
      type: 'consumable',
      effect: () => {},
      maxAmount: 3,
      isVisible: true,
    },
  },
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // Action to use an item, with target ('hero' or 'enemy')
    useItem: (state, action: PayloadAction<{ itemId: string, target: Target }>) => {
      const { itemId, target } = action.payload;
      const item = state.items[itemId];

      if (item) {
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
      }
    },

    setItemVisibility: (state, action: PayloadAction<{ itemId: string, isVisible: boolean }>) => {
      const { itemId, isVisible } = action.payload;
      const item = state.items[itemId];
      if (item) {
        item.isVisible = isVisible;
      }
    },

    addItem: (state, action: PayloadAction<Item>) => {
      const item = action.payload;
      if (!state.items[item.id]) {
        state.items[item.id] = item;
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },
  },
});

export const { useItem, setItemVisibility, addItem, removeItem } = itemsSlice.actions;
export default itemsSlice.reducer;
