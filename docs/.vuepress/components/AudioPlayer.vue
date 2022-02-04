<template>
<div class="audio-player" @click="handleAudioClick">
  <audio controls :src="link">
    <code>▶️</code>
  </audio>
</div>
</template>

<script>
export default {
  name: "AudioPlayer",
  props: {
    link: {
      type: String,
      required: false
    }
  },
  mounted() {
  },
  methods: {
    handleAudioClick() {
      console.info('handleAudioClick', this.link)
    }
  }
}
</script>

<style scoped>
.audio-player {
  cursor: pointer;
}
</style>
