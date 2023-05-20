/**
 * @param array is an array containing the imagedata from a picture in the format {r,g,b}
 *
 * @return a grayscaled array
 */
function InvertgrayScale(array) {
    const grayScale = [];
    for (let i = 0; i < array.length; i += 4) {
        grayScale.push((array[i + 3]) / 255);
    }
    return grayScale;
}

function Convert(array) {
    const newArray = [];
    let avg = 0;
    for (let i = 0; i < array.length; i += 4) {
        avg = (array[i] + array[i + 1] + array[i + 2]) / 3;
        newArray.push((255 - avg) / 255);
    }
    return newArray;
}

function RGBScale(array) {
    const RGB = [];
    for (let i = 0; i < array.length; i++) {
        RGB.push(Math.floor(array[i] * 255));
        RGB.push(Math.floor(array[i] * 255));
        RGB.push(Math.floor(array[i] * 255));
        RGB.push(255);
    }
    return RGB;
}

/**
 * @param source is a string containing the source of the picture
 *
 * @return a grayscaled array
 */
async function MakeImageDataFromSource(source) {
    const img = new Image();
    img.src = source;
    return img.onload(MakeImageDataFromImage(img));
}

/**
 * @param img is an image object
 *
 * @return a grayscaled array
 */
async function MakeImageDataFromImage(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const array = ctx.getImageData(0, 0, 10, 10);
    pictureData = GrayScale(array.data);
    return pictureData;
}

export { InvertgrayScale, RGBScale, Convert };
