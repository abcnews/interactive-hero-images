# interactive-hero-images

Add hero images to your articles.

## Attach JS to CoreMedia articles

Attach the JavaScript document to your CoreMedia artile under **Miscellaneous** > **Associated JavaScripts**

CoreMedia ID: 105229972

This will load the script into the page.

## Hero image (header)

To embed a hero image:

1. Upload your hero image to CoreMedia
2. Check the "use original image" box
3. Add it to the Related Media section of your article (important!)
4. Include the hash with the width/height/CMID

```
#heroimageWIDTH210pxHEIGHT210pxCMID12345
[embed illustration]
```

You must include the height and width of the image. This specifies the max size of the image, and ensures it scales down in the right ratio for mobile.

You must add the image to the related media section otherwise it will not load.

### Hero image (elsewhere in the article)

Use regular "use original image" CM images, but embed them in the article so they syndicate:

1. Upload your hero image to CoreMedia
2. Check the "use original image" box
3. Embed Full the image where you want the image to appear
4. Prefix it with the #heroimage hash, as shown below:

```
#heroimageWIDTH210pxHEIGHT210px
[embed illustration]
```

## Transparent hero video

Transparent video must be uploaded to the FTP server manually.

There must be two videos:

- mp4 - for Safari
- webm - for everything else

To get this working:

1. Rename your videos to have the same name, all lowercase & alphanumeric. e.g. myvideo.webm & myvideo.mp4
2. Upload your videos to `http://abc.net.au/res/sites/news-projects/[your-folder]`
3. Include the following hash:

```
#herovidtransparentROOTyourROOTfolderVIDmyvideoWIDTH210pxHEIGHT210px
```

Specify your folder as an array, in this case `ROOTyourROOTfolder` resolves to `your-folder`.

You must include the height and width of the video. This specifies the max size of the video, and ensures it scales down in the right ratio for mobile.

## Animated/SVG hero

Transparent video must be uploaded to the FTP server manually.

To get this working:

1. Rename your svg to be all lowercase & alphanumeric. e.g. myanimation.svg
2. Upload your svg to `http://abc.net.au/res/sites/news-projects/[your-folder]`
3. Include the following hash:

```
#herosvgROOTyourROOTfolderSVGmysvgWIDTH210pxHEIGHT210px
```

Specify your folder as an array, in this case `ROOTyourROOTfolder` resolves to `your-folder`.

You must include the height and width of the svg. This specifies the max size of the video, and ensures it scales down in the right ratio for mobile.
