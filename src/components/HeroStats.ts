export interface HeroStats {
  health: number;
  maxHealth: number;
  essence: number;
  maxEssence: number;
}

export const heroStats: HeroStats = {
  health: 50,         // Initial health
  maxHealth: 50,      // Maximum health
  essence: 200,       // Initial essence
  maxEssence: 200,    // Maximum essence
};

// Function to update health
export function updateHealth(newHealth: number) {
  heroStats.health = Math.max(0, Math.min(newHealth, heroStats.maxHealth)); // Prevent overflow
}

// Function to update essence
export function updateEssence(newEssence: number) {
  heroStats.essence = Math.max(0, Math.min(newEssence, heroStats.maxEssence)); // Prevent overflow
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
