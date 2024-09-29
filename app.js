Vue.createApp({
    data() {
        return {
            perspective: 100,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            isMuted: false, // Stan do przechowywania stanu mute
            hasInteracted: false // Flaga do śledzenia interakcji użytkownika
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
            if (!this.hasInteracted) {
                this.hasInteracted = true; // Ustaw flagę, aby uniknąć wielokrotnego wywoływania
                this.playMusic(); // Odtwórz muzykę po interakcji
            }
        },
        async playMusic() {
            const audio = this.$refs.backgroundMusic;
            if (audio) {
                try {
                    await audio.play(); // Próba odtworzenia muzyki
                } catch (err) {
                    console.error("Playback failed:", err);
                }
            }
        }
    },
    mounted() {
        // Nasłuchuj interakcji użytkownika na elemencie #app
        const appElement = document.getElementById('app');
        appElement.addEventListener('mousemove', this.handleInteraction);
        appElement.addEventListener('click', this.handleInteraction); // Dodaj nasłuchiwanie na kliknięcie
        appElement.addEventListener('touchstart', this.handleInteraction); // Nasłuchuj dotknięć

        // Muzyka nie jest odtwarzana od razu, tylko po interakcji
    },
    beforeUnmount() {
        // Usuń nasłuchiwanie po odmontowaniu komponentu
        const appElement = document.getElementById('app');
        appElement.removeEventListener('mousemove', this.handleInteraction);
        appElement.removeEventListener('click', this.handleInteraction); // Usuń nasłuchiwacz kliknięcia
        appElement.removeEventListener('touchstart', this.handleInteraction);
    }
}).mount('#app');
