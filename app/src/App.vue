<template>
  <div class="container py-3">
    <router-view />
    <div class="mt-4">
      <span v-if="isInFullsreen">
        <a href="#" @click="exitFullscreen">
          Exit Full Screen
        </a>
      </span>
      <span v-else>
        <a href="#" @click="enterFullscreen">
          Enter Full Screen
        </a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isInFullsreen: false,
  }),

  created() {
    document.onfullscreenchange = ({ target }) => {
      this.isInFullsreen = document.fullscreenElement === target;
    };
    document.onwebkitfullscreenchange = ({ target }) => {
      this.isInFullsreen = document.webkitFullscreenElement === target;
    };
  },

  methods: {
    async enterFullscreen() {
      const el = document.getElementsByTagName('html')[0];
      if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        await el.webkitRequestFullscreen();
      }
      this.isInFullsreen = true;
    },

    async exitFullscreen() {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      }
      this.isInFullsreen = false;
    },
  },
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.lh-0 {
  line-height: 0 !important;
}
.pt-1-5 {
  padding-top: 0.375rem !important;
}

.mt--2px {
  margin-top: -2px !important;
}

:root {
  --bs-black: #000;
}

</style>
