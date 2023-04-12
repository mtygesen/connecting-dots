/**
 * Makes a plot of the loss over iterations from the given training algorithm in the canvas with id "LossChart"
 * 
 * @param model object
 * 
 * @returns void
 */
function PlotGraph() {
    // Find and initialize the canvas
    const canvas = document.getElementById("LossChart")
    const ctx  = canvas.getContext("2d")

    // Upscale the properties by factor
    const scale = 4
    canvas.width = canvas.clientWidth * scale
    canvas.height = canvas.clientHeight * scale
    ctx.lineWidth = 2 * scale

    // Find the max value of the loss from the samples which will be the peak of the Y-coordinates
    const max = Math.max(...model.stats.map((stat) => stat.loss));
    

    // initialize values for the grid
    const coloumns = 10
    const maxColoumns = 12
    const xDivide = canvas.width / maxColoumns
    const rows = 10
    const maxRows = 15
    const yDivide = canvas.height / maxRows

    const grid = {};
    grid.length = xDivide * coloumns
    grid.height = yDivide * rows
    grid.left = xDivide * (maxColoumns - coloumns) / 2
    grid.top = yDivide * (maxRows - rows) / 2
    grid.right = canvas.width - grid.left
    grid.bottom = canvas.height - grid.top


    
    // Grid background
    ctx.beginPath()
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // The grid will be centered on the canvas
    ctx.beginPath()
    ctx.strokeStyle = "#000"
    for (let i = 0; i <= coloumns; i++) { // Coloumns
        let x = grid.left + xDivide * i
        ctx.moveTo(x, grid.top)
        ctx.lineTo(x, grid.bottom)
        ctx.stroke()
    } 
    for (let i = 0; i <= rows; i++) { // Rows
        let y = grid.top + yDivide * i
        ctx.moveTo(grid.left, y)
        ctx.lineTo(grid.right, y)
        ctx.stroke()
    }
    

    // Write labels
    ctx.beginPath()
    ctx.fillStyle = "#000";
    const fontsize = Math.min(0.5 * yDivide, xDivide / 3) // Find correct fontsize
    ctx.font = `${fontsize}px Arial`
    ctx.textAlign = "right"
    for (let i = 0; i <= rows; i++) { // Y
        let x = grid.left * 0.9
        let y = grid.top + yDivide * i
        let value = (1 - i / rows) * max
        ctx.fillText(value.toFixed(2), x, y);
    }
    ctx.textAlign = "center"
    for (let i = 0; i <= coloumns; i++) { // X
        let x = grid.left + xDivide * i
        let y = grid.bottom + grid.top * 0.25
        ctx.fillText(10 * i, x, y);
    }

    // Draw the actual graph
    const points = model.stats.length
    const pxlDlta = grid.length / (points - 1) // There are points - 1 lines

    ctx.beginPath()
    ctx.strokeStyle = "#AA0000"; // Color of the lines
    for (let i = 0; i < points - 1; i++) {
        grid.x1 = grid.left + pxlDlta * i
        grid.x2 = grid.x1 + pxlDlta
        grid.y1 = grid.top + (1 - model.stats[i].loss / max) * grid.height
        grid.y2 = grid.top + (1 - model.stats[i + 1].loss / max) * grid.height

        ctx.moveTo(grid.x1, grid.y1)
        ctx.lineTo(grid.x2, grid.y2)
        ctx.stroke()
    }

    return;
}