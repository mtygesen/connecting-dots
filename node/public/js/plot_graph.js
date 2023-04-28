/**
 * Makes a plot of the loss over iterations from the given training algorithm in the canvas with id "LossChart"
 * 
 * @param model object
 * @param scale (optional) which specifies the upscaling factor
 * 
 * @returns void
 */
export default function PlotGraph(model, scale = 4) {

    // Find and initialize the canvas
    const canvas = document.getElementById("LossChart");
    if (canvas === null) {
        console.log("Could not find a suitable canvas");
        return;
    }
    const ctx = canvas.getContext("2d");

    // Reset the canvas
    ctx.reset();

    // Upscale the properties by the scale
    canvas.width = canvas.clientWidth * scale;
    canvas.height = canvas.clientHeight * scale;
    ctx.lineWidth = canvas.width / 250;

    // Find the max value of the loss and the accuracy from the samples which will be the peaks of the Y-coordinates
    const maxLoss = Math.max(...model.stats.map((stats) => stats.loss)),
          maxAcc = Math.max(...model.stats.map((stats) => stats.acc));

    // initialize values for the grid
    const grid = {};
    grid.maxRows = 15;
    grid.rows = 10;
    grid.maxColoumns = 12;
    grid.coloumns = 10;
    grid.left = (canvas.width / grid.maxColoumns) * (grid.maxColoumns - grid.coloumns) / 2;
    grid.top = (canvas.height / grid.maxRows) * (grid.maxRows - grid.rows) / 2;
    grid.right = canvas.width - grid.left;
    grid.bottom = canvas.height - grid.top;

    /*   No background was wanted   */
    // DrawBackground(canvas, "#FFF");
    

    DrawGrid(canvas, grid, "#000");
    
    WriteLables(canvas, grid, "#000", "Loss", "Iterations", "Accuracy");
    
    WriteValues(canvas, grid, "#000", maxLoss, model.stats.length, maxAcc);

    let loss = (model.stats.map((stats) => stats.loss));
    DrawGraph(canvas, grid, loss, "#AA0038");

    let acc  = (model.stats.map((stats) => stats.acc));
    DrawGraph(canvas, grid, acc, "#1978C8");

    return;
}

/**
 * Sets the background of the canvas
 * 
 * @param canvas the canvas to be drawn upon
 * @param color represented as a Hex-code in a string
 * 
 * @returns void
 */
function DrawBackground(canvas, color) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draws a centered grid in a canvas
 * 
 * @param canvas the canvas to be drawn upon
 * @param grid object containing information about the grid.
 * 
 * @param color represented as a Hex-code in a string
 * 
 * @returns void
 */
function DrawGrid(canvas, grid, color) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = color;

    const clmnSpacing = canvas.width / grid.maxColoumns,
          rowSpacing = canvas.height / grid.maxRows;

    // The grid will be centered on the canvas
    for (let i = 0; i <= grid.coloumns; i++) { // Coloumns
        let x = grid.left + clmnSpacing * i;
        ctx.moveTo(x, grid.top);
        ctx.lineTo(x, grid.bottom);
        ctx.stroke();
    } 

    for (let i = 0; i <= grid.rows; i++) { // Rows
        let y = grid.top + rowSpacing * i;
        ctx.moveTo(grid.left, y);
        ctx.lineTo(grid.right, y);
        ctx.stroke();
    }
}

/**
 * Writes the Lables of the y and x axes
 * 
 * @param canvas the canvas to be drawn upon
 * @param grid object containing information about the grid.
 * @param color represented as a Hex-code in a string
 * @param y1Label the string to label the left y-axis
 * @param xLabel the string to label the x-axis
 * @param y2Label (optional) the string to label the right y-axis
 * 
 * @returns void
 */
function WriteLables(canvas, grid, color, y1Label, xLabel, y2Label = "") {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.textAlign = "center";
    ctx.fillStyle = color;
    const titleSize = Math.min(grid.left / 4, grid.height / 4);
    ctx.font = `${titleSize}px Arial`;
    
    let x, y;

    // Left label
    const rotation = Math.PI / 2; // 90 degrees
    ctx.rotate(-rotation); // Rotate left
    x = -canvas.height / 2;
    y = grid.left / 4;
    ctx.fillText(y1Label, x, y);
    ctx.rotate(rotation); // Rotate back

    // x-axis label
    x = canvas.width / 2;
    y = grid.bottom + grid.top * 2/3;
    ctx.fillText(xLabel, x, y);

    // Potential right label
    ctx.rotate(rotation); // Rotate right
    x = canvas.height / 2;
    y = -(grid.right + grid.left * 3/4);
    ctx.fillText(y2Label, x, y);
    ctx.rotate(-rotation); // Rotate back
}

/**
 * Writes the values of the y and x axes
 * 
 * @param canvas the canvas to be drawn upon
 * @param grid object containing information about the grid.
 * @param color represented as a Hex-code in a string
 * @param model object
 * @param maxY1 the highest values of the left y-axis
 * @param maxX the highest value of the x-axis
 * @param maxY2 (optional) the highest values of the right y-axis
 * 
 * @returns void
 */
function WriteValues(canvas, grid, color, maxY1, maxX, maxY2) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = color;
    const Δx = canvas.width / grid.maxColoumns,
          Δy = canvas.height / grid.maxRows;
    const labelSize = Math.min(Δx/2, Δy/3); // Find a suitable fontsize
    ctx.font = `${labelSize}px Arial`;

    let x, y;

    // Left Y-axis
    ctx.textAlign = "right";
    x = grid.left * 0.9;
    for (let i = 0; i <= grid.rows; i++) {
        y = grid.top + Δy * i;
        let value = (1 - i / grid.rows) * maxY1;
        ctx.fillText(value.toFixed(2), x, y);
    }

    // X-axis
    ctx.textAlign = "center";
    y = grid.bottom + grid.top * 0.25;
    for (let i = 0; i <= grid.coloumns; i++) {
        x = grid.left + Δx * i;
        let value = maxX / grid.coloumns * i;
        ctx.fillText(value, x, y);
    }
    
    if (maxY2 == "") return; // Stop here if maxY2 is not defined

    // Right Y-axis
    ctx.textAlign = "left";
    x = grid.right + grid.left * 0.1;
    for (let i = 0; i <= grid.rows; i++) {
        y = grid.top + Δy * i;
        let value = (1 - i / grid.rows) * maxY2;
        ctx.fillText(value.toFixed(2), x, y);
    }
    
}

/**
 * Draws the lines of a graph
 * 
 * @param canvas the canvas to be drawn upon
 * @param grid object containing information about the grid.
 * @param values array of values to be plotted
 * @param color represented as a Hex-code in a string
 * 
 * @returns void
 */
function DrawGraph(canvas, grid, values, color) {
    // Draw the actual graph
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    const Δx = (canvas.width - 2 * grid.left) / values.length;
    const max = Math.max(...values);
    

    // Starting point
    let x = grid.left;
    let y = grid.bottom - values[0] / max * (grid.bottom - grid.top);
    ctx.moveTo(x, y);

    for (let i = 1; i < values.length; i++) {
        x = grid.left + Δx * i;
        y = grid.bottom - values[i]/ max * (grid.bottom - grid.top);
        
        console.log(x,y);

        ctx.lineTo(x, y);
    }
    ctx.stroke();
}
