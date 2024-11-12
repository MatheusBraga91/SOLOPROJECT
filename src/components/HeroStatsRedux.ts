// HeroStatsRedux.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeroStats, heroStats } from './HeroStats';  // Import the initial state from HeroStats.ts

// Use heroStats as the initial state
const initialState: HeroStats = { ...heroStats };

const heroStatsSlice = createSlice({
  name: 'heroStats',
  initialState,
  reducers: {
    updateHealth: (state, action: PayloadAction<number>) => {
      const newHealth = action.payload;
      state.health = Math.max(0, Math.min(newHealth, state.maxHealth));  // Prevent overflow
    },
    updateEssence: (state, action: PayloadAction<number>) => {
      const newEssence = action.payload;
      state.essence = Math.max(0, Math.min(newEssence, state.maxEssence));  // Prevent overflow
    },
    activateVeil: (state) => {
      state.isVeilActive = true;
    },
    deactivateVeil: (state) => {
      state.isVeilActive = false;
    },
    heroTakesDamage: (state, action: PayloadAction<number>) => {
      let damage = action.payload;
      if (state.isVeilActive) {
        damage = Math.floor(damage * 0.7);  // Reduces damage by 30%
      }
      state.health = Math.max(0, state.health - damage);
    },
    restoreHealth: (state, action: PayloadAction<number>) => {
      state.health = Math.min(state.health + action.payload, state.maxHealth);
    },
    restoreEssence: (state, action: PayloadAction<number>) => {
      state.essence = Math.min(state.essence + action.payload, state.maxEssence);
    },
  },
});

export const {
  updateHealth,
  updateEssence,
  activateVeil,
  deactivateVeil,
  heroTakesDamage,
  restoreHealth,
  restoreEssence,
} = heroStatsSlice.actions;

export default heroStatsSlice.reducer;
