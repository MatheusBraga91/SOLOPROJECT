// EnemyStats1.ts

import ToxicBugImage from './ToxicBug.png'; // Import the image file
import {  updateEnemyHealth, updateEnemyImage } from './EnemyStats1Redux';
import { heroStats, updateHealth as updateHeroHealth } from './HeroStats';

export interface EnemyStats {
  name: string;
  health: number;
  maxHealth: number;
  image: string;
}

export const enemyStats: EnemyStats = {
  name: 'Toxic Bug',
  health: 100,
  maxHealth: 100,
  image: ToxicBugImage,  // Use the imported image here
};

export function updateEnemyHealthRedux(newHealth: number, dispatch: any) {
  dispatch(updateEnemyHealth(newHealth));
}

export function updateEnemyImageRedux(newImage: string, dispatch: any) {
  dispatch(updateEnemyImage(newImage));
}

// NullPointer Venom Attack - Deals damage from 8, 10, or 12
export function nullPointerVenomAttack() {
  const damage = Math.floor(Math.random() * (12 - 8 + 1)) + 8; // Damage range 8-12
  const criticalChance = Math.random();
  let finalDamage = damage;

  if (criticalChance <= 0.1) { // 10% chance for critical damage
    finalDamage = Math.floor(finalDamage * 1.5);
  }

  updateHeroHealth(heroStats.health - finalDamage);  // Update hero health
    // Update enemy health

  // Return skill name and damage
  return { skillName: "NullPointer Venom", damage: finalDamage };
}

// Triple Treat Attack - 3 consecutive attacks with damage from 3, 6, or 9 each
export function tripleTreatAttack() {
  let totalDamage = 0;

  for (let i = 0; i < 3; i++) {
    const damage = Math.floor(Math.random() * (9 - 3 + 1)) + 3; // Damage range 3-9
    const criticalChance = Math.random();
    let finalDamage = damage;

    if (criticalChance <= 0.1) { // 10% chance for critical damage
      finalDamage = Math.floor(finalDamage * 1.5);
    }

    totalDamage += finalDamage;  // Accumulate total damage from the 3 attacks
    updateHeroHealth(heroStats.health - finalDamage);  // Update hero health
     // Update enemy health
  }

  // Return skill name and total damage
  return { skillName: "Triple Treat", damage: totalDamage };
}

