# interactive-hero-images

Add hero images, transparent videos, and SVG animations to your articles.

## Attach JS to CoreMedia articles

Attach the JavaScript document to your CoreMedia article under **Miscellaneous** > **Associated JavaScripts**

CoreMedia ID: 105229972

This will load the script into the page.

## Parameters

All interactive hero mounts support the following formatting parameters (written in alternating case format):

- `WIDTH`: Sets the width of the hero element (e.g. `WIDTH800px` or `WIDTH700px`).
- `RATIO`: Specifies the aspect ratio in `[width]x[height]` format (e.g. `RATIO399x281` becomes `399/281` in CSS).
- `MAXWIDTH`: Sets an optional maximum width limit (e.g. `MAXWIDTH50vw`). If not provided, it defaults to the `WIDTH` value, bounded by a maximum of `100%`.
- `FULLWIDTH`: Set to `true` (e.g., `FULLWIDTHtrue`) to apply the `u-full` class to the mount point, causing the element to span the full width of the screen.

---

## Hero image (header)

To embed a hero image:

1. Upload your hero image to CoreMedia
2. Check the "use original image" box
3. Add it to the Related Media section of your article
4. Include the hash with the width, ratio, and CMID

```
#heroimageWIDTH800pxRATIO399x281CMID12345
[embed illustration]

#headernomedia

Your header text goes here

#endheader
```

You must add the image to the related media section otherwise it will not load.

### Hero image (elsewhere in the article)

Use regular "use original image" CM images, but embed them in the article so they syndicate:

1. Upload your hero image to CoreMedia
2. Check the "use original image" box
3. Embed Full the image where you want the image to appear
4. Prefix it with the `#heroimage` hash, as shown below:

```
#heroimageWIDTH800pxRATIO399x281
[embed illustration]
```

## Transparent hero video

Transparent video must be uploaded to the FTP server manually.

There must be two videos:

- mp4 - for Safari
- webm - for everything else

To get this working:

1. Rename your videos to have the same name, all lowercase & alphanumeric. e.g. `myvideo.webm` & `myvideo.mp4`
2. Upload your videos to `http://abc.net.au/res/sites/news-projects/[your-folder]`
3. Include the following hash:

```
#herovidtransparentROOTyourROOTfolderVIDmyvideoWIDTH390pxRATIO392x162
```

Specify your folder as an array, in this case `ROOTyourROOTfolder` resolves to `your-folder`.

## Animated/SVG hero

Animated SVG must be uploaded to the FTP server manually.

To get this working:

1. Rename your svg to be all lowercase & alphanumeric. e.g. `myanimation.svg`
2. Upload your svg to `http://abc.net.au/res/sites/news-projects/[your-folder]`
3. Include the following hash:

```
#herosvgROOTyourROOTfolderSVGmysvgWIDTH450pxRATIO279x214
```

Specify your folder as an array, in this case `ROOTyourROOTfolder` resolves to `your-folder`.

