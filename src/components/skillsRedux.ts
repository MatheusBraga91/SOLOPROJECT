// src/redux/skillsRedux.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Skill, allSkills } from './skills'; // Import the skills from your skills.ts file

interface SkillsState {
  skills: Record<string, Skill>;
}

const initialState: SkillsState = {
  skills: allSkills, // Initial state contains all skills
};

// Create the slice
const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    unlockSkill(state, action: PayloadAction<string>) {
      const skillName = action.payload;
      if (state.skills[skillName]) {
        state.skills[skillName].isVisible = true; // Unlock skill by setting isVisible to true
      }
    },
    hideSkill(state, action: PayloadAction<string>) {
      const skillName = action.payload;
      if (state.skills[skillName]) {
        state.skills[skillName].isVisible = false; // Hide skill by setting isVisible to false
      }
    },
    // You can add more actions as needed, such as updating a skill's properties
  },
});

// Export actions
export const { unlockSkill, hideSkill } = skillsSlice.actions;

// Export reducer
export default skillsSlice.reducer;
