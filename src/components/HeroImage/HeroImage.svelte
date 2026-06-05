<script lang="ts">
  let { img, alt = '' } = $props();
</script>

<img class="interactige-hero-image__img" src={img} {alt} />

<style lang="scss">
  .interactige-hero-image__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
