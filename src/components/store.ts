// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import heroStatsReducer from './HeroStatsRedux';  // Import the HeroStats reducer
import itemsReducer from './ItemsRedux';  // Import the Items reducer
import enemyStatsReducer from './EnemyStats1Redux';  // Import the EnemyStats reducer
import skillsReducer from './skillsRedux';  // Import the Skills reducer

// Create Redux store
const store = configureStore({
  reducer: {
    heroStats: heroStatsReducer,  // Add heroStats reducer to the store
    items: itemsReducer,  // Add items reducer to the store
    enemyStats: enemyStatsReducer,  // Add enemyStats reducer to the store
    skills: skillsReducer,  // Add skills reducer to the store
  },
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

