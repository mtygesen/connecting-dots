import {InvertgrayScale, Convert} from './image.js';
import {GetPrediction, PostInput, GetModel} from './fetch.js';
import DisplayFM from './plot_features.js';
import PlotGraph from './plot_graph.js';
import {DisplayModelInfo} from './display.js';


const currentPos = {x: 0, y: 0};
const previousPos = {x: 0, y: 0};
let drawingCanvas = false;
let ctx = false;
let copyctx = false;
let clearButton = false;
let submitButton = false;
let currentModel = false;
let displayNumber = false;

// Function to add eventlisteners to canvas and buttons
function Load() {
  displayNumber = document.getElementById('displayNumber');
  drawingCanvas = document.getElementById('drawingCanvas');
  ctx = drawingCanvas.getContext('2d');
  drawingCanvas.style.position = 'fixed';

  drawingCanvas.addEventListener('mousedown', UpdatePos);
  drawingCanvas.addEventListener('mousemove', Draw);
  drawingCanvas.addEventListener('mouseup', UpdatePos);
  // clears the canvas
  clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', ClearCanvas );
  clearButton.addEventListener('click', ClearCopyCanvas );
  // clears the input canvas
  clearButton = document.getElementById('reset_input');
  clearButton.addEventListener('click', ClearCanvas );
  clearButton.addEventListener('click', ClearCopyCanvas );
  // submits the canvas
  submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', () => {
    CopyToCanvas();
    SubmitUserInput();
  });

  for (let i = 0; i < 10; i++) {
    const numpadButton = document.getElementById('numpadButton' + i);
    numpadButton.addEventListener('click', async () => {
      UpdateCurrentModel();

      let json;

      try {
        json = await GetPrediction(currentModel, i);
      } catch (error) {
        console.error(error);
      }

      ClearCanvas();
      copyctx = displayNumber.getContext('2d');
      copyctx.clearRect(0, 0, displayNumber.width, displayNumber.height);
      const array = json.array;
      // Create a temporary canvas
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 28;
      tempCanvas.height = 28;
      const tempCtx = tempCanvas.getContext('2d');
      // Get the imagedata from the temporary canvas
      const imageData = tempCtx.getImageData(0, 0, 28, 28);
      const data = imageData.data;
      let rgb = 0;
      // replace the imagedata from the temporary canvas with the imagedata from the picture pulled from our dataset
      for (let i = 0, j = 0; i < data.length; i += 4, j++) {
        rgb = Math.floor(array[j] * 255);
        data[i] = 255 - rgb; // red
        data[i + 1] = 255 - rgb; // green
        data[i + 2] = 255 - rgb; // blue
        data[i+ 3] = 255;
      }
      // puts the imagedata onto the temporary canvas
      tempCtx.putImageData(imageData, 0, 0, 0, 0, 28, 28);
      // draw upscaled image
      const img = new Image();
      img.onload = () =>{
        copyctx.drawImage(img, 0, 0, displayNumber.width, displayNumber.height);
      };
      img.src = tempCanvas.toDataURL();

      DisplayFM(json.prediction.features);

      const prediction = json.prediction;

      DisplayStats(prediction);
    });
  }
  const buttons = document.querySelectorAll('.getModelButton');
  for (const button of buttons) {
    button.addEventListener('click', async (e) => {
      try {
        GetModel(`${e.target.classList[1]}`).then(async (model) => {
          PlotGraph(model);
          DisplayModelInfo(model);
          UpdateCurrentModel();
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          tempCtx.drawImage(displayNumber, 0, 0, 28, 28);
          const array = tempCtx.getImageData(0, 0, 28, 28).data;
          for (let i = 0; i < array.length; i += 4) {
            if (array[i] === 0) {
              array[i] = 255 - array[i + 3];
              array[i + 1] = 255 - array[i + 3];
              array[i + 2] = 255 - array[i + 3];
            }
          }
          const data = Convert(array);
          const json = await PostInput(data, currentModel);
          DisplayFM(json.features);
          DisplayStats(json);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
}

// Updates the current and former x and y coordinates based on current mouse position
function UpdatePos(event) {
  previousPos.x = currentPos.x;
  previousPos.y = currentPos.y;
  currentPos.x = event.clientX - drawingCanvas.getBoundingClientRect().left;
  currentPos.y = event.clientY - drawingCanvas.getBoundingClientRect().top;
}

// Draws a line between former and current mouseposition when left click is held
function Draw(event) {
  if (event.buttons === 1) {
    UpdatePos(event);
    ctx.beginPath();
    ctx.moveTo(previousPos.x, previousPos.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = '9';
    ctx.stroke();
    ctx.closePath();
  }
}

// Converts the canvas into a grayscaled array
function ConvertToMatrix() {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(displayNumber, 0, 0, 28, 28);
  const array = tempCtx.getImageData(0, 0, 28, 28);
  const invertArray = InvertgrayScale(array.data);
  return invertArray;
}

// resets the canvas
function ClearCanvas() {
  ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}
function ClearCopyCanvas() {
  copyctx.clearRect(0, 0, displayNumber.width, displayNumber.height);
}

// Copys the current canvas to the input canvas
function CopyToCanvas() {
  copyctx = displayNumber.getContext('2d');
  ClearCopyCanvas();
  copyctx.drawImage(drawingCanvas, 0, 0);
}
function ResetInput() {
  clearButton = document.getElementById('reset_input');
  clearButton.addEventListener('click', ClearCanvas );
  clearButton.addEventListener('click', ClearCopyCanvas );
}

function DisplayStats(prediction) {
  const predictionElement = document.getElementById('prediction');
  const guess = prediction.guess;
  const resultArray = prediction.result;
  predictionElement.innerHTML = 'Prediction: ' + guess;
  const accuracy = resultArray[guess];
  const accuracyElement = document.getElementById('accuracy');
  accuracyElement.innerHTML = ' ' + Math.round(accuracy * 10000) / 100 + '%';
  for (let i = 0; i < 10; i++) {
    const element = document.getElementById('probability_' + i);
    element.innerHTML = Math.round(resultArray[i] * 10000) / 100 + '%';
  }
}

function UpdateCurrentModel() {
  const modelName = document.getElementById('model_name').innerText;
  currentModel = modelName.split(' ')[2];
}

async function SubmitUserInput() {
  const data = ConvertToMatrix();
  UpdateCurrentModel();
  const json = await PostInput(data, currentModel);
  DisplayFM(json.features);
  DisplayStats(json);
}

export {Load};
