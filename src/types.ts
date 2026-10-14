export type CSSTransitionEasing =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | 'step-start'
  | 'step-end'
  | 'none'
  | 'custom';

export interface CSSTransition {
  transitionduration?: number;
  transitiondwell?: number;
  transitioneasing?: CSSTransitionEasing;
  // Used when transitioneasing is 'custom'
  transitioneasingcustom?: string;
}

export interface HeroImageInstance {
  src: string;
  alt: string;
}

export interface ActoConfig extends CSSTransition {
  cmid?: string | number;
  root: string | string[];
  vid?: string;
  svg?: string;
  fullwidth?: boolean;
  maxwidth: string;
  width?: string;
  ratio?: string;
  cmids?: string | string[];
  // transitioneasingcustom is a base-36 encoded CSS easing string here (see @abcnews/base-36-text)
}

export interface HeroRootConfig extends CSSTransition {
  componentType?: 'img' | 'video';
  fullwidth?: boolean;
  maxwidth: string;
  width?: string;
  ratio?: string;
  img?: string;
  alt?: string;
  vid?: string;
  vidSafari?: string;
  images?: HeroImageInstance[];
  // transitioneasingcustom is already decoded to a plain CSS easing string here
}
