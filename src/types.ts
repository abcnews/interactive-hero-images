export interface HeroRootConfig {
  componentType?: 'img' | 'video';
  fullwidth?: boolean;
  maxwidth: string;
  width?: string;
  ratio?: string;
  img?: string;
  alt?: string;
  vid?: string;
  vidSafari?: string;
}

export interface ActoConfig {
  cmid?: string | number;
  root: string | string[];
  vid?: string;
  svg?: string;
  fullwidth?: boolean;
  maxwidth: string;
  width?: string;
  ratio?: string;
}
