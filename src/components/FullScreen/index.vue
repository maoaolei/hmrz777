<template>
  <div>
    <svg-icon icon-class="fullscreen" class-name="fullScreen" @click="togglefullScreen" />
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
console.log(ScreenFull)
export default {
  name: 'FullScreen',
  methods: {
    togglefullScreen() {
      if (!ScreenFull.isEnabled) return this.$message.error('卸载吧')
      ScreenFull.toggle()
    }
  }
}
</script>

<style>
.fullScreen {
  color: #fff;
}
</style>
