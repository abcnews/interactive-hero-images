<script lang="ts">
  import SharedStyles from '../SharedStyles/SharedStyles.svelte';

  let { img, width, height } = $props();
</script>

<SharedStyles />
<img class="img" src={img} alt="" {width} {height} style:max-width={width} />

<style lang="scss">
  .img {
    width: 75vw;
    height: auto;
    margin: 0 auto;
    max-width: 400px;
  }
</style>
