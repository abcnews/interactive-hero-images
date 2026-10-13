import acto from '@abcnews/alternating-case-to-object';
import { getTier, TIERS, whenOdysseyLoaded } from '@abcnews/env-utils';
import { selectMounts } from '@abcnews/mount-utils';
import { mount } from 'svelte';
import HeroRoot from './components/HeroRoot/HeroRoot.svelte';
import { encode, decode } from '@abcnews/base-36-text';
import type { ActoConfig, HeroImageInstance } from './types';

const PUBLIC_ROOT = 'https://www.abc.net.au/res/sites/news-projects';

function parseActoProps(id: string): ActoConfig {
  const parsed = acto(id) as any as ActoConfig;
  return {
    fullwidth: false,
    transitioneasing: 'custom',
    transitiondwell: 1200,
    transitionduration: 600,
    // From TT: ease-in-out cubic - base36 encoded
    transitioneasingcustom: encode('cubic-bezier(0.66, 0, 0.34, 1)'),
    ...parsed
  };
}

function getRootPath(root: string | string[]): string {
  const sanitisedRoot = Array.isArray(root) ? root : [String(root)];
  return `${PUBLIC_ROOT}/${sanitisedRoot.join('-')}/`;
}

/**
 * Looks up an image from the article's Related media via the Odyssey API.
 * Returns the image, or an error message if it couldn't be found.
 */
function getImageFromCmid(cmid: string | number): { image?: HeroImageInstance; error?: string } {
  const odyssey = (window as any).__ODYSSEY__;
  const meta = odyssey.meta.getMeta();
  const doc = meta.mediaById[String(cmid)];
  const src: string | undefined = doc?.media?.image?.primary?.complete?.[0]?.url;

  if (!src) {
    const error = `Image ${cmid} must be added to the Related section of your article.`;
    console.error(`[interactive-hero-images] ${error}`);
    return { error };
  }

  return { image: { src, alt: doc.alt || '' } };
}

/** Acto may give us a single value or an array; always return an array of strings. */
function normaliseCmids(cmids: ActoConfig['cmids']): string[] {
  if (cmids === undefined || cmids === null || cmids === '') return [];
  return (Array.isArray(cmids) ? cmids : [cmids]).map(String);
}

/** Show errors on the mount point outside of the live tier. */
function showErrors(targetEl: HTMLElement, errors: string[]) {
  if (getTier() === TIERS.LIVE || !errors.length) return;
  Object.assign(targetEl.style, {
    border: '2px solid red',
    color: 'red'
  });
  targetEl.innerText = errors.join('\n');
}

whenOdysseyLoaded.then(async () => {
  selectMounts('heroimage').map(async targetEl => {
    const { cmid = 0, cmids, transitioneasingcustom, ...rest } = parseActoProps(targetEl.id);
    const images: HeroImageInstance[] = [];
    const errors: string[] = [];

    const cmidList = normaliseCmids(cmids);
    console.log({ cmidList });

    if (cmidList.length) {
      // Multiple images (slideshow)
      cmidList.forEach(id => {
        const { image, error } = getImageFromCmid(id);
        if (image) images.push(image);
        if (error) errors.push(error);
      });
    } else if (cmid) {
      // Single image from related media
      const { image, error } = getImageFromCmid(cmid);
      if (image) images.push(image);
      if (error) errors.push(error);
    } else {
      // Use the adjacent sibling to get the image src
      const nextSibling = targetEl.nextElementSibling as HTMLDivElement;
      if (nextSibling) {
        const imgEl = nextSibling.querySelector('img');
        if (!imgEl) {
          console.error(`[interactive-hero-images] Adjacent image must be added to the page after this marker.`);
          return;
        }
        if (imgEl.src) images.push({ src: imgEl.src, alt: imgEl.alt || '' });
        nextSibling.parentElement?.removeChild(nextSibling);
      }
    }

    showErrors(targetEl, errors);

    if (images.length) {
      mount(HeroRoot, {
        target: targetEl,
        props: {
          componentType: 'img',
          // First image kept as img/alt for the existing single-image behaviour
          img: images[0].src,
          alt: images[0].alt,
          images: images as HeroImageInstance[],
          // Decoded from base-36 so it can be used directly as a CSS easing value
          transitioneasingcustom: transitioneasingcustom ? decode(transitioneasingcustom) : undefined,
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
