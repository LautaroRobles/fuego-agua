<template>
  <div :id="containerId" v-if="downloaded" />
  <div class="placeholder" v-else>
    Cargando ...
  </div>
</template>

<script>
export default {
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: 'game-container'
    }
  },
  async mounted() {
    const game = await import(/* webpackChunkName: "game" */ '@/game/game')
    this.downloaded = true
    this.$nextTick(() => {
      this.gameInstance = game.launch(this.containerId)
    })
  },
  destroyed() {
    this.gameInstance.destroy(false)
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Dongle:wght@300;400;700&display=swap');
.placeholder {
  font-size: 2rem;
  font-family: Dongle, Arial;
  color: white;
}
#game-container {
  height: min(100vh, 100vw);
  position: relative;
}
#game-container canvas {
  height: min(100vh, 100vw);
}
</style>
