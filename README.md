
# Forked from original [React Image Cropper](https://github.com/jerryshew/react-image-cropper/blob/master/LICENSE)
Package no longer seemed to be maintained and required upgrading of package npm-run-all from critical security vulnerability.
Also merged in [LiHuang2's react16update](https://github.com/lihuang2/react-image-cropper.git) branch. Upgraded to Webpack 4.

## React Image Cropper

A React.JS Image Cropper
Touch supported

**[See the demo](http://braavos.me/react-image-cropper/)**

Custom:

+ initial cropper frame position
+ frame width, height, ratio
+ crop event

### How to Use

+ `import Cropper from '@bearcanrun/react-image-cropper'`

+ styles are all inline

+ define Cropper with src, and ref to execute crop method  

```
<Cropper
    src="http://braavos.me/images/posts/college-rock/the-smiths.png"
    ref={ ref => { this.cropper = ref }}
/>
```

+ crop and get image url

`image.src = this.cropper.crop()`

+ get crop values:

`const values = this.cropper.values()`

values:

```
{
    // display values
    display: {
        width, // frame width
        height, // frame height
        x, // original x position
        y, // original y position
        imgWidth, // img width
        imgHeight, // img height
    },
    // original values
    original: {
        width, // frame width
        height, // frame height
        x, // original x position
        y, // original y position
        imgWidth, // img width
        imgHeight, // img height
    }
}
```


+ onChange for preview

(values) => onChange(values)

+ custom use

| prop  |  value   |
|:-------:|:--------|
| ratio | width / height |
| disabled | boolean |
| width | cropper frame width |
| height | cropper frame height |
| originX | cropper original position(x axis), according to image left |
| originY | cropper original position(Y axis), according to image top |
| fixedRatio | turn on/off fixed ratio (bool default true) |
| allowNewSelection | allow user to create a new selection instead of reusing initial selection (bool default true) |
| styles | specify styles to override inline styles |
| imageLoaded | specify function callback to run when the image completed loading |
| beforeImageLoaded | specify function callback to run when the image size value is ready but the image has not completed loading |
| imageLoadError | specify function callback to run when the image errors during loading |
| onDragStop | specify function callback to run when dragging the crop has ended |


**[See the demo](http://braavos.me/react-image-cropper/)**
