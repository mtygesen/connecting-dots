/**
 * @param array is an array containing the imagedata from a picture in the format {r,g,b,t}
 * 
 * @returns a grayscaled array
 */
function GrayScale(array) {
    let grayScale = []
    for (let i = 0; i < array.length / 4; i++) {
        avg = (array[i * 4] + array[i * 4 + 1] + array[u * 4 + 2]) / 3
        grayScale.push(avg)
    }
    return grayScale;
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
 * @param img is an image objectf
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