<script lang="ts">
  import { onMount } from 'svelte';
  import HeroImage from '../HeroImage/HeroImage.svelte';
  import HeroTransparentVideo from '../HeroTransparentVideo/HeroTransparentVideo.svelte';
  import type { HeroRootConfig } from '../../types';

  let {
    componentType = 'img',
    maxwidth,
    width,
    fullwidth,
    ratio,
    butt = 'default',
    ...rest
  }: HeroRootConfig = $props();
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
    if (['before', 'both'].includes(butt)) {
      targetEl.previousElementSibling?.classList.add('interactive-hero-image__butt-before');
    }
    delete targetEl.dataset.mount;
  });
</script>

<div
  class="interactive-hero-image interactive-hero-image--butt-{butt}"
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
    margin: 0 auto 0;
  }
  .interactive-hero-image--butt-default {
    margin-top: var(--od-space-component-margin, 80px);
  }
  :global(.interactive-hero-image__mount) {
    position: relative;
  }

  // Adjacent header should have no margin-top. This class is added by index.ts.
  :global([data-component='Anchor']:has(.interactive-hero-image) + .Header) {
    margin-top: 0;
  }

  // Adjacent header should have no margin-top when butting up against our image
  :global([data-component='Anchor']:has(.interactive-hero-image--butt-both, .interactive-hero-image--butt-bottom) + *) {
    margin-top: 0;
  }

  // previous header should have no margin-bottom when our image butts up against it
  :global(.interactive-hero-image__butt-before) {
    margin-bottom: 0;
  }
</style>
