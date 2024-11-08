import React, { useState } from 'react';
import { heroStats, updateHealth as updateHeroHealth } from './HeroStats';
import { enemyStats, updateEnemyHealth, enemyAttack } from './EnemyStats1';
import { swordAttack } from './skills';
import './BattleScreen.css';
import enemyimage from '../assets/npcs/ToxicBug.png';



const BattleScreen: React.FC = () => {
    const [heroHealth, setHeroHealth] = useState(heroStats.health);
    const [enemyHealth, setEnemyHealth] = useState(enemyStats.health);
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [isSelectingSkill, setIsSelectingSkill] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [conversationStage, setConversationStage] = useState(0);
    const [isTalkButtonDisabled, setIsTalkButtonDisabled] = useState(false); // Track if the Talk button was clicked

    const heroResponses = [
        [
            'Hero: "Hey, you look pretty dangerous with all that poison. How does it work?"',
            'Hero: "Wow, you look gross. What are you supposed to be?"',
            'Hero: "Ugh, what’s that smell? Is it you?"'
        ],
        [
            'Hero: "But isn’t that dangerous to you as well? I mean, all that poison inside you must be hard to handle."',
            'Hero: "Ha! You probably can’t even use that poison effectively."',
            'Hero: “Yap, yap, yap—too much talk, too little poison.”'
        ],
        [
            'Hero: "Wait, produce too much? What happens if you do?"',
            'Hero: "Sounds like you don’t even know your own power."',
            'Hero: “Well, I guess I should just stay quiet and hope you don’t overflow.”'
        ],
        [
            'Hero: "Oh, I see. But wouldn’t a real poison master never let that happen? I bet you can’t even produce enough poison to overflow!"',
            'Hero: "Look, I don’t want any trouble. How about we just call it even and you let me go?"',
            'Hero: “Well, I guess I should just stay quiet and hope you don’t overflow.”'
        ]
    ];

    const handleHeroAttack = (skill: string) => {
        let damage = 0;
        if (skill === 'Sword Attack') {
            damage = swordAttack.applyEffect(enemyHealth);
        }
        const newEnemyHealth = Math.max(enemyHealth - damage, 0);
        updateEnemyHealth(newEnemyHealth);
        setEnemyHealth(newEnemyHealth);
        setBattleLog(prevLog => [
            ...prevLog,
            `Hero used ${skill}, dealing ${damage} damage to ${enemyStats.name}!`
        ]);
        handleEnemyAttack();
        setIsSelectingSkill(false);
    };

    const handleEnemyAttack = () => {
        const damage = enemyAttack();
        const newHeroHealth = Math.max(heroHealth - damage, 0);
        updateHeroHealth(newHeroHealth);
        setHeroHealth(newHeroHealth);
        setBattleLog(prevLog => [
            ...prevLog,
            `Enemy dealt ${damage} damage to Hero!`
        ]);
    };

    const startTalking = () => {
        setIsTalking(true);
        setBattleLog(prevLog => [
            ...prevLog,
            'You approach to start a conversation with Toxic Bug.'
        ]);
        setIsTalkButtonDisabled(true); // Disable the Talk button after it's clicked
    };

    const handleDialogueChoice = (choice: number) => {
        setBattleLog(prevLog => [
            ...prevLog,
            heroResponses[conversationStage][choice - 1]
        ]);


        switch (conversationStage) {
            case 0:
                if (choice === 1) {
                    setBattleLog(prevLog => [
                        ...prevLog,
                        'Toxic Bug: "Oh look, my amazing design is appreciated even by weak humans. I am built to unleash poison and incapacitate any threats!"'
                    ]);
                    setConversationStage(1);
                } else if (choice === 2) {
                    setBattleLog(prevLog => [
                        ...prevLog,
                        'Toxic Bug: "How rude! Disgusting? You will pay for that!"'
                    ]);
                    handleEnemyAttack();
                    setIsTalking(false);
                } else {
                    setBattleLog(prevLog => [
                        ...prevLog,
                        'Toxic Bug: "Insulting my smell? Prepare to be poisoned, foolish human!"'
                    ]);
                    handleEnemyAttack();
                    setIsTalking(false);
                }
                break;
            case 1:
                if (choice === 1) {
                    setBattleLog(prevLog => [
                        ...prevLog,
                        'Toxic Bug: "Nonsense! I am designed to withstand my own poison... though, if I produce too much... well..."'
                    ]);
                    setConversationStage(2);
                } else if (choice === 2) {
                    setBattleLog(prevLog => [
                        ...prevLog,
                        'Toxic Bug: "How dare you underestimate me! I’ll show you!"'
                    ]);
                    handleEnemyAttack();
                    setIsTalking(false);
                } else {
                    setBattleLog(prevLog => [
                        ...prevLog,
                        'Toxic Bug: "Talking too much? I’ll show you the power of my poison!"'
                    ]);
                    handleEnemyAttack();
                    setIsTalking(false);
                }
                break;
            case 2:
                if (choice === 1) {
                    setBattleLog(prevLog => [
                        ...prevLog,
                        'Toxic Bug: "If I... if I produce too much... I could... overflow. But that won’t happen!"'
                    ]);
                    setConversationStage(3);
                } else if (choice === 2) {
                    setBattleLog(prevLog => [
                        ...prevLog,
                        'Toxic Bug: "Know my power well! I will destroy you for your insolence!"'
                    ]);
                    handleEnemyAttack();
                    setIsTalking(false);
                } else {
                    setBattleLog(prevLog => [
                        ...prevLog,
                        'Toxic Bug: "Overflows? I’m the master of my own venom!"'
                    ]);
                    handleEnemyAttack();
                    setIsTalking(false);
                }
                break;
            case 3:
                if (choice === 1) {
                    setBattleLog(prevLog => [
                        ...prevLog,
                        'Toxic Bug: "(Getting defensive) Of course I can! Watch my full power, human!!"'
                    ]);
                    setEnemyHealth(0);
                    setBattleLog(prevLog => [
                        ...prevLog,
                        'Toxic Bug overflows and self-destructs! You win!'
                    ]);
                    setIsTalking(false);
                } else if (choice === 2) {
                    setBattleLog(prevLog => [
                        ...prevLog,
                        'Toxic Bug: "I won’t let you get away with that mockery!"'
                    ]);
                    handleEnemyAttack();
                    setIsTalking(false);
                } else {
                    setBattleLog(prevLog => [
                        ...prevLog,
                        'Toxic Bug: "You think you can scare me? Foolish human!"'
                    ]);
                    handleEnemyAttack();
                    setIsTalking(false);
                }
                break;
            default:
                break;
        }
    };

    return (
        <div className="battle-container">
            <div className="battlecontainer1">
                <h3>{enemyStats.name}</h3>
                <img src={enemyimage} alt="Monster" className='enemy-img' />
                <div>Health: {enemyHealth} / {enemyStats.maxHealth}</div>
                <div className="health-bar">
                    <div
                        className="enemy-health"
                        style={{
                            width: `${(enemyHealth / enemyStats.maxHealth) * 100}%`,
                            transition: 'width 0.5s ease-in-out'
                        }}></div>
                </div>
            </div>

            <div className="battlecontainer2">
                <h1>Battle Log</h1>
                <div>
                    {battleLog.map((log, index) => (
                        <p key={index}>{log}</p>
                    ))}
                </div>
            </div>

            <div className="battlecontainer3">
                <h3>Hero Info</h3>
                <div>Name: Hero Name</div>
                <div>HP: {heroHealth} / {heroStats.maxHealth}</div>
                <div className="health-bar">
                    <div
                        className="hero-health"
                        style={{
                            width: `${(heroHealth / heroStats.maxHealth) * 100}%`,
                            transition: 'width 0.5s ease-in-out'
                        }}></div>
                </div>
            </div>

            <div className="battlecontainer4">
                {isSelectingSkill ? (
                    <div className="skills-container">
                        <button onClick={() => handleHeroAttack('Sword Attack')}>Sword Attack</button>
                    </div>
                ) : isTalking ? (
                    <div className="dialogue-options-container">
                        <button onClick={() => handleDialogueChoice(1)}>
                            {heroResponses[conversationStage][0]}
                        </button>
                        <button onClick={() => handleDialogueChoice(2)}>
                            {heroResponses[conversationStage][1]}
                        </button>
                        <button onClick={() => handleDialogueChoice(3)}>
                            {heroResponses[conversationStage][2]}
                        </button>
                    </div>
                ) : (
                    <div className="battle-options">
                        <button onClick={() => setIsSelectingSkill(true)} className='fight-button'>Fight</button>
                        <button onClick={() => startTalking()} disabled={isTalkButtonDisabled} className='talk-button'>Talk</button>
                        <button className='item-button'>Item</button>
                        <button className='run-button'>Run</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BattleScreen;
