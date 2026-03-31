<script lang="ts">
  import SharedStyles from '../SharedStyles/SharedStyles.svelte';

  let { img, alt = '', width, height } = $props();
</script>

<SharedStyles />
<img class="hero-image" src={img} {alt} {width} {height} style:max-width={width} />

<style lang="scss">
  .hero-image {
    width: 75vw;
    height: auto;
    margin: 0 auto;
    max-width: 400px;
  }
</style>
