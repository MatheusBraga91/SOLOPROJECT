import { Dispatch, SetStateAction } from 'react';

type HandleEnemyAttack = () => void;

export const heroResponses = [
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

export const handleDialogueChoice = (
  choice: number,
  conversationStage: number,
  setConversationStage: Dispatch<SetStateAction<number>>,
  setIsTalking: Dispatch<SetStateAction<boolean>>,
  setBattleLog: Dispatch<SetStateAction<string[]>>,
  handleEnemyAttack: HandleEnemyAttack,
  setEnemyHealth: Dispatch<SetStateAction<number>>
) => {
  switch (conversationStage) {
    case 0:
      if (choice === 1) {
        setBattleLog(prevLog => [
          ...prevLog,
          heroResponses[0][choice - 1],
          'Toxic Bug: "Oh look, my amazing design is appreciated even by weak humans. I am built to unleash poison and incapacitate any threats!"'
        ]);
        setConversationStage(1);
      } else {
        setBattleLog(prevLog => [
          ...prevLog,
          heroResponses[0][choice - 1],
          choice === 2 ? 'Toxic Bug: "How rude! Disgusting? You will pay for that!"' : 'Toxic Bug: "Insulting my smell? Prepare to be poisoned, foolish human!"'
        ]);
        handleEnemyAttack();
        setIsTalking(false);
      }
      break;
    case 1:
      if (choice === 1) {
        setBattleLog(prevLog => [
          ...prevLog,
          heroResponses[1][choice - 1],
          'Toxic Bug: "Nonsense! I am designed to withstand my own poison... though, if I produce too much... well..."'
        ]);
        setConversationStage(2);
      } else {
        setBattleLog(prevLog => [
          ...prevLog,
          heroResponses[1][choice - 1],
          'Toxic Bug: "How dare you underestimate me! I’ll show you!"'
        ]);
        handleEnemyAttack();
        setIsTalking(false);
      }
      break;
    case 2:
      if (choice === 1) {
        setBattleLog(prevLog => [
          ...prevLog,
          heroResponses[2][choice - 1],
          'Toxic Bug: "If I... if I produce too much... I could... overflow. But that won’t happen!"'
        ]);
        setConversationStage(3);
      } else {
        setBattleLog(prevLog => [
          ...prevLog,
          heroResponses[2][choice - 1],
          'Toxic Bug: "Know my power well! I will destroy you for your insolence!"'
        ]);
        handleEnemyAttack();
        setIsTalking(false);
      }
      break;
    case 3:
      if (choice === 1) {
        setBattleLog(prevLog => [
          ...prevLog,
          heroResponses[3][choice - 1],
          'Toxic Bug: "(Getting defensive) Of course I can! Watch my full power, human!!"',
          'Toxic Bug overflows and self-destructs! You win!'
        ]);
        setEnemyHealth(0);
        setIsTalking(false);
      } else {
        setBattleLog(prevLog => [
          ...prevLog,
          heroResponses[3][choice - 1],
          'Toxic Bug: "I won’t let you get away with that mockery!"'
        ]);
        handleEnemyAttack();
        setIsTalking(false);
      }
      break;
    default:
      break;
  }
};
