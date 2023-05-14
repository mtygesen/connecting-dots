

/**
 * 
 * @param features 
 * @param scale 
 * @returns void
 */
function PlotFeatures(features, scale = 4) {
    const canvas = document.getElementById("featureMap");
    if (canvas === null) {
        console.log("Could not find a suitable canvas");
        return;
    }

    const ctx = canvas.getContext("2d");

    // Upscale the properties by the scale
    canvas.width = canvas.clientWidth * scale;
    canvas.height = canvas.clientHeight * scale;

    // Clear the previous canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < features.length; ++i) {
        Plot2dMatrix(DarkMap(features[i]), canvas);
    }
    
}

function Plot2dMatrix(matrix, canvas) {
    const ctx = canvas.getContext("2d");
    
    let sizeX = canvas.width / matrix.length;
    let sizeY = canvas.height / matrix[0].length;

    let y = 0;
    for (let i = 0; i < matrix.length; ++i) {
        let x = 0;
        
        for (let j = 0; j < matrix[0].length; ++j) {
            color = matrix[i][j];
            ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
            ctx.fillRect(x, y, sizeX + x, sizeY + y);

            x += sizeX;
        }

        y += sizeY;
    }
}

function DarkMap(matrix) {
    const max = Math.max(...matrix.flat());
    const min = Math.min(...matrix.flat());
    const DarkMap = [];
    for (let i = 0; i < matrix.length; ++i) {
        const temp = [];

        for (let j = 0; j < matrix.length; ++j) {
            temp[j] = 255 - Math.floor((matrix[i][j] - min) / (max - min) * 255);
        }

        DarkMap.push(temp);
    }

    return DarkMap
}
const matrix = [[1,2,3],[1,2,3],[1,2,3]];
const features = [];
features.push(matrix);
Plot2dMatrix(features);