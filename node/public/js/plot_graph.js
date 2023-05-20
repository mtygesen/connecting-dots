/**
 * Makes a plot of the loss over iterations from the given training algorithm in the canvas with id "LossChart"
 *
 * @param model object
 * @param scale (optional) which specifies the upscaling factor
 * @param partitions (optional) oartitions to average the values over
 *
 * @return void
 */
export default function PlotGraph(model, scale = 4, partitions = 20) {
  // Find and initialize the canvas
  const canvas = document.getElementById('LossChart');

  if (canvas === null) {
    console.warn('Could not find a suitable canvas');
    return;
  }

  const ctx = canvas.getContext('2d');

  // Upscale the properties by the scale
  canvas.width = canvas.clientWidth * scale;
  canvas.height = canvas.clientHeight * scale;
  ctx.lineWidth = canvas.width / 500;

  // Clear the previous canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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

  DrawGrid(canvas, grid, '#000');

  WriteLables(canvas, grid, '#000', 'Loss', 'Iterations', 'Accuracy');

  WriteLegends(canvas, grid, 'Loss', '#AA0038', 'Accuracy', '#1978C8');

  const loss = (model.stats.map((stats) => stats.loss));

  const smoothLoss = AverageValues(loss, partitions);
  const maxSmoothLoss = Math.max(...smoothLoss);

  const totalIterations = model.config.trainingSize * model.config.epochs;

  WriteValues(canvas, grid, '#000', totalIterations, maxSmoothLoss, 100);

  DrawGraph(canvas, grid, smoothLoss, '#AA0038');

  const acc = (model.stats.map((stats) => stats.acc));
  const smoothAcc = AverageValues(acc, partitions);

  DrawGraph(canvas, grid, smoothAcc, '#1978C8', 100);

  return;
}

/**
 * Averages the values in an array
 *
 * @param arr array of numbers
 * @param partitions the number of partitions to be averaged
 *
 * @return smoothArr array of averaged values
 */
function AverageValues(arr, partitions) {
  const avgCount = Math.floor(arr.length / partitions);

  const smoothArr = [arr[0]];

  for (let i = 0; i < partitions; ++i) {
    let avg = 0;

    for (let j = 0; j < avgCount; ++j) {
      avg += arr[i * avgCount + j];
    }

    avg /= avgCount;

    smoothArr.push(avg);
  }

  return smoothArr;
}

/**
 * Draws a centered grid in a canvas
 *
 * @param canvas the canvas to be drawn upon
 * @param grid object containing information about the grid.
 *
 * @param color represented as a Hex-code in a string
 *
 * @return void
 */
