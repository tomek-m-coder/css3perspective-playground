Vue.createApp({
    data() {
      return {
        perspective: 100,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        isMuted: false,
        userInteracted: false, // Flag to track user interaction
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

        // Play music if the user has interacted
        if (this.userInteracted) {
          const audio = this.$refs.backgroundMusic;
          if (audio) {
            audio.play().catch(err => {
              console.error("Audio playback failed:", err);
            });
          }
        }
      },
      async copy() {
        let text = `transform:${this.box.transform};`;
        await navigator.clipboard.writeText(text);
        alert("CSS Copied to clipboard!");
      },
      toggleMute() {
        const audio = this.$refs.backgroundMusic;
        if (audio) {
          this.isMuted = !this.isMuted;
          audio.muted = this.isMuted;
        }
      },
      handleUserInteraction() {
        this.userInteracted = true; // Set the flag to true on user interaction
      }
    },
    mounted() {
      const audio = this.$refs.backgroundMusic;

      // Add event listeners for user interaction
      window.addEventListener('click', this.handleUserInteraction);
      window.addEventListener('mousemove', this.handleUserInteraction);
      window.addEventListener('touchstart', this.handleUserInteraction);

      if (audio) {
        audio.play().catch(err => {
          console.error("Audio playback failed:", err);
        });
      }
    },
    beforeUnmount() {
      // Clean up event listeners when the component is destroyed
      window.removeEventListener('click', this.handleUserInteraction);
      window.removeEventListener('mousemove', this.handleUserInteraction);
      window.removeEventListener('touchstart', this.handleUserInteraction);
    }
  }).mount('#app');
