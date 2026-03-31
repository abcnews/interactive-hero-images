<script lang="ts">
  import SharedStyles from '../SharedStyles/SharedStyles.svelte';

  let { vid, vidSafari, width, height, maxwidth } = $props();
</script>

<SharedStyles />

<video
  class="vid"
  muted
  autoplay
  loop
  playsinline
  {width}
  {height}
  style:--hero-width={width}
  style:--hero-max-width={maxwidth || width}
>
  <source src={vidSafari} type="video/mp4;codecs=hvc1" />
  <source src={vid} type="video/webm" />
</video>

<style lang="scss">
  .vid {
    width: var(--hero-width, 75vw);
    max-width: var(--hero-max-width, 400px);
    height: auto;
    margin: 0 auto;
    display: block;
  }
</style>
