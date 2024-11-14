// dialogueTree.ts

export interface DialogueOption {
    text: string;
    response: string;
    nextPhase?: number; // Refers to the next dialogue phase, if applicable
    isCorrect?: boolean; // Indicates if this option advances the conversation
    damageToHero?: number; // Damage dealt to the hero if the option is incorrect
}

export interface DialoguePhase {
    phase: number;
    options: DialogueOption[];
}

export const dialogueTree: DialoguePhase[] = [
    {
        phase: 0,
        options: [
            {
                text: "Hero: “Hey, you look pretty dangerous with all that poison. How does it work?”",
                response: "Toxic Bug: “Oh look, my amazing design is appreciated even by weak humans. I am built to unleash poison and incapacitate any threats!”",
                nextPhase: 1,
                isCorrect: true,
            },
            {
                text: "Hero: “Wow, you look gross. What are you supposed to be?”",
                response: "Toxic Bug: “Gross?! How dare you insult my perfect design?! Take this!”",
                damageToHero: 15,
                isCorrect: false,
            },
            {
                text: "Hero: “Ugh, what’s that smell? Is it you?”",
                response: "Toxic Bug: “The only thing you’ll smell is your own defeat!”",
                damageToHero: 15,
                isCorrect: false,
            },
        ],
    },
    {
        phase: 1,
        options: [
            {
                text: "Hero: “But isn’t that dangerous to you as well? I mean, all that poison inside you must be hard to handle.”",
                response: "Toxic Bug: “Nonsense! I am designed to withstand my own poison... though, if I produce too much... well...”",
                nextPhase: 2,
                isCorrect: true,
            },
            {
                text: "Hero:“Ha! You probably can’t even use that poison effectively.”",
                response: "Toxic Bug: “Oh, you’ll see how effective it is!”",
                damageToHero: 15,
                isCorrect: false,
            },
            {
                text: "Hero: “Yap, yap, yap—too much talk, too little poison.”",
                response: "Toxic Bug: “Too much talk?! I’ll show you just how deadly I am!”",
                damageToHero: 15,
                isCorrect: false,
            },
        ],
    },
    {
        phase: 2,
        options: [
            {
                text: "Hero: “Wait, produce too much? What happens if you do?”",
                response: "Toxic Bug: (Starts to glitch) “If I... if I produce too much... I could... overflow. But that won’t happen!”",
                nextPhase: 3,
                isCorrect: true,
            },
            {
                text: "Hero: “Sounds like you don’t even know your own power.”",
                response: "Toxic Bug: “I know my power better than you ever will. Prepare to suffer!”",
                damageToHero: 15,
                isCorrect: false,
            },
            {
                text: "Hero: “Well, I guess I should just stay quiet and hope you don’t overflow.”",
                response: "Toxic Bug: “Stay quiet? No, you’ll scream in agony!”",
                damageToHero: 15,
                isCorrect: false,
            },
        ],
    },


    {
        phase: 3,
        options: [
            {
                text: "Hero: “Oh, I see. But wouldn’t a real poison master never let that happen? I bet you can’t even produce enough poison to overflow!”",
                response: "Toxic Bug: (Getting defensive) “Of course I can! Watch my full power, human!!”",
                nextPhase: 4,
                isCorrect: true,
            },
            {
                text: "Hero: “Well, I guess you’re not really dangerous if you’re worried about overflowing.”",
                response: "Toxic Bug: “Not dangerous?! I am the deadliest thing you’ll ever face! Time to prove it!”",
                damageToHero: 15,
                isCorrect: false,
            },
            {
                text: "Hero: “Look, I don’t want any trouble. How about we just call it even and you let me go?”",
                response: "Toxic Bug: “Call it even? Hah! Only the weak beg for mercy. Now you’ll pay!”",
                damageToHero: 15,
                isCorrect: false,
            },
        ],
    },


    {
        phase: 4,
        options: [
            {
                text: "",
                response: "VICTORY!",
                isCorrect: true,
            },
           
            
            
        ],
    },
    
];
