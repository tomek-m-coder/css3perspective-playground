Vue.createApp({
    data() {
      return {
        perspective: 100,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        isMuted: false,
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
        
        // Play music when reset is called
        const audio = this.$refs.backgroundMusic;
        if (audio) {
          audio.play().catch(err => {
            console.error("Audio playback failed:", err);
          });
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
      }
    },
    mounted() {
      const audio = this.$refs.backgroundMusic;
      if (audio) {
        audio.play().catch(err => {
          console.error("Audio playback failed:", err);
        });
      }
    }
  }).mount('#app');
