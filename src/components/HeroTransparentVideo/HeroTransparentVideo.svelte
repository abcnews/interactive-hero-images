<script lang="ts">
  import SharedStyles from '../SharedStyles/SharedStyles.svelte';

  let { vid, vidSafari, width, height } = $props();
</script>

<SharedStyles />

<video class="vid" muted autoplay loop playsinline style:max-width={width} {width} {height}>
  <source src={vidSafari} type="video/mp4;codecs=hvc1" />
  <source src={vid} type="video/webm" />
</video>

<style lang="scss">
  .vid {
    width: 75vw;
    height: auto;
    margin: 0 auto;
    max-width: 400px;
  }
</style>
