<script lang="ts">
  let { vid, vidSafari, width, height } = $props();
</script>

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

  :global(.interactive-hero-images) {
    width: 99vw;
    height: inherit;
    margin: 0;
    margin-left: calc(50% - 50vw) !important;
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
    margin-top: var(--od-space-component-margin, 80px);
  }
</style>
