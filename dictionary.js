
const ISLDictionary = {
    
    "hello": {
        description: "Open hand moving from forehead outward in salutation",
        animation: "wave_hello",
        duration: 2000, 
        handShape: "open",
        requiresTwoHands: false
    },
    
    "thank you": {
        description: "Flat hand touches chin then moves forward",
        animation: "thank_you",
        duration: 1500,
        handShape: "flat",
        requiresTwoHands: false
    },
    
    "how": {
        description: "Both 'Y' handshapes rotating alternately",
        animation: "how_sign",
        duration: 1800,
        handShape: "Y",
        requiresTwoHands: true
    },
    
    "what": {
        description: "Both '5' hands moving outward with questioning expression",
        animation: "what_sign",
        duration: 1600,
        handShape: "five",
        requiresTwoHands: true
    },
    
    "I": {
        description: "Index finger pointing to chest",
        animation: "point_self",
        duration: 1000,
        handShape: "index",
        requiresTwoHands: false
    },
    
    "you": {
        description: "Index finger pointing forward",
        animation: "point_forward",
        duration: 1000,
        handShape: "index",
        requiresTwoHands: false
    },

  "he": {
        description: "Twirl mustache and then point with entire palm",
        animation: "twirl-mustache",
        duration: 1000,
        handShape: "twirl",
        requiresTwoHands: false
    },
    
   
    "water": {
        description: "Letter 'W' tapped on chin",
        animation: "water_sign",
        duration: 1200,
        handShape: "W",
        requiresTwoHands: false
    },
    
    "help": {
        description: "Closed fist on open palm, both moving upward",
        animation: "help_sign",
        duration: 1800,
        handShape: "fist",
        requiresTwoHands: true
    },
    
   
    "doctor": {
        description: "Letter 'D' tapped on wrist (pulse point)",
        animation: "doctor_sign",
        duration: 1500,
        handShape: "D",
        requiresTwoHands: false
    }
};


class ISLTranslator {
    constructor() {
        this.dictionary = ISLDictionary;
    }
    
   
    translateToISL(text) {
        console.log(`Translating: "${text}"`);
        
        
        const cleanText = text.toLowerCase().trim();
        
       
        const words = cleanText.split(/\s+/);
        
       
        const animationSequence = [];
        
        for (const word of words) {
            if (this.dictionary[word]) {
                animationSequence.push(this.dictionary[word]);
                console.log(`✓ Found sign for: "${word}"`);
            } else {
                
                console.log(`✗ No sign for: "${word}" - will fingerspell`);
                animationSequence.push({
                    type: "fingerspell",
                    word: word,
                    duration: word.length * 800  // Estimate
                });
            }
        }
        
       
        return this.applyGrammarRules(animationSequence);
    }
    
    
    applyGrammarRules(sequence) {
       
        if (sequence.length >= 3) {
           
            const firstWord = sequence[0].animation;
            if (firstWord === "point_self") {  
                const reordered = [sequence[0], ...sequence.slice(2), sequence[1]];
                console.log("Applied ISL grammar reordering");
                return reordered;
            }
        }
        return sequence;
    }
    
    
    calculateTotalDuration(sequence) {
        return sequence.reduce((total, sign) => total + (sign.duration || 1000), 0);
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ISLDictionary, ISLTranslator };
}
