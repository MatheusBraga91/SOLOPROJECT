// HeroStatsRedux.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeroState {
  health: number;
  maxHealth: number;
  essence: number;
  maxEssence: number;
  isVeilActive: boolean;
}

const initialState: HeroState = {
  health: 50,
  maxHealth: 50,
  essence: 200,
  maxEssence: 200,
  isVeilActive: false,
};

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    updateHealth: (state, action: PayloadAction<number>) => {
      state.health = Math.max(0, Math.min(action.payload, state.maxHealth));
    },
    updateEssence: (state, action: PayloadAction<number>) => {
      state.essence = Math.max(0, Math.min(action.payload, state.maxEssence));
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
        damage = Math.floor(damage * 0.7); // Reduces damage by 30%
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
} = heroSlice.actions;

export default heroSlice.reducer;
