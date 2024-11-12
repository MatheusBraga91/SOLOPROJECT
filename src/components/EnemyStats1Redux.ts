//EnemyStats1Redux.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EnemyStats, enemyStats } from './EnemyStats1';  // Import the initial state from EnemyStats1.ts

// Use enemyStats as the initial state
const initialState: EnemyStats = { ...enemyStats };

const enemyStatsSlice = createSlice({
  name: 'enemyStats',
  initialState,
  reducers: {
    updateEnemyHealth: (state, action: PayloadAction<number>) => {
      const newHealth = action.payload;
      state.health = Math.max(0, Math.min(newHealth, state.maxHealth));
    },
    damageEnemy: (state, action: PayloadAction<number>) => {
      const damage = action.payload;
      state.health = Math.max(0, state.health - damage);
    },
    updateEnemyImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
  },
});

export const { updateEnemyHealth, damageEnemy, updateEnemyImage } = enemyStatsSlice.actions;
export default enemyStatsSlice.reducer;
