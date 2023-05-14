
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

function LightMap(matrix, max ="", min ="") {
    if (max == "") max = Math.max(...matrix.flat());
    if (min == "") min = Math.min(...matrix.flat());
    const lightMap = [];
    for (let i = 0; i < matrix.length; ++i) {
        const temp = [];

        for (let j = 0; j < matrix.length; ++j) {
            temp[j] = 255 - Math.floor((matrix[i][j] - min) / (max - min) * 255);
        }

        lightMap.push(temp);
    }

    return lightMap
}

function DisplayFM(features, rows = 2) {
    const parent = document.getElementById("featureMap");
    DeleteChildNodes(parent);

    const FM = [];
    for (let i = 0; i < features.length; ++i) {
        FM.push(features[i].flat());
    }
    const max = Math.max(...FM.flat());
    const min = Math.min(...FM.flat());
    const rowLength = Math.ceil(features.length / rows);
    let remaining = features.length;

    for (let i = 0; i < features.length; i += rowLength) {
        let row = document.createElement("div");
        row.className = "FM-row";
        row.style.height = 100 / rows + "%";
        
        let dimension = Math.min(parent.clientWidth / (rowLength + 1), parent.clientHeight / (rows + 1));
        let canvasWidth = 100 * dimension / parent.clientWidth + "%";
        let canvasHeight = 100 * dimension / parent.clientHeight * rows + "%";

        for (let j = 0; j < rowLength; ++j) {

            if (remaining--) {
                let canvas = document.createElement("canvas");
                Plot2dMatrix(LightMap(features[i+j], max, min), canvas);
    
                //evt. give each FM a name
                canvas = row.appendChild(canvas);
                canvas.style.width = canvasWidth;
                canvas.style.height = canvasHeight;
            }
        }

        parent.appendChild(row);
    }

}

function DeleteChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


const matrix = [[1,2,3],[1,2,3],[1,2,3]];
const features = [];
features.push(matrix);
Plot2dMatrix(features);