<script lang="ts">
  let { img, width, height } = $props();
</script>

<img class="img" src={img} alt="" {width} {height} style:max-width={width} />

<style lang="scss">
  .img {
    width: 75vw;
    height: auto;
    margin: 0 auto;
    max-width: 400px;
  }

  :global(.interactive-hero-images) {
    outline: red;
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
