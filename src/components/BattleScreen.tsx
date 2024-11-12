// BattleScreen.tsx

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { swordAttack ,debugSkill ,ultimateSkill,loopAttack } from './skills';  // Import the sword attack skill
import { damageEnemy } from './EnemyStats1Redux';
import { heroTakesDamage, updateEssence ,restoreHealth,activateVeil} from './HeroStatsRedux';  // Include updateHeroEssence
import './BattleScreen.css';
import { nullPointerVenomAttack, tripleTreatAttack } from './EnemyStats1';
import { useItem } from './ItemsRedux';  // Import the useItem action


const BattleScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const enemy = useSelector((state: RootState) => state.enemyStats);
  const hero = useSelector((state: RootState) => state.heroStats);
    const skills = useSelector((state: RootState) => state.skills.skills);
    const items = useSelector((state: RootState) => state.items.items);  // Access items from Redux
  const dispatch = useDispatch();

  const [isInFightMode, setIsInFightMode] = useState(false);
    const [isInItemMode, setIsInItemMode] = useState(false);  // Track if in item mode
    

  const handleFightClick = () => {
      setIsInFightMode(true);
      setIsInItemMode(false);  // Make sure to exit item mode
  };

  const handleReturnClick = () => {
      setIsInFightMode(false);
      setIsInItemMode(false);  // Make sure to exit item mode
    };
    
    const handleItemClick = () => {
        setIsInItemMode(true);  // Enter item mode to display items
        setIsInFightMode(false);  // Exit fight mode
    };
    
    const handleUseItem = (itemId: string) => {
        // You can handle specific item usage here
        // Example: Using the potion on the hero
        dispatch(useItem({ itemId, target: 'hero' }));
      };

    // Function to handle Loop Attack click
  const handleLoopAttack = () => {
    console.log("Loop Attack clicked!");

    // Apply Loop Attack effect
      const loopDamage = loopAttack.applyEffect(enemy.health);
      dispatch(updateEssence(hero.essence - 30));  // Update essence after using the Debug skill
    
    // Update the enemy's health
    dispatch(damageEnemy(loopDamage));

    // After the hero's attack, let the enemy counterattack randomly
    const randomEnemyAttack = Math.random() < 0.5 ? 'nullPointerVenom' : 'tripleTreat';
    
    if (randomEnemyAttack === 'nullPointerVenom') {
      // Apply the enemy's NullPointer Venom attack
      const venomAttack = nullPointerVenomAttack();
      console.log(venomAttack.skillName, venomAttack.damage);
      // Apply the damage to the hero
      dispatch(heroTakesDamage(venomAttack.damage));
    } else {
      // Apply the enemy's Triple Treat attack
      const treatAttack = tripleTreatAttack();
      console.log(treatAttack.skillName, treatAttack.damage);
      // Apply the damage to the hero
      dispatch(heroTakesDamage(treatAttack.damage));
    }
  };
    // Function to handle Ultimate Skill click
