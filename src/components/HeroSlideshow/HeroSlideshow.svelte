<script lang="ts">
  import type { HeroRootConfig } from '../../types';

  let {
    images = [],
    transitionduration = 600,
    transitiondwell = 1200,
    transitioneasing = 'ease-in-out',
    transitioneasingcustom
  }: HeroRootConfig = $props();

  let current = $state(0);
  // The slide that is being faded out from under the current one (-1 when none)
  let previous = $state(-1);

  // 'none' is a hard cut; 'custom' uses the (already decoded) CSS easing string
  let duration = $derived(transitioneasing === 'none' ? 0 : transitionduration);
  let easing = $derived(
    transitioneasing === 'custom'
      ? transitioneasingcustom || 'ease-in-out'
      : transitioneasing === 'none'
        ? 'linear'
        : transitioneasing
  );

  // Each slide is fully visible for `dwell`, then the next fades in on top of it over `duration`.
  // The outgoing slide stays fully opaque underneath until the incoming one has finished fading in,
  // so the background never shows through mid-transition.
  $effect(() => {
    if (images.length < 2) {
      return;
    }
    let clearTimer: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      previous = current;
      current = (current + 1) % images.length;

      clearTimeout(clearTimer);
      clearTimer = setTimeout(() => {
        previous = -1;
      }, duration);
    }, transitiondwell + duration);

    return () => {
      clearInterval(interval);
      clearTimeout(clearTimer);
    };
  });
</script>

<div class="interactive-hero-slideshow" style:--slide-duration="{duration}ms" style:--slide-easing={easing}>
  {#each images as image, i}
    <img
      class="interactive-hero-slideshow__img"
      class:interactive-hero-slideshow__img--active={i === current}
      class:interactive-hero-slideshow__img--previous={i === previous}
      src={image.src}
      alt={image.alt}
      aria-hidden={i !== current}
    />
  {/each}
</div>

<style lang="scss">
  .interactive-hero-slideshow {
    // Stack every slide in the same grid cell so the container is sized by the largest image
    display: grid;
    width: 100%;
    height: 100%;
  }

  .interactive-hero-slideshow__img {
    grid-area: 1 / 1;
    width: 100%;
    height: 100%;
    object-fit: contain;
    // Hidden slides have no transition, so they disappear instantly once covered
    opacity: 0;
    z-index: 0;

    // Outgoing slide: stays fully opaque beneath the incoming one
    &--previous {
      opacity: 1;
      z-index: 1;
    }

    // Incoming slide: fades in on top
    &--active {
      opacity: 1;
      z-index: 2;
      transition: opacity var(--slide-duration) var(--slide-easing);
    }

    @media (prefers-reduced-motion: reduce) {
      &--active {
        transition: none;
      }
    }
  }
</style>