function DrawGrid(canvas, grid, color) {
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.strokeStyle = color;

  const clmnSpacing = canvas.width / grid.maxColoumns;
  const rowSpacing = canvas.height / grid.maxRows;

  // The grid will be centered on the canvas
  for (let i = 0; i <= grid.coloumns; i++) { // Coloumns
    const x = grid.left + clmnSpacing * i;
    ctx.moveTo(x, grid.top);
    ctx.lineTo(x, grid.bottom);
    ctx.stroke();
  }

  for (let i = 0; i <= grid.rows; i++) { // Rows
    const y = grid.top + rowSpacing * i;
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
 * @return void
 */
function WriteLables(canvas, grid, color, y1Label, xLabel, y2Label = '') {
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.textAlign = 'center';
  ctx.fillStyle = color;
  const titleSize = Math.min(grid.left / 3, grid.top / 3);
  ctx.font = `${titleSize}px Arial`;

  let x; let y;

  // Left label
  const rotation = Math.PI / 2; // 90 degrees
  ctx.rotate(-rotation); // Rotate left
  x = -canvas.height / 2;
  y = grid.left / 4;
  ctx.fillText(y1Label, x, y);
  ctx.rotate(rotation); // Rotate back

  // x-axis label
  x = canvas.width / 2;
  y = grid.bottom + grid.top * 2 / 3;
  ctx.fillText(xLabel, x, y);

  // Potential right label
  ctx.rotate(rotation); // Rotate right
  x = canvas.height / 2;
  y = -(grid.right + grid.left * 3 / 4);
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
 * @param maxX the highest value of the x-axis
 * @param maxY1 the highest values of the left y-axis
 * @param maxY2 (optional) the highest values of the right y-axis
 *
 * @return void
 */
function WriteValues(canvas, grid, color, maxX, maxY1, maxY2) {
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.fillStyle = color;
  const Δx = canvas.width / grid.maxColoumns;
  const Δy = canvas.height / grid.maxRows;
  const labelSize = Math.min(Δx / 2, Δy / 2); // Find a suitable fontsize
  ctx.font = `${labelSize}px Arial`;

  let x; let y;

  // Left Y-axis
  ctx.textAlign = 'right';
  x = grid.left * 0.9;
  for (let i = 0; i <= grid.rows; i++) {
    y = grid.top + Δy * i;
    const value = (1 - i / grid.rows) * maxY1;
    ctx.fillText(value.toFixed(2), x, y);
  }

  // X-axis
  ctx.textAlign = 'center';
  y = grid.bottom + grid.top * 0.25;
  for (let i = 0; i <= grid.coloumns; i++) {
    x = grid.left + Δx * i;
    const value = maxX / grid.coloumns * i;

        i ? ctx.fillText(value, x, y) : ctx.fillText(value + 1, x, y);
  }

  if (maxY2 == '') return; // Stop here if maxY2 is not defined

  // Right Y-axis
  ctx.textAlign = 'left';
  x = grid.right + grid.left * 0.1;
  for (let i = 0; i <= grid.rows; i++) {
    y = grid.top + Δy * i;
    const value = (1 - i / grid.rows) * maxY2;
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
 * @param yMax highest point of the y-axis
 *
 * @return void
 */
function DrawGraph(canvas, grid, values, color, yMax = Math.max(...values)) {
  // Draw the actual graph
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = color;
  const Δx = (canvas.width - 2 * grid.left) / (values.length - 1);

  // Starting point
  let x = grid.left;
  let y = grid.bottom - values[0] / yMax * (grid.bottom - grid.top);
  ctx.moveTo(x, y);

  for (let i = 1; i < values.length; i++) {
    x = grid.left + Δx * i;
    y = grid.bottom - values[i] / yMax * (grid.bottom - grid.top);
    ctx.lineTo(x, y);
  }

  ctx.stroke();
}

/**
 * Draws the legends of a graph with the given colors
 *
 * @param canvas the canvas to be drawn upon
 * @param grid object containing information about the grid.
 * @param legend1 the string to label the left y-axis
 * @param color1 represented as a Hex-code in a string
 * @param legend2 the string to label the right y-axis
 * @param color2 represented as a Hex-code in a string
 *
 * @return void
 */
function WriteLegends(canvas, grid, legend1, color1, legend2, color2) {
  const ctx = canvas.getContext('2d');

  const x = canvas.width / 2;
  const y = grid.top * 2 / 3;

  const x1 = x * 0.85;

  const legendColorSize = Math.min(grid.left / 5, grid.top / 5);
  const colorOffset = 1.75;

  const legend1ColorX = x1 - legendColorSize * colorOffset;
  const legend1ColorY = y - legendColorSize;

  ctx.fillStyle = color1;
  ctx.fillRect(legend1ColorX, legend1ColorY, legendColorSize, legendColorSize);

  const legendSize = Math.min(grid.left / 4, grid.top / 4);

  ctx.fillStyle = '#000';
  ctx.font = `${legendSize}px Arial`;
  ctx.textAlign = 'left';
  ctx.fillText(legend1, x1, y);

  const x2 = x - x1 + x;

  const legend2ColorX = x2 - legendColorSize * colorOffset;
  const legend2ColorY = y - legendColorSize;

  ctx.fillStyle = color2;
  ctx.fillRect(legend2ColorX, legend2ColorY, legendColorSize, legendColorSize);

  ctx.fillStyle = '#000';
  ctx.fillText(legend2, x2, y);

  return;
}
