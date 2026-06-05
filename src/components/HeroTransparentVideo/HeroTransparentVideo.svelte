<script lang="ts">
  let { vid, vidSafari } = $props();
</script>

<div class="interactive-hero-image__vid">
  <video muted autoplay loop playsinline>
    <source src={vidSafari} type="video/mp4;codecs=hvc1" />
    <source src={vid} type="video/webm" />
  </video>
</div>

<style lang="scss">
  .interactive-hero-image__vid {
    overflow: hidden;
    transform: translateZ(0);
    will-change: transform;

    /* Custom sizing code */
    width: 100%;
    height: 100%;

    video {
      object-fit: cover;
      transform: translateZ(0);
      display: block;
      // Bugfix for black borders on some computers
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      margin: -1px;
    }
  }
</style>
