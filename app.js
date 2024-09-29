Vue.createApp({
    data() {
        return {
            perspective: 100,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            isMuted: false, // Stan do przechowywania stanu mute
            backgroundMusic: null // Referencja do elementu audio
        };
    },
    computed: {
        box() {
            return {
                transform: `perspective(${this.perspective}px)
                rotateX(${this.rotateX}deg)
                rotateY(${this.rotateY}deg)
                rotateZ(${this.rotateZ}deg)`
            };
        }
    },
    methods: {
        reset() {
            this.perspective = 100;
            this.rotateX = 0;
            this.rotateY = 0;
            this.rotateZ = 0;
        },
        async copy() {
            let text = `transform:${this.box.transform};`;
            await navigator.clipboard.writeText(text);
            alert("CSS Copied to clipboard!");
        },
        toggleMute() {
            const audio = this.$refs.backgroundMusic; // Referencja do elementu audio
            if (audio) {
                this.isMuted = !this.isMuted; // Zmiana stanu mute
                audio.muted = this.isMuted; // Mute/Unmute audio
            }
        },
        handleInteraction() {
            if (!this.backgroundMusic) {
                this.backgroundMusic = this.$refs.backgroundMusic; // Użyj referencji
                this.playMusic(); // Odtwórz muzykę po interakcji
            }
        },
        async playMusic() {
            if (this.backgroundMusic) {
                try {
                    await this.backgroundMusic.play();
                } catch (err) {
                    console.error("Playback failed:", err);
                }
            }
        }
    },
    mounted() {
        // Nasłuchuj interakcji użytkownika
        window.addEventListener('mousemove', this.handleInteraction);
        window.addEventListener('touchstart', this.handleInteraction);

        // Automatyczne przypisanie referencji audio
        this.backgroundMusic = this.$refs.backgroundMusic;
        this.playMusic(); // Próbuj odtworzyć muzykę, może się nie udać, ale niech będzie
    },
    beforeUnmount() {
        // Usuń nasłuchiwanie po odmontowaniu komponentu
        window.removeEventListener('mousemove', this.handleInteraction);
        window.removeEventListener('touchstart', this.handleInteraction);
    }
}).mount('#app');
