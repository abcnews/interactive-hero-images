<script lang="ts">
  import { onMount } from 'svelte';
  import HeroImage from '../HeroImage/HeroImage.svelte';
  import HeroTransparentVideo from '../HeroTransparentVideo/HeroTransparentVideo.svelte';
  import type { HeroRootConfig } from '../../types';

  let { componentType = 'img', maxwidth, width, fullwidth, ratio, ...rest }: HeroRootConfig = $props();
  let rootEl = $state<HTMLDivElement>();
  let Component = componentType === 'img' ? HeroImage : HeroTransparentVideo;

  // Add u-full and header margin override class to the mount point
  onMount(() => {
    const targetEl = rootEl?.closest('div[data-mount-used]') as HTMLDivElement | undefined;
    if (!targetEl) {
      return;
    }
    targetEl.classList.add('interactive-hero-image__mount');
    if (fullwidth) {
      targetEl.classList.add('u-full');
    }
    delete targetEl.dataset.mount;
  });
</script>

<div
  class="interactive-hero-image"
  style:max-width="min(100%, {maxwidth || width})"
  style:width
  style:aspect-ratio={ratio?.replace('x', '/')}
  bind:this={rootEl}
>
  <Component {...rest} />
</div>

<style lang="scss">
  .interactive-hero-image {
    display: flex;
    flex-direction: column;
    margin: var(--od-space-component-margin, 80px) auto 0;
  }
  :global(.interactive-hero-image__mount) {
    position: relative;
  }

  // Adjacent header should have no margin-top. This class is added by index.ts.
  :global(.interactive-hero-image__mount + .Header) {
    margin-top: 0;
  }
</style>
