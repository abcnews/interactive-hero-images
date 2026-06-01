<script lang="ts">
  import SharedStyles from '../SharedStyles/SharedStyles.svelte';

  let { vid, vidSafari, width, height } = $props();
</script>

<SharedStyles />

<div class="video-wrapper" style:max-width={width}>
  <video muted autoplay loop playsinline {width} {height}>
    <source src={vidSafari} type="video/mp4;codecs=hvc1" />
    <source src={vid} type="video/webm" />
  </video>
</div>

<style lang="scss">
  .video-wrapper {
    overflow: hidden;
    transform: translateZ(0);
    will-change: transform;

    /* Custom sizing code */
    width: 75vw;
    height: auto;
    margin: 0 auto;
    max-width: 400px;

    video {
      object-fit: cover;
      transform: translateZ(0);
      display: block;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      margin: -1px;
      object-fit: cover;
    }
  }
</style>
