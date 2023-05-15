import { InvertgrayScale } from "./image.js"
import { GetPrediction } from "./fetch.js"
import DisplayFM from "./plot_features.js"


var currentPos = { x: 0, y: 0 }
var previousPos = { x: 0, y: 0 }
var drawingCanvas = false
var ctx = false
var copyctx = false
var clearButton = false
var submitButton = false
var currentModel = false

// Function to add eventlisteners to canvas and buttons
function Load() {
  currentModel = "model2"
  drawingCanvas = document.getElementById("drawingCanvas")
  ctx = drawingCanvas.getContext("2d")
  drawingCanvas.style.position = 'fixed'

  drawingCanvas.addEventListener("mousedown", UpdatePos)
  drawingCanvas.addEventListener("mousemove", Draw)
  drawingCanvas.addEventListener("mouseup", UpdatePos)
  //clears the canvas
  clearButton = document.getElementById("clearButton")
  clearButton.addEventListener("click", ClearCanvas, )
  clearButton.addEventListener("click", ClearCopyCanvas, )
//clears the input canvas
  clearButton = document.getElementById("reset_input")
  clearButton.addEventListener("click", ClearCanvas, )
  clearButton.addEventListener("click", ClearCopyCanvas, )
//submits the canvas
  submitButton = document.getElementById("submitButton")
  submitButton.addEventListener("click", () => {
    const data = ConvertToMatrix()
    GetPrediction(data, currentModel)
  })
  submitButton = document.getElementById("submitButton")
  submitButton.addEventListener("click", CopyToCanvas)

  for (let i = 0; i < 10; i++) {
    let numpadButton = document.getElementById("numpadButton" + i)
    numpadButton.addEventListener("click", async () => {
      const response = await fetch(`/get-prediction/${currentModel}/` + i, {
        method: "GET"
      })
      if (response.ok) {
        ClearCanvas()
        copyctx = displayNumber.getContext('2d');
        copyctx.clearRect(0, 0, displayNumber.width, displayNumber.height)
        let json = await response.json()
        let array = json.array
        // Create a temporary canvas
        const tempCanvas = document.createElement("canvas")
        tempCanvas.width = 28
        tempCanvas.height = 28
        const tempCtx = tempCanvas.getContext("2d")
        // Get the imagedata from the temporary canvas
        const imageData = tempCtx.getImageData(0, 0, 28, 28)
        var data = imageData.data;
        let rgb = 0
        // replace the imagedata from the temporary canvas with the imagedata from the picture pulled from our dataset
        for (let i = 0, j = 0; i < data.length; i += 4, j++) {
            rgb = Math.floor(array[j] * 255)
            data[i] = 255 - rgb; // red
            data[i + 1] = 255 - rgb; // green
            data[i + 2] = 255 - rgb; // blue
            data[i+ 3] = 255
        }
        // puts the imagedata onto the temporary canvas
        tempCtx.putImageData(imageData, 0, 0, 0, 0, 28, 28)
        // draw upscaled image
        let img = new Image()
        img.onload = () =>{
        copyctx.drawImage(img, 0, 0, displayNumber.width, displayNumber.height)
        }
        img.src = tempCanvas.toDataURL()

        DisplayFM(json.prediction.features);
      } else {
        throw new Error(`Unexpected response status ${response.status}`)
      }
    })
  }
}

// Updates the current and former x and y coordinates based on current mouse position
function UpdatePos(event) {
  previousPos.x = currentPos.x
  previousPos.y = currentPos.y
  currentPos.x = event.clientX - drawingCanvas.getBoundingClientRect().left
  currentPos.y = event.clientY - drawingCanvas.getBoundingClientRect().top
}

// Draws a line between former and current mouseposition when left click is held
function Draw(event) {
  if (event.buttons === 1) {
    UpdatePos(event)
    ctx.beginPath()
    ctx.moveTo(previousPos.x, previousPos.y)
    ctx.lineTo(currentPos.x, currentPos.y)
    ctx.strokeStyle = "black"
    ctx.lineWidth = "5"
    ctx.stroke()
    ctx.closePath();
  }
}

// Converts the canvas into a grayscaled array
function ConvertToMatrix() {
  // create image from canvas
  let img = new Image()
  Image.src = drawingCanvas.toDataURL()
  // draw image on a 28 x 28 canvas
  let tempCanvas = document.createElement("canvas")
  let tempCtx = tempCanvas.getContext("2d")
  tempCtx.drawImage(img, 0, 0, 28, 28)
  // convert 28 x 28 img to matrix and grayscale
  const array = tempCtx.getImageData(0, 0, 28, 28)
  const pictureData = InvertgrayScale(array.data)
  return pictureData
}

// resets the canvas
function ClearCanvas() {
  ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height)
}
function ClearCopyCanvas() {
  copyctx.clearRect(0, 0, displayNumber.width, displayNumber.height)
}

// Copys the current canvas to the input canvas
function CopyToCanvas() {
  copyctx = displayNumber.getContext('2d');
  copyctx.drawImage(drawingCanvas, 0, 0);
}
function ResetInput(){
  clearButton = document.getElementById("reset_input")
  clearButton.addEventListener("click", ClearCanvas, )
  clearButton.addEventListener("click", ClearCopyCanvas, )
}

export { Load };