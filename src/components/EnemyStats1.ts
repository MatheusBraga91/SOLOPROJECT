// EnemyStats1.ts

import { heroStats, updateHealth as updateHeroHealth } from './HeroStats'; // Import the updateHealth function from HeroStats

export interface EnemyStats {
  name: string;
  health: number;
  maxHealth: number;
}

export const enemyStats: EnemyStats = {
  name: 'Toxic Bug',
  health: 100,         // Initial health
  maxHealth: 100,      // Maximum health
};

// Function to update enemy health
export function updateEnemyHealth(newHealth: number) {
  enemyStats.health = Math.max(0, Math.min(newHealth, enemyStats.maxHealth)); // Prevent overflow
}

// Enemy attack: NullPointer Venom
export function enemyAttack() {
  // Calculate damage with a 10% critical chance
  const baseDamage = Math.floor(Math.random() * (12 - 9 + 1)) + 9; // Random damage between 9 and 12
  const criticalChance = Math.random();
  let damage = baseDamage;

  // 10% chance for a critical hit
  if (criticalChance <= 0.1) {
    damage = Math.floor(damage * 1.5); // Critical hit multiplies the damage by 1.5
  }

  // Apply damage to the hero's health
  updateHeroHealth(heroStats.health - damage);

  return damage; // Return the damage value for possible logging/feedback
}
