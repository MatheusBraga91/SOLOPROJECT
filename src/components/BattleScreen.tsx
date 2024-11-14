import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { swordAttack, debugSkill, ultimateSkill, loopAttack } from './skills'; 
import { damageEnemy } from './EnemyStats1Redux';
import { heroTakesDamage, updateEssence, restoreHealth, activateVeil } from './HeroStatsRedux'; 
import './BattleScreen.css';
import { nullPointerVenomAttack, tripleTreatAttack } from './EnemyStats1';
import { items } from './Items'; 
import { useItem } from './ItemsRedux';
import { DialogueOption, dialogueTree } from './dialoguetree';


const BattleScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const enemy = useSelector((state: RootState) => state.enemyStats);
  const hero = useSelector((state: RootState) => state.heroStats);
  const skills = useSelector((state: RootState) => state.skills.skills);
  const itemsInState = useSelector((state: RootState) => state.items.items);  // Access items from Redux
  const dispatch = useDispatch()
  const [isInFightMode, setIsInFightMode] = useState(false);
  const [isInItemMode, setIsInItemMode] = useState(false);
  const [isSelectingTarget, setIsSelectingTarget] = useState(false);  // To manage target selection
    const [selectedItem, setSelectedItem] = useState<string | null>(null);  // To track the selected item for use
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [currentPhase, setCurrentPhase] = useState(0);  // Track the current dialogue phase
    const [isInDialogue, setIsInDialogue] = useState(false);  // Flag for dialogue mode
    const [isBattleWon, setIsBattleWon] = useState(false);  
    
    
    
  // Check for enemy health and trigger the win state
  useEffect(() => {
    if (enemy.health <= 0 && !isBattleWon) {
      setBattleLog(prevLog => [
        ...prevLog,
        "You won!"
      ]);
      setIsBattleWon(true);  // Set battle as won

      // Disable mouse clicks for 3 seconds
      document.body.style.pointerEvents = 'none';

      // Close the battle screen after 3 seconds
      setTimeout(() => {
        document.body.style.pointerEvents = 'auto'; // Re-enable clicks after 3 seconds
        onClose(); // Close the battle screen
      }, 3000);
    }
  }, [enemy.health, isBattleWon, onClose]);

  const handleFightClick = () => {
    setIsInFightMode(true);
    setIsInItemMode(false); 
  };

  const handleReturnClick = () => {
    setIsInFightMode(false);
    setIsInItemMode(false); 
    setIsSelectingTarget(false);  // Reset target selection
  };

  const handleItemClick = () => {
    setIsInItemMode(true);  
    setIsInFightMode(false);  
    };
    
    const handleTalkClick = () => {
        setIsInDialogue(true); // Start the dialogue
        setIsInFightMode(false);
        setIsInItemMode(false);
        setCurrentPhase(0); // Start at the first dialogue phase
        setBattleLog(prevLog => [
          ...prevLog,
          "You approach the enemy to talk..."
        ]);
      };

  const handleUseItem = (itemId: string) => {
    setSelectedItem(itemId);
    setIsSelectingTarget(true);  // Start target selection process
  };

  const handleTargetSelection = (target: 'hero' | 'enemy') => {
    if (selectedItem) {
        const item = items[selectedItem];
        const itemState = itemsInState[selectedItem];
      if (item.name === 'Potion' && itemState.currentAmount > 0) {
        if (target === 'hero') {
          const healAmount = 5; // Heal amount for the potion
            dispatch(restoreHealth(healAmount));  // Heal hero
            setBattleLog(prevLog => [
                ...prevLog,
                `You used Potion on yourself healing by ${healAmount}`
              ]);
        } else if (target === 'enemy') {
          // Ensure the enemy takes healing, not damage
          const healAmount = 5; // Heal amount for the potion
            dispatch(damageEnemy(-healAmount));  // Apply healing effect to enemy
            setBattleLog(prevLog => [
                ...prevLog,
                `You threw the potion vial at the enemy's face...healing him for 5 HP...`
              ]);
          }
          dispatch(useItem({ itemId: selectedItem, target })); // Reduce potion amount by 1
        
      }
    }
    setIsSelectingTarget(false);  // End target selection
    setSelectedItem(null);  // Clear selected item
  };

  const handleLoopAttack = () => {
    console.log("Loop Attack clicked!");
    const loopDamage = loopAttack.applyEffect(enemy.health);
    dispatch(updateEssence(hero.essence - 30)); 
      dispatch(damageEnemy(loopDamage));
      setBattleLog(prevLog => [
        ...prevLog,
        `You used Loop Attack! Dealing ${loopDamage} to the enemy!`
      ]);

      const randomEnemyAttack = Math.random() < 0.5 ? 'nullPointerVenom' : 'tripleTreat';
      if (randomEnemyAttack === 'nullPointerVenom') {
        const venomAttack = nullPointerVenomAttack();
          dispatch(heroTakesDamage(venomAttack.damage));
          setBattleLog(prevLog => [
              ...prevLog,
              `The enemy used Null Venom Attack dealing ${venomAttack.damage}!`
            ]);
      } else {
        const treatAttack = tripleTreatAttack();
          dispatch(heroTakesDamage(treatAttack.damage));
          setBattleLog(prevLog => [
              ...prevLog,
              `The enemy used Triple Treat Attack dealing ${treatAttack.damage}!`
            ]);
      }
    };

  const handleUltimateSkill = () => {
    console.log("Ultimate Skill clicked!");
    const healAmount = hero.maxHealth - hero.health;
    dispatch(restoreHealth(healAmount)); 
    dispatch(updateEssence(hero.essence - 100)); 
    const ultimateDamage = ultimateSkill.applyEffect(enemy.health);  
      dispatch(damageEnemy(ultimateDamage));
      setBattleLog(prevLog => [
        ...prevLog,
        `YOU GATHERED ALL YOUR ENERGY AND USED ULTIMATE ATTACK! DEALING ${ultimateDamage} TO THE ENEMY AND HEALED YOURSELF FULLY!`
      ]);

      const randomEnemyAttack = Math.random() < 0.5 ? 'nullPointerVenom' : 'tripleTreat';
      if (randomEnemyAttack === 'nullPointerVenom') {
        const venomAttack = nullPointerVenomAttack();
          dispatch(heroTakesDamage(venomAttack.damage));
          setBattleLog(prevLog => [
              ...prevLog,
              `The enemy used Null Venom Attack dealing ${venomAttack.damage}!`
            ]);
      } else {
        const treatAttack = tripleTreatAttack();
          dispatch(heroTakesDamage(treatAttack.damage));
          setBattleLog(prevLog => [
              ...prevLog,
              `The enemy used Triple Treat Attack dealing ${treatAttack.damage}!`
            ]);
      }
    };


  const handleVeilSkill = () => {
    console.log("Veil Skill clicked!");
    dispatch(updateEssence(hero.essence - 20));  
      dispatch(activateVeil());
      setBattleLog(prevLog => [
        ...prevLog,
        `You used the Veil Skill! Damage income reduced by 30%!`
      ]);
  
    
      const randomEnemyAttack = Math.random() < 0.5 ? 'nullPointerVenom' : 'tripleTreat';
      if (randomEnemyAttack === 'nullPointerVenom') {
        const venomAttack = nullPointerVenomAttack();
          dispatch(heroTakesDamage(venomAttack.damage));
          setBattleLog(prevLog => [
              ...prevLog,
              `The enemy used Null Venom Attack dealing ${venomAttack.damage}!`
            ]);
      } else {
        const treatAttack = tripleTreatAttack();
          dispatch(heroTakesDamage(treatAttack.damage));
          setBattleLog(prevLog => [
              ...prevLog,
              `The enemy used Triple Treat Attack dealing ${treatAttack.damage}!`
            ]);
      }
    };

  const handleSwordAttack = () => {
    console.log("Sword Attack clicked!");
    const swordDamage = swordAttack.applyEffect(enemy.health);  
      dispatch(damageEnemy(swordDamage));
      setBattleLog(prevLog => [
        ...prevLog,
        `You used Sword Attack! Dealing ${swordDamage} to the enemy!`
      ]);
  

    const randomEnemyAttack = Math.random() < 0.5 ? 'nullPointerVenom' : 'tripleTreat';
    if (randomEnemyAttack === 'nullPointerVenom') {
      const venomAttack = nullPointerVenomAttack();
        dispatch(heroTakesDamage(venomAttack.damage));
        setBattleLog(prevLog => [
            ...prevLog,
            `The enemy used Null Venom Attack dealing ${venomAttack.damage}!`
          ]);
    } else {
      const treatAttack = tripleTreatAttack();
        dispatch(heroTakesDamage(treatAttack.damage));
        setBattleLog(prevLog => [
            ...prevLog,
            `The enemy used Triple Treat Attack dealing ${treatAttack.damage}!`
          ]);
    }
  };

  const handleDebugSkill = () => {
    console.log("Debug Skill clicked!");
    const healAmount = debugSkill.applyEffect(hero.health);  
    const newHealth = Math.min(hero.health + healAmount, hero.maxHealth);
    dispatch(restoreHealth(newHealth - hero.health)); 
    setBattleLog(prevLog => [
        ...prevLog,
        `You used the Debug Skill! Healing yourself by ${healAmount} !`
      ]);
    if (healAmount > 0) {
      dispatch(restoreHealth(healAmount));  
      dispatch(updateEssence(hero.essence - 30));  
    }

    const randomEnemyAttack = Math.random() < 0.5 ? 'nullPointerVenom' : 'tripleTreat';
    if (randomEnemyAttack === 'nullPointerVenom') {
      const venomAttack = nullPointerVenomAttack();
        dispatch(heroTakesDamage(venomAttack.damage));
        setBattleLog(prevLog => [
            ...prevLog,
            `The enemy used Null Venom Attack dealing ${venomAttack.damage}!`
          ]);
    } else {
      const treatAttack = tripleTreatAttack();
        dispatch(heroTakesDamage(treatAttack.damage));
        setBattleLog(prevLog => [
            ...prevLog,
            `The enemy used Triple Treat Attack dealing ${treatAttack.damage}!`
          ]);
    }
  };

  const handleDialogueOptionClick = (option: DialogueOption) => {
    if (option.isCorrect) {
      setCurrentPhase(option.nextPhase || currentPhase); // Move to the next phase if correct
      setBattleLog(prevLog => [
        ...prevLog,
        option.response
      ]);
      if (option.nextPhase === 4) {  // Enemy self-destructs on final correct choice
        dispatch(damageEnemy(enemy.health)); // Set enemy health to zero
        setBattleLog(prevLog => [
          ...prevLog,
            "You fooled the enemy into overflowing!",
            "NOOOOOO HOW COULD THIS BE?!?!GAAAARRRRGH"
        ]);
      }
    } else {
      dispatch(heroTakesDamage(option.damageToHero || 0)); // Deal damage to the hero
      setBattleLog(prevLog => [
        ...prevLog,
        option.response
      ]);
      setIsInDialogue(false); // End the dialogue if incorrect choice
    }
  };

    
  
  const availableSkills = Object.values(skills).filter(skill => skill.isVisible);

  return (
    <div className="battle-container">
      <div className="container1">
        <div className="enemy-name">{enemy.name}</div>
        <img className="enemy-image" src={enemy.image} alt={enemy.name} />
        <div className="enemy-health-bar">
          <div
            className="enemy-health"
            style={{
              width: `${(enemy.health / enemy.maxHealth) * 100}%`,
              transition: 'width 1s ease-out',
            }}
          ></div>
          <div className="enemy-health-text">
            {enemy.health}/{enemy.maxHealth}
          </div>
        </div>
      </div>

      <div className="container2">
    <div className="battle-log">
        {battleLog.map((message, index) => (
            <div key={index} className="log-container">
                <div className="log-message">{message}</div>
            </div>
        ))}
    </div>

              
      </div>
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
  {!isInFightMode && !isInItemMode && !isInDialogue? (
    <>
      <button className="attack-button" onClick={handleFightClick}>Fight</button>
      <button className="talk-button" onClick={handleTalkClick}>Talk</button>
      <button className="item-button" onClick={handleItemClick}>Item</button>
      <button className="run-button" onClick={onClose}>Run</button>
    </>
  ) : isInFightMode ? (
    <>
      {availableSkills.map(skill => (
        <button
          key={skill.name}
          className="skill-button"
          onClick={() => {
            if (skill.name === "Sword Attack") {
              handleSwordAttack();
            }
            if (skill.name === "Veil") {
              handleVeilSkill();
            }
            if (skill.name === "Debug") {
              handleDebugSkill();
            }
            if (skill.name === "Ultimate Skill") {
              handleUltimateSkill();
            }
            if (skill.name === "Loop Attack") {
              handleLoopAttack();
            }
          }}
        >
          {skill.name}
        </button>
      ))}
      <button className="return-button" onClick={handleReturnClick}>Return</button>
    </>
  ) : isInItemMode ? (
    <>
      {Object.keys(itemsInState).map(itemId => {
        const item = items[itemId];
        const itemState = itemsInState[itemId];  // Get the current amount from Redux state

        if (item.isVisible) {  // Only show visible items
          return (
            <button
              key={itemId}
              className="item-button"
              onClick={() => handleUseItem(itemId)}
              disabled={itemState.currentAmount <= 0}  // Disable button if currentAmount is 0
            >
              {item.name} {itemState.currentAmount}/{itemState.maxAmount}
            </button>
          );
        }
        return null;  // Don't render non-visible items
      })}
      <button className="return-button" onClick={handleReturnClick}>Return</button>
    </>
  ) : null}

  {/* Dialogue Phase */}
  {isInDialogue && (
    <>
      {dialogueTree[currentPhase].options.map((option, index) => (
        <button className="buttondialogue"
          key={index}
          onClick={() => handleDialogueOptionClick(option)}
        >
          {option.text}
        </button>
      ))}
    </>
  )}

  {/* Target Selection */}
  {isSelectingTarget && selectedItem && (
    <div className="target-selection">
      <button onClick={() => handleTargetSelection('hero')}>Hero</button>
      <button onClick={() => handleTargetSelection('enemy')}>Enemy</button>
    </div>
  )}
</div>


    </div>
  );
};

export default BattleScreen;
