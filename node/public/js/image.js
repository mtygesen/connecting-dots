/**
 * @param array is an array containing the imagedata from a picture in the format {r,g,b}
 * 
 * @returns a grayscaled array
 */
function InvertgrayScale(array) {
    let grayScale = []
    let avg = 0;
    for (let i = 0; i < array.length / 3; i++) {
        avg = (array[i * 3] + array[i * 3 + 1] + array[i * 3 + 2]) / 3
        grayScale.push((255 - avg) / 255)
    }
    return grayScale;
}

function RGBScale(array) {
    let RGB = []
    for (let i = 0; i < array.length; i++) {
        RGB.push(Math.floor(array[i] * 255))
        RGB.push(Math.floor(array[i] * 255))
        RGB.push(Math.floor(array[i] * 255))
        RGB.push(255)
    }
    return RGB
}

/**
 * @param source is a string containing the source of the picture
 * 
 * @returns a grayscaled array
 */
async function MakeImageDataFromSource(source) {
    const img = new Image()
    img.src = source
    return img.onload(MakeImageDataFromImage(img))
}

/**
 * @param img is an image object
 * 
 * @returns a grayscaled array
 */
async function MakeImageDataFromImage(img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const array = ctx.getImageData(0, 0, 10, 10)
    pictureData = GrayScale(array.data)
    return pictureData
}

export { InvertgrayScale, RGBScale }