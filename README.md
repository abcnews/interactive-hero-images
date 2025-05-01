# interactive-hero-images

Add hero images to your articles.

## Hero image

To embed a hero image:

1. Upload your hero image to CoreMedia
2. Check the "use original image" box
3. Embed Full the image at the top of your article
4. Prefix it with the #heroimage hash, as shown below:

```
#heroimageWIDTH21remHEIGHT21rem
[embed illustration]
```

You must include the height and width of the image. This specifies the max size of the image, and ensures it scales down in the right ratio for mobile.

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
#herovidtransparentROOTyourROOTfolderVIDmyvideoWIDTH21remHEIGHT21rem
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
#herosvgROOTyourROOTfolderSVGmysvgWIDTH21remHEIGHT21rem
```

Specify your folder as an array, in this case `ROOTyourROOTfolder` resolves to `your-folder`.

You must include the height and width of the svg. This specifies the max size of the video, and ensures it scales down in the right ratio for mobile.
