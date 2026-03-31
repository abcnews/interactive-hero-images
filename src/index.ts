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

whenOdysseyLoaded.then(async () => {
  selectMounts('heroimage').map(async targetEl => {
    const { width, height, cmid = 0 } = acto(targetEl.id);
    setupEl(targetEl);
    let imgSrc: string | null = null;
    let imgAlt: string = '';

    if (cmid) {
      // Use Odyssey API to get image src from related media
      const odyssey = (window as any).__ODYSSEY__;
      const meta = odyssey.meta.getMeta();
      const doc = meta.mediaById[String(cmid)];

      if (doc?.media?.image) {
        imgSrc = doc.media.image.primary?.complete?.[0]?.url;
        imgAlt = doc.alt || '';
      } else {
        console.error(
          `[interactive-hero-images] Image ${cmid} must be added to the Related Media section of your article.`
        );
      }
    } else {
      const nextSibling = targetEl.nextSibling as HTMLDivElement;
      if (nextSibling) {
        const imgEl = nextSibling.querySelector('img');
        imgSrc = imgEl?.src || null;
        imgAlt = imgEl?.alt || '';
        nextSibling.parentElement?.removeChild(nextSibling);
      }
    }

    if (imgSrc) {
      mount(HeroImage, {
        target: targetEl,
        props: {
          img: imgSrc,
          alt: imgAlt,
          width,
          height
        }
      });
    }
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

  selectMounts('herosvg').forEach(targetEl => {
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
