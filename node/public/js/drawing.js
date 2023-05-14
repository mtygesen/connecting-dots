import { GrayScale } from "./image.js"
import { GetPrediction } from "./fetch.js"

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
  currentModel = "?"
  drawingCanvas = document.getElementById("drawingCanvas")
  ctx = drawingCanvas.getContext("2d")
  drawingCanvas.style.position = 'fixed'

  drawingCanvas.addEventListener("mousedown", UpdatePos)
  drawingCanvas.addEventListener("mousemove", Draw)
  drawingCanvas.addEventListener("mouseup", UpdatePos)
  //clears the canvas
  clearButton = document.getElementById("clearButton")
  clearButton.addEventListener("click", ClearCanvas,)
  clearButton.addEventListener("click", ClearCopyCanvas,)
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
      const response = await fetch(`/get-prediction/${modelName}/` + i, {
        method: "GET"
      })
      if (response.ok) {
        array = RGBScale(response.json().array)
        // upscale image
        let tempCanvas = document.createElement("canvas")
        let tempCtx = tempCanvas.getContext("2d")
        tempCtx.putImageData(array, 0, 0)
        let img = new Image()
        // draw upscaled image
        img.src = tempCanvas.toDataURL()
        copyctx = displayNumber.getContext("2d")
        copyctx.drawImage(img, 0, 0, 300, 300)
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
    ctx.lineWidth = "2"
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
  const array = tempCtx.getImageData(0, 0, 28, 28, { colorspace: "srgb" })
  const pictureData = GrayScale(array.data)
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


export { Load };