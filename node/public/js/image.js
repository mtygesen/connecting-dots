/**
 * @param {array} array is an array containing the imagedata from a picture in the format {r,g,b}
 *
 * @return {array} a grayscaled array
 */
function InvertgrayScale(array) {
    const grayScale = [];
    for (let i = 0; i < array.length; i += 4) {
        grayScale.push((array[i + 3]) / 255);
    }
    return grayScale;
}

/**
 * Convert array
 *
 * @param {array} array
 *
 * @return {array} array
 */
function Convert(array) {
    const newArray = [];
    let avg = 0;
    for (let i = 0; i < array.length; i += 4) {
        avg = (array[i] + array[i + 1] + array[i + 2]) / 3;
        newArray.push((255 - avg) / 255);
    }

    return newArray;
}

/**
 * Scales the array to RGB values
 *
 * @param {array} array
 *
 * @return {array} RGB array
 */
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

export { InvertgrayScale, RGBScale, Convert };
