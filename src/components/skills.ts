// src/skills.ts

// Interface for a Skill
export interface Skill {
    name: string;
    description: string;
    baseDamageRange: [number, number]; // Damage range, e.g., [6, 9]
    criticalChance: number; // Chance of critical hit, e.g., 0.3 (30%)
    criticalMultiplier: number; // Multiplier for critical hit, e.g., 1.5
    applyEffect: (enemyHealth: number) => number; // Function to calculate and apply damage
  }
  
  // Define the Sword Attack skill
  export const swordAttack: Skill = {
    name: "Sword Attack",
    description: "A simple but effective attack",
    baseDamageRange: [6, 9],
    criticalChance: 0.3, // 30% chance for critical hit
    criticalMultiplier: 1.5, // Critical hit deals 1.5x damage
    applyEffect: (_enemyHealth: number) => {
      // Calculate base damage randomly within the range
      const baseDamage = Math.floor(Math.random() * (swordAttack.baseDamageRange[1] - swordAttack.baseDamageRange[0] + 1)) + swordAttack.baseDamageRange[0];
      
      // Determine if the attack is a critical hit
      const isCritical = Math.random() < swordAttack.criticalChance;
      
      // Apply critical damage if the attack is a critical hit
      const finalDamage = isCritical ? baseDamage * swordAttack.criticalMultiplier : baseDamage;
      
      // Return the final damage value (can be used to subtract from enemy's health)
      return finalDamage;
    }
  };
  