/* ==========================================================
   ISL Dictionary
   ========================================================== */

const ISLDictionary = {
    hello: {
        description: "Open hand moving from forehead outward in salutation",
        animation: "wave_hello",
        duration: 2000,
        requiresTwoHands: false
    },

    "thank you": {
        description: "Flat hand touches chin then moves forward",
        animation: "thank_you",
        duration: 1500,
        requiresTwoHands: false
    },

    how: {
        description: "Both 'Y' handshapes rotating alternately",
        animation: "how_sign",
        duration: 1800,
        requiresTwoHands: true
    },

    what: {
        description: "Both open hands moving outward in a questioning motion",
        animation: "what_sign",
        duration: 1600,
        requiresTwoHands: true
    },

    i: {
        description: "Index finger pointing to the chest",
        animation: "point_self",
        duration: 1000,
        requiresTwoHands: false
    },

    you: {
        description: "Index finger pointing forward",
        animation: "point_forward",
        duration: 1000,
        requiresTwoHands: false
    },

    he: {
        description: "Pointing outward to indicate a third person",
        animation: "point_forward",
        duration: 1000,
        requiresTwoHands: false
    },

    water: {
        description: "Letter 'W' tapped on the chin",
        animation: "water_sign",
        duration: 1200,
        requiresTwoHands: false
    },

    help: {
        description: "Closed fist on open palm, both hands moving upward",
        animation: "help_sign",
        duration: 1800,
        requiresTwoHands: true
    },

    doctor: {
        description: "Letter 'D' tapped on the wrist (pulse point)",
        animation: "doctor_sign",
        duration: 1500,
        requiresTwoHands: false
    }
};
function createFingerspellSign(word) {
    return {
        description: `Fingerspelling "${word}"`,
        animation: "fingerspell",
        duration: word.length * 800,
        requiresTwoHands: false,
        word
    };
}

class ISLTranslator {
    constructor(dictionary = ISLDictionary) {
        this.dictionary = dictionary;
    }

    /**
     * Converts plain text into ISL sign objects
     */
    translateToISL(text = "") {
        console.log(`Translating: "${text}"`);

        const words = this._cleanAndSplit(text);
        const sequence = words.map(word => this._resolveWord(word));

        return this.applyGrammarRules(sequence);
    }

    /**
     * Lowercase, trim, split safely
     */
    _cleanAndSplit(text) {
        return text
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .filter(Boolean);
    }

    /**
     * Returns either a dictionary sign or a fingerspelling sign
     */
    _resolveWord(word) {
        const sign = this.dictionary[word];

        if (sign) {
            console.log(`✓ Found ISL sign: "${word}"`);
            return sign;
        }

        console.log(`✗ No sign for "${word}" — fingerspelling`);
        return createFingerspellSign(word);
    }

    /**
     * Very simple ISL grammar rule (extensible later)
     */
    applyGrammarRules(sequence) {
        if (sequence.length < 3) return sequence;

        const firstSign = sequence[0];

        if (firstSign.animation === "point_self") {
            console.log("Applied ISL grammar reordering");
            return [
                sequence[0],
                ...sequence.slice(2),
                sequence[1]
            ];
        }

        return sequence;
    }

    /**
     * Utility for timelines / previews
     */
    calculateTotalDuration(sequence = []) {
        return sequence.reduce(
            (total, sign) => total + (sign.duration || 1000),
            0
        );
    }
}

