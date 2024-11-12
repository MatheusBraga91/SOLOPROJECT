// src/skills.ts

// Import necessary helpers (like heroStats, restoreHealth, etc.)
import { heroStats, restoreHealth, updateEssence } from './HeroStats'; 

// Interface for a Skill (keep this in the file if you want to reuse it across all skills)
export interface Skill {
    name: string;
    description: string;
    baseDamageRange: [number, number ,number]; // Damage range, e.g., [6, 9]
    criticalChance: number; // Chance of critical hit, e.g., 0.3 (30%)
    criticalMultiplier: number; // Multiplier for critical hit, e.g., 1.5
    applyEffect: (enemyHealth: number) => number; // Function to calculate and apply damage
    applyDamageReduction?: (incomingDamage: number) => number; // Optional damage reduction
    isVisible: boolean; // New property to control if the skill is unlocked and visible
}

// Define all the skills with the `isVisible` property

export const loopAttack: Skill = {
  name: "Loop Attack",
  description: "A continuous attack that keeps hitting with even damage until an odd number is dealt.",
  baseDamageRange: [6, 8, 10], 
  criticalChance: 0.2, 
  criticalMultiplier: 1.5, 
  applyEffect: (_enemyHealth: number) => {
    if (heroStats.essence < 30) {
      console.log("Not enough essence for Loop Attack!");
      return 0;
    }
    updateEssence(heroStats.essence - 30);
    let totalDamage = 0;
    let currentDamage = loopAttack.baseDamageRange[Math.floor(Math.random() * loopAttack.baseDamageRange.length)];
    totalDamage += currentDamage;
    console.log(`First attack dealt: ${currentDamage} damage`);

    while (currentDamage % 2 === 0) {
      currentDamage = Math.random() < 0.6
        ? [6, 8, 10][Math.floor(Math.random() * 3)]
        : [5, 7, 9][Math.floor(Math.random() * 3)];
      totalDamage += currentDamage;
      console.log(`Next attack dealt: ${currentDamage} damage`);
      if (currentDamage % 2 !== 0) {
        console.log("Loop ended, odd number hit!");
        break;
      }
    }
    return totalDamage;
  },
  isVisible: true // Initially set to false, to be unlocked later
};

export const swordAttack: Skill = {
  name: "Sword Attack",
  description: "A simple but effective attack",
  baseDamageRange: [6, 9, 10],
  criticalChance: 0.3, 
  criticalMultiplier: 1.5, 
  applyEffect: (_enemyHealth: number) => {
    const baseDamage = Math.floor(Math.random() * (swordAttack.baseDamageRange[1] - swordAttack.baseDamageRange[0] + 1)) + swordAttack.baseDamageRange[0];
    const isCritical = Math.random() < swordAttack.criticalChance;
    const finalDamage = isCritical ? baseDamage * swordAttack.criticalMultiplier : baseDamage;
    console.log(`You used sword attack dealing ${finalDamage}`)
    return finalDamage;
  },
  isVisible: true // Initially set to visible
};

export const debugSkill: Skill = {
  name: "Debug",
  description: "A simple skill that randomly heals the hero's HP.",
  baseDamageRange: [10, 15, 20],
  criticalChance: 0,
  criticalMultiplier: 1,
  applyEffect: (_enemyHealth: number) => {
    if (heroStats.essence < 30) {
      console.log("Not enough essence for Debug skill!");
      return 0;
    }
    updateEssence(heroStats.essence - 30);
    const healAmount = debugSkill.baseDamageRange[Math.floor(Math.random() * debugSkill.baseDamageRange.length)];
    restoreHealth(healAmount);
    console.log(`Debug skill healed for: ${healAmount} HP`);
    return healAmount;
  },
  isVisible: true // Initially set to false
};

export const veil: Skill = {
  name: "Veil",
  description: "Reduces incoming damage by 30%",
  baseDamageRange: [0, 0, 0],
  criticalChance: 0,
  criticalMultiplier: 1,
  applyEffect: (_enemyHealth: number) => {
    return _enemyHealth;
  },
  applyDamageReduction: (incomingDamage: number): number => {
    console.log(`You used Veil, reducing incoming damage by 30%`)
    return incomingDamage * 0.7;
  },
  isVisible: true // Initially set to false
};

export const ultimateSkill: Skill = {
  name: "Ultimate Skill",
  description: "Heals the hero to full HP and deals a powerful attack to the enemy.",
  baseDamageRange: [33, 35, 36],
  criticalChance: 0,  
  criticalMultiplier: 1, 
  applyEffect: (_enemyHealth: number) => {
    restoreHealth(heroStats.maxHealth - heroStats.health);  
    const attackDamage = ultimateSkill.baseDamageRange[Math.floor(Math.random() * ultimateSkill.baseDamageRange.length)];
    console.log(`Ultimate Skill: Dealt ${attackDamage} damage to the enemy and healed the Hero fully!`);
    return attackDamage;
  },
  isVisible: true // Initially set to false
};

// Centralized export: we can export all skills at once
export const allSkills = {
  loopAttack,
  swordAttack,
  debugSkill,
  veil,
  ultimateSkill
};
