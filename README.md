# interactive-hero-images

Add hero images, transparent videos, and SVG animations to your articles.

## Production guide (version 2)

For all variations, first add the `[interactive-hero-image v2]` document (CoreMedia ID: `106765378`) to the Associated Javascripts of your story.

### What's changed from v1

* added `FULLWIDTHtrue` to allow the viz to go to 100% screen width (ignoring story margins)
* removed the built-in `max-width:70%`. This was implemented for one particular graphic and it doesn't make sense to keep it.
* Removed `height` in favour of `ratio`, so you can set the original image dimensions (e.g. `RATIO1920x1080`) rather than having to calculate what you want the display dimensions to be.
* added explicit `MAXWIDTH` prop so you can still set `MAXWIDTH70vw` if you really want that feature for mobile.

### Parameters

All interactive hero mounts support the following formatting parameters (written in alternating case format):

* `WIDTH`: Sets the width of the hero element (e.g. `WIDTH800px` or `WIDTH700px`).
* `RATIO`: Specifies the aspect ratio in `[width]x[height]` format (e.g. `RATIO399x281` becomes `399/281` in CSS).
* `MAXWIDTH`: Sets an optional maximum width limit (e.g. `MAXWIDTH50vw`). If not provided, it defaults to the `WIDTH` value, bounded by a maximum of `100%`.
* `FULLWIDTH`: Set to `true` (e.g., `FULLWIDTHtrue`) to apply the `u-full` class to the mount point, causing the element to span the full width of the screen.

***

### Hero images (in the header)

To embed a hero image:

1. Upload your hero image to CoreMedia
2. Check the "use original image" box
3. Add it to the Related Media section of your article
4. Insert your image with the `#heroimage` hash:
   1. `#heroimageWIDTH800pxRATIO399x281CMID12345`

You must add the image to the related media section otherwise it will not load.

Use `#headernomedia` and `#endheader` underneath the hero image hash so that Odyssey doesn't try to load the related media image into the header.

### Images (in the rest of the article)

Use regular "use original image" CM images, but embed them in the article so they syndicate:

1. Upload your hero image to CoreMedia

2. Check the "use original image" box

3. Embed Full the image where you want the image to appear

4. Prefix it with the `#heroimage` hash, as shown below:

   1. `#heroimageWIDTH800pxRATIO399x281`
   2. `[embed illustration on the next line]`

### Transparent video

Transparent video must be uploaded to the FTP server manually.

There must be two videos:

* mp4 - for Safari
* webm - for everything else

To get this working:

1. Rename your videos to have the same name, all lowercase & alphanumeric. e.g. `myvideo.webm` & `myvideo.mp4`
2. Upload your videos to `http://abc.net.au/res/sites/news-projects/your-folder`
3. Include the following hash: `#herovidtransparentROOTyourROOTfolderVIDmyvideoWIDTH390pxRATIO392x162`

Specify your folder as an array, in this case `ROOTyourROOTfolder` resolves to `your-folder`.

#### Compressing vids

Safari/iOS doesn't have good support for vp9 yet. We can use h265 to get good compression, but you can only encode these on MacOS because it uses Apple's secret sauce.

To compress transparent vids for iOS, make sure you have ffmpeg installed and then: `ffmpeg -i MyInputVideo.mp4 -c:v hevc_videotoolbox -pix_fmt bgra -tag:v hvc1 -b:v 200K -alpha_quality 0.50 -allow_sw 1 -an header.mp4`

The `-b:v 200K` command sets the bitrate. Bump it up or down until it looks good.

### SVG (animated or static)

Supports regular SVGs, and animated SVGs using CSS. Files must be uploaded to the FTP server manually.

To get this working:

1. Rename your svg to be all lowercase & alphanumeric. e.g. `myanimation.svg`
2. Upload your svg to `http://abc.net.au/res/sites/news-projects/your-folder`
3. Include the following hash: `#herosvgROOTyourROOTfolderSVGmysvgWIDTH450pxRATIO279x214`

Specify your folder as an array, in this case `ROOTyourROOTfolder` resolves to `your-folder`.
