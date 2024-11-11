import { veil } from './skills';  // Import the Veil skill

export interface HeroStats {
  enemyHealth(enemyHealth: any): unknown;
  health: number;
  maxHealth: number;
  essence: number;
  maxEssence: number;
}

export const heroStats: HeroStats = {
  health: 50, // Initial health
  maxHealth: 50, // Maximum health
  essence: 200, // Initial essence
  maxEssence: 200,
  enemyHealth: function (): unknown {
    throw new Error('Function not implemented.');
  }
};

// Flag to track if Veil skill is active
export let isVeilActive = false;

// Function to update health
export function updateHealth(newHealth: number) {
  heroStats.health = Math.max(0, Math.min(newHealth, heroStats.maxHealth)); // Prevent overflow
}

// Function to update essence
export function updateEssence(newEssence: number) {
  heroStats.essence = Math.max(0, Math.min(newEssence, heroStats.maxEssence)); // Prevent overflow
}

// Function to activate Veil skill (reduce incoming damage by 30%)
export function activateVeil() {
  isVeilActive = true;
  console.log("Veil activated: Incoming damage will be reduced by 30%");
}

// Function to deactivate Veil skill
export function deactivateVeil() {
  isVeilActive = false;
  console.log("Veil deactivated: No more damage reduction");
}

// Function to apply damage to the hero's health with potential Veil effect
export function heroTakesDamage(incomingDamage: number) {
  let finalDamage = incomingDamage;

  // If Veil skill is active, reduce incoming damage by 30%
  if (isVeilActive && veil.applyDamageReduction) {
    finalDamage = veil.applyDamageReduction(incomingDamage);
  }

  // Apply the final damage (after reduction, if any) to the hero's health
  damageHealth(finalDamage);
}


// Optionally: Function to restore health/essence or modify both in certain ways (e.g., healing, using essence)
export function restoreHealth(amount: number) {
  updateHealth(heroStats.health + amount);
}

export function damageHealth(amount: number) {
  updateHealth(heroStats.health - amount);
}

export function restoreEssence(amount: number) {
  updateEssence(heroStats.essence + amount);
}


