class ISLAvatar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.isAnimating = false;
        this.currentAnimation = null;
        
      this.createAvatar();
        
       this.animations = {
            'wave_hello': 'avatar-wave',
            'thank_you': 'avatar-thank-you',
            'how_sign': 'avatar-how',
            'what_sign': 'avatar-what',
            'point_self': 'avatar-point-self',
            'point_forward': 'avatar-point-forward',
            'water_sign': 'avatar-water',
            'help_sign': 'avatar-help',
            'doctor_sign': 'avatar-doctor',
            'fingerspell': 'avatar-fingerspell'
        };
    }
    
  
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
        
        
        this.signDisplay = this.container.querySelector('.current-sign');
        this.signDescription = this.container.querySelector('.sign-description');
        this.leftHand = this.container.querySelector('.avatar-hand.left');
        this.rightHand = this.container.querySelector('.avatar-hand.right');
    }
    
  
    async performSign(sign, word = '') {
        return new Promise((resolve) => {
            if (this.isAnimating) {
                console.warn("Avatar is busy!");
                resolve();
                return;
            }
            
            this.isAnimating = true;
            
            
            this.signDisplay.textContent = word.toUpperCase();
            this.signDescription.textContent = sign.description || "Signing...";
            
          
            const animationClass = this.animations[sign.animation] || 'avatar-fingerspell';
            
           
            if (sign.requiresTwoHands) {
                this.leftHand.classList.add(animationClass);
                this.rightHand.classList.add(animationClass);
            } else {
                
                this.rightHand.classList.add(animationClass);
            }
            
            console.log(`Performing: ${word} (${animationClass})`);
            
            
            setTimeout(() => {
                
                this.leftHand.className = 'avatar-hand left';
                this.rightHand.className = 'avatar-hand right';
                
                this.isAnimating = false;
                resolve();
            }, sign.duration || 1500);
        });
    }
    
   
    async performSequence(sequence, words) {
        console.log(`Starting sequence of ${sequence.length} signs`);
        
        for (let i = 0; i < sequence.length; i++) {
            const sign = sequence[i];
            const word = words[i] || '';
            
           
            if (i > 0) {
                await this.wait(300);
            }
            
            await this.performSign(sign, word);
        }
        
        
        this.signDisplay.textContent = "Complete";
        this.signDescription.textContent = "Enter new text to continue";
    }
    
  
    async fingerspellWord(word) {
        console.log(`Fingerspelling: ${word}`);
        
     
        this.signDisplay.textContent = "FINGERSPELLING";
        this.signDescription.textContent = `Spelling: ${word}`;
        
       
        this.rightHand.classList.add('avatar-fingerspell');
        
        const duration = word.length * 800;
        
        await new Promise(resolve => {
            setTimeout(() => {
                this.rightHand.className = 'avatar-hand right';
                resolve();
            }, duration);
        });
    }
    
   
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
   
    reset() {
        this.leftHand.className = 'avatar-hand left';
        this.rightHand.className = 'avatar-hand right';
        this.signDisplay.textContent = "Ready";
        this.signDescription.textContent = "Enter text to begin";
        this.isAnimating = false;
    }
}