const handleUltimateSkill = () => {
    console.log("Ultimate Skill clicked!");
  
    // Heal the hero to full health
    const healAmount = hero.maxHealth - hero.health; // Calculate the healing amount
    dispatch(restoreHealth(healAmount));  // Dispatch action to restore health to full
    dispatch(updateEssence(hero.essence - 100));  // Update essence after using the Debug skill
  
    // Calculate and apply the Ultimate Skill damage to the enemy
    const ultimateDamage = ultimateSkill.applyEffect(enemy.health);  // Get the damage from the skill's applyEffect function
    
    // Update the enemy's health
    dispatch(damageEnemy(ultimateDamage));
  
    // Enemy counterattack logic for Ultimate skill
    const randomEnemyAttack = Math.random() < 0.5 ? 'nullPointerVenom' : 'tripleTreat';
  
    if (randomEnemyAttack === 'nullPointerVenom') {
      // Apply the enemy's NullPointer Venom attack
      const venomAttack = nullPointerVenomAttack();
      console.log(venomAttack.skillName, venomAttack.damage);
      // Apply the damage to the hero
      dispatch(heroTakesDamage(venomAttack.damage));
    } else {
      // Apply the enemy's Triple Treat attack
      const treatAttack = tripleTreatAttack();
      console.log(treatAttack.skillName, treatAttack.damage);
      // Apply the damage to the hero
      dispatch(heroTakesDamage(treatAttack.damage));
    }
  };
  
     // Function to handle Veil Skill click
  const handleVeilSkill = () => {
      console.log("Veil Skill clicked!");
      dispatch(updateEssence(hero.essence - 20));  // Update essence after using the Debug skill
    
    // Activate the Veil effect (reduce incoming damage by 30%)
    dispatch(activateVeil());
    
    // Optionally, deactivate after a certain number of turns (if needed)
      // dispatch(deactivateVeil()); // If you want to deactivate it after a turn
      
      
    // Enemy counterattack logic for Debug skill
    const randomEnemyAttack = Math.random() < 0.5 ? 'nullPointerVenom' : 'tripleTreat';

    if (randomEnemyAttack === 'nullPointerVenom') {
      // Apply the enemy's NullPointer Venom attack
      const venomAttack = nullPointerVenomAttack();
      console.log(venomAttack.skillName, venomAttack.damage);
      // Apply the damage to the hero
      dispatch(heroTakesDamage(venomAttack.damage));
    } else {
      // Apply the enemy's Triple Treat attack
      const treatAttack = tripleTreatAttack();
      console.log(treatAttack.skillName, treatAttack.damage);
      // Apply the damage to the hero
      dispatch(heroTakesDamage(treatAttack.damage));
    }
  };
    
  // Function to handle Sword Attack click
  const handleSwordAttack = () => {
    console.log("Sword Attack clicked!");

    // Calculate and apply the Sword Attack damage to the enemy
    const swordDamage = swordAttack.applyEffect(enemy.health);  // Get the damage from the skill's applyEffect function
    
    // Update the enemy's health
    dispatch(damageEnemy(swordDamage));

    // After the hero's attack, let the enemy counterattack randomly
    const randomEnemyAttack = Math.random() < 0.5 ? 'nullPointerVenom' : 'tripleTreat';
    
    if (randomEnemyAttack === 'nullPointerVenom') {
      // Apply the enemy's NullPointer Venom attack
      const venomAttack = nullPointerVenomAttack();
      console.log(venomAttack.skillName, venomAttack.damage);
      // Apply the damage to the hero
      dispatch(heroTakesDamage(venomAttack.damage));
    } else {
      // Apply the enemy's Triple Treat attack
      const treatAttack = tripleTreatAttack();
      console.log(treatAttack.skillName, treatAttack.damage);
      // Apply the damage to the hero
      dispatch(heroTakesDamage(treatAttack.damage));
    }
  };

  // Function to handle Debug Skill click
  const handleDebugSkill = () => {
    console.log("Debug Skill clicked!");

    // Apply the Debug Skill effect
      const healAmount = debugSkill.applyEffect(hero.health);  // This will restore health and consume essence
      const newHealth = Math.min(hero.health + healAmount, hero.maxHealth);
      dispatch(restoreHealth(newHealth - hero.health));  // Ensure health doesn't exceed max
    
    // Dispatch actions to update the UI
    if (healAmount > 0) {
      dispatch(restoreHealth(healAmount));  // Assuming healing is done here as part of applying effect
      dispatch(updateEssence(hero.essence - 30));  // Update essence after using the Debug skill
    }

    // Enemy counterattack logic for Debug skill
    const randomEnemyAttack = Math.random() < 0.5 ? 'nullPointerVenom' : 'tripleTreat';

    if (randomEnemyAttack === 'nullPointerVenom') {
      // Apply the enemy's NullPointer Venom attack
      const venomAttack = nullPointerVenomAttack();
      console.log(venomAttack.skillName, venomAttack.damage);
      // Apply the damage to the hero
      dispatch(heroTakesDamage(venomAttack.damage));
    } else {
      // Apply the enemy's Triple Treat attack
      const treatAttack = tripleTreatAttack();
      console.log(treatAttack.skillName, treatAttack.damage);
      // Apply the damage to the hero
      dispatch(heroTakesDamage(treatAttack.damage));
    }
  };

  const availableSkills = Object.values(skills).filter(skill => skill.isVisible);

  return (
    <div className="battle-container">
      {/* Container 1: Enemy Info */}
      <div className="container1">
        <div className="enemy-name">{enemy.name}</div>
        <img className="enemy-image" src={enemy.image} alt={enemy.name} />

        {/* Enemy Health Gauge */}
        <div className="enemy-health-bar">
          <div
            className="enemy-health"
            style={{
              width: `${(enemy.health / enemy.maxHealth) * 100}%`,
              transition: 'width 1s ease-out'
            }}
          ></div>
          <div className="enemy-health-text">
            {enemy.health}/{enemy.maxHealth}
          </div>
        </div>
      </div>

      {/* Container 2: Battle Log */}
      <div className="container2">
        <div className="battle-log">
          <div className="log-message">THE BATTLE HAS STARTED</div>
        </div>
      </div>

      {/* Container 3: Hero Health and Essence */}
      <div className="container3">
        <div className="hero-health-bar">
          <div
            className="hero-health"
            style={{ width: `${(hero.health / hero.maxHealth) * 100}%` }}
          ></div>
          <div className="hero-health-text">
            {hero.health}/{hero.maxHealth}
          </div>
        </div>

        <div className="hero-essence-bar">
          <div
            className="hero-essence"
            style={{ width: `${(hero.essence / hero.maxEssence) * 100}%` }}
          ></div>
          <div className="hero-essence-text">
            {hero.essence}/{hero.maxEssence}
          </div>
        </div>
      </div>

      <div className="container4">
        {!isInFightMode && !isInItemMode ? (
          <>
            <button className="attack-button" onClick={handleFightClick}>Fight</button>
            <button className="talk-button">Talk</button>
            <button className="item-button" onClick={handleItemClick}>Item</button>
            <button className="run-button" onClick={onClose}>Run</button>
          </>
        ) : isInItemMode ? (
          <>
            {/* Display available items as buttons */}
            {Object.values(items)
              .filter(item => item.isVisible)  // Only show visible items
              .map(item => (
                <button
                  key={item.id}
                  className="item-button"
                  onClick={() => handleUseItem(item.id)} // Use item
                >
                  {item.name} X {item.maxAmount}
                </button>
            ))}
            <button className="return-button" onClick={handleReturnClick}>Return</button>
          </>
        ) : (
          <>
            {/* Display available skills as buttons */}
            {availableSkills.map(skill => (
              <button
                key={skill.name}
                className="skill-button"
                onClick={() => {
                  if (skill.name === "Sword Attack") {
                    handleSwordAttack();  // Trigger Sword Attack logic
                    }
                    if (skill.name === "Veil") {
                        handleVeilSkill();  // Trigger Veil skill logic
                    }
                  if (skill.name === "Debug") {
                    handleDebugSkill();  // Trigger Debug Skill logic
                    }
                    if (skill.name === "Ultimate Skill") {
                        handleUltimateSkill();  // Trigger Debug Skill logic
                    }
                    if (skill.name === "Loop Attack") {
                        handleLoopAttack();  // Trigger Loop Attack logic
                      }
                }}
              >
                {skill.name}
              </button>
            ))}
            <button className="return-button" onClick={handleReturnClick}>Return</button>
          </>
        )}
      </div>
    </div>
  );
};

export default BattleScreen;