class ISLAvatar {
    constructor(containerId) {
        
        this.container = document.getElementById(containerId);

        if (!this.container) {
            throw new Error(`ISLAvatar: container with id "${containerId}" not found`);
        }

        // Animation error
        this.isAnimating = false;

        // Known animations to CSS 
        this.animations = {
            wave_hello: 'avatar-wave',
            thank_you: 'avatar-thank-you',
            how_sign: 'avatar-how',
            what_sign: 'avatar-what',
            point_self: 'avatar-point-self',
            point_forward: 'avatar-point-forward',
            water_sign: 'avatar-water',
            help_sign: 'avatar-help',
            doctor_sign: 'avatar-doctor',
            fingerspell: 'avatar-fingerspell'
        };

        this.createAvatar();
    }

    /**
     * Builds the avatar HTML 
     */
    createAvatar() {
        this.container.innerHTML = `
            <div class="avatar-container">
                <div class="avatar-head">
                    <div class="avatar-face">
                        <div class="avatar-eye left"></div>
                        <div class="avatar-eye right"></div>
                        <div class="avatar-mouth"></div>
                    </div>
                </div>

                <div class="avatar-body">
                    <div class="avatar-arm left"></div>
                    <div class="avatar-arm right"></div>
                    <div class="avatar-hand left"></div>
                    <div class="avatar-hand right"></div>
                </div>

                <div class="sign-display">
                    <p class="current-sign">Ready</p>
                    <p class="sign-description">Enter text to begin</p>
                </div>
            </div>
        `;

        // Cache DOM nodes once 
        this.signDisplay = this.container.querySelector('.current-sign');
        this.signDescription = this.container.querySelector('.sign-description');
        this.leftHand = this.container.querySelector('.avatar-hand.left');
        this.rightHand = this.container.querySelector('.avatar-hand.right');
    }

    /**
     * Performs a single sign animation
     */
    async performSign(sign, word = '') {
        // Guard: invalid input
        if (!sign || typeof sign !== 'object') {
            console.warn('performSign skipped: invalid sign', sign);
            return;
        }

       
        if (this.isAnimating) {
            console.warn('Avatar is busy, skipping sign');
            return;
        }

        this.isAnimating = true;

        // UI updates
        this.signDisplay.textContent = word ? word.toUpperCase() : '...';
        this.signDescription.textContent = sign.description || 'Signing…';

        // Resolve animation safely
        const animationKey = sign.animation || 'fingerspell';
        const animationClass =
            this.animations[animationKey] || this.animations.fingerspell;

        // Apply animation
        if (sign.requiresTwoHands) {
            this.leftHand.classList.add(animationClass);
            this.rightHand.classList.add(animationClass);
        } else {
            this.rightHand.classList.add(animationClass);
        }

        console.log(`Performing sign: ${word} (${animationClass})`);

        // Cleanup after animation finishes
        await this.wait(sign.duration || 1500);

        this.resetHands();
        this.isAnimating = false;
    }

    /**
     * Plays a sequence of signs one after another
     */
    async performSequence(sequence = [], words = []) {
        if (!Array.isArray(sequence) || sequence.length === 0) {
            console.warn('performSequence called with empty sequence');
            return;
        }

        for (let i = 0; i < sequence.length; i++) {
            if (i > 0) await this.wait(300);
            await this.performSign(sequence[i], words[i]);
        }

        this.signDisplay.textContent = 'Complete';
        this.signDescription.textContent = 'Enter new text to continue';
    }

    /**
     * Fingerspells a word (fallback animation)
     */
    async fingerspellWord(word = '') {
        if (!word) return;

        this.signDisplay.textContent = 'FINGERSPELLING';
        this.signDescription.textContent = `Spelling: ${word}`;

        this.rightHand.classList.add(this.animations.fingerspell);

        await this.wait(word.length * 800);

        this.resetHands();
    }

    /**
     * Utility: pause execution
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Utility: reset hands to default state
     */
    resetHands() {
        this.leftHand.className = 'avatar-hand left';
        this.rightHand.className = 'avatar-hand right';
    }

    /**
     * Fully reset avatar UI + state
     */
    reset() {
        this.resetHands();
        this.signDisplay.textContent = 'Ready';
        this.signDescription.textContent = 'Enter text to begin';
        this.isAnimating = false;
    }
}
