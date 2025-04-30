import acto from '@abcnews/alternating-case-to-object';
import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { selectMounts } from '@abcnews/mount-utils';
import { mount } from 'svelte';
import HeroTransparentVideo from './components/HeroTransparentVideo/HeroTransparentVideo.svelte';
import HeroImage from './components/HeroImage/HeroImage.svelte';

const PUBLIC_ROOT = 'https://www.abc.net.au/res/sites/news-projects';

function setupEl(targetEl) {
  targetEl.classList.add('interactive-hero-images');
  delete targetEl.dataset.mount;
}

whenOdysseyLoaded.then(() => {
  selectMounts('heroimage').forEach(targetEl => {
    const { width, height } = acto(targetEl.id);
    setupEl(targetEl);
    let imgSrc: string | null = null;
    const nextSibling = targetEl.nextSibling as HTMLDivElement;
    if (nextSibling) {
      imgSrc = nextSibling.querySelector('img')?.src || null;
      nextSibling.parentElement?.removeChild(nextSibling);
    }
    mount(HeroImage, {
      target: targetEl,
      props: {
        img: imgSrc,
        width,
        height
      }
    });
  });

  selectMounts('herovidtransparent').forEach(targetEl => {
    const { root = [], vid, width, height } = acto(targetEl.id);
    const sanitisedRoot = Array.isArray(root) ? root : [String(root)];
    const rootPath = `${PUBLIC_ROOT}/${sanitisedRoot.join('-')}/`;
    setupEl(targetEl);
    const vidRoot = `${rootPath}${vid}`;
    mount(HeroTransparentVideo, {
      target: targetEl,
      props: {
        vid: `${vidRoot}.webm`,
        vidSafari: `${vidRoot}.mp4`,
        width,
        height
      }
    });
  });

  selectMounts('herourl').forEach(targetEl => {
    const { root = [], svg, width, height } = acto(targetEl.id);
    const sanitisedRoot = Array.isArray(root) ? root : [String(root)];
    const rootPath = `${PUBLIC_ROOT}/${sanitisedRoot.join('-')}/`;
    setupEl(targetEl);
    mount(HeroImage, {
      target: targetEl,
      props: {
        img: `${rootPath}${svg}.svg`,
        width,
        height
      }
    });
  });
});
