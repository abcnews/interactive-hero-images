<script lang="ts">
  import SharedStyles from '../SharedStyles/SharedStyles.svelte';

  let { img, alt = '', width, height, maxwidth } = $props();
</script>

<SharedStyles />
<img
  class="hero-image"
  src={img}
  {alt}
  {width}
  {height}
  style:--hero-width={width}
  style:--hero-max-width={maxwidth || width}
/>

<style lang="scss">
  .hero-image {
    width: var(--hero-width, 75vw);
    max-width: var(--hero-max-width, 400px);
    height: auto;
    margin: 0 auto;
    display: block;
  }
</style>
