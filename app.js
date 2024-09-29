Vue.createApp({
    data() {
      return {
        perspective: 100,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0
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
      playMusic() {
        // Odtwarzaj muzykę po kliknięciu przycisku
        const music = document.getElementById("background-music");
        if (music) {
          music.play().catch((error) => {
            console.error("Odtwarzanie audio nie powiodło się:", error);
          });
        }
      }
    }
  }).mount("#app");
  