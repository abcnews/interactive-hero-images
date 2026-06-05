import acto from '@abcnews/alternating-case-to-object';
import { getTier, TIERS, whenOdysseyLoaded } from '@abcnews/env-utils';
import { selectMounts } from '@abcnews/mount-utils';
import { mount } from 'svelte';
import HeroRoot from './components/HeroRoot/HeroRoot.svelte';
import type { ActoConfig } from './types';

console.log('helo');

const PUBLIC_ROOT = 'https://www.abc.net.au/res/sites/news-projects';

function parseActoProps(id: string): ActoConfig {
  const parsed = acto(id) as any as ActoConfig;
  return {
    fullwidth: false,
    ...parsed
  };
}

function getRootPath(root: string | string[]): string {
  const sanitisedRoot = Array.isArray(root) ? root : [String(root)];
  return `${PUBLIC_ROOT}/${sanitisedRoot.join('-')}/`;
}

whenOdysseyLoaded.then(async () => {
  selectMounts('heroimage').map(async targetEl => {
    const { cmid = 0, ...rest } = parseActoProps(targetEl.id);
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
        const errorMessage = `Image ${cmid} must be added to the Related section of your article.`;
        console.error(`[interactive-hero-images] ${errorMessage}`);
        if (getTier() !== TIERS.LIVE) {
          Object.assign(targetEl.style, {
            border: '2px solid red',
            color: 'red'
          });
          targetEl.innerText = errorMessage;
        }
      }
    } else {
      // Use the adjacent sibling to get the image src
      const nextSibling = targetEl.nextElementSibling as HTMLDivElement;
      if (nextSibling) {
        const imgEl = nextSibling.querySelector('img');
        if (!imgEl) {
          const errorMessage = `Adjacent image must be added to the page after this marker.`;
          console.error(`[interactive-hero-images] ${errorMessage}`);
          return;
        }
        imgSrc = imgEl?.src || null;
        imgAlt = imgEl?.alt || '';
        nextSibling.parentElement?.removeChild(nextSibling);
      }
    }

    if (imgSrc) {
      mount(HeroRoot, {
        target: targetEl,
        props: {
          componentType: 'img',
          img: imgSrc,
          alt: imgAlt,
          ...rest
        }
      });
    }
  });

  selectMounts('herovidtransparent').forEach(targetEl => {
    const { root, vid, ...rest } = parseActoProps(targetEl.id);
    const rootPath = getRootPath(root);
    const vidRoot = `${rootPath}${vid}`;
    mount(HeroRoot, {
      target: targetEl,
      props: {
        componentType: 'video',
        vid: `${vidRoot}.webm`,
        vidSafari: `${vidRoot}.mp4`,
        ...rest
      }
    });
  });

  selectMounts('herosvg').forEach(targetEl => {
    const { root, svg, ...rest } = parseActoProps(targetEl.id);
    const rootPath = getRootPath(root);
    mount(HeroRoot, {
      target: targetEl,
      props: {
        componentType: 'img',
        img: `${rootPath}${svg}.svg`,
        ...rest
      }
    });
  });
});
