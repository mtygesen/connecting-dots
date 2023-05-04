import { GrayScale } from "./image.js"
import { GetPrediction } from "./fetch.js"

var currentPos = { x: 0, y: 0 }
var previousPos = { x: 0, y: 0 }
var drawingCanvas = false
var ctx = false
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

  clearButton = document.getElementById("clearButton")
  clearButton.addEventListener("click", ClearCanvas)

  submitButton = document.getElementById("submitButton")
  submitButton.addEventListener("click", () => {
    data = ConvertToMatrix()
    GetPrediction(data, currentModel)
  })
}

// Updates the current and former x and y coordinates based on current mouse position
function UpdatePos(event) {
  previousPos.x = currentPos.x
  previousPos.y = currentPos.y
  currentPos.x = event.clientX - drawingCanvas.offsetLeft
  currentPos.y = event.clientY - drawingCanvas.offsetTop
}

// Draws a line between former and current mouseposition when left click is held
function Draw(event) {
  if (event.buttons === 1) {
    UpdatePos(event)
    ctx.beginPath()
    ctx.moveTo(previousPos.x, previousPos.y)
    ctx.lineTo(currentPos.x, currentPos.y)
    ctx.strokestyle = "black"
    ctx.linewidth = "10"
    ctx.stroke()
    ctx.closePath();
  }
}

// Converts the canvas into a grayscaled array
function ConvertToMatrix() {
  const array = ctx.getImageData(0, 0, drawingCanvas.width, drawingCanvas.height)
  pictureData = GrayScale(array.data)
  return pictureData
}

// resets the canvas
function ClearCanvas() {
  ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height)
}



/*
Tilføj:

en knap med id=clearButton (som nulstiller canvas)

en knap med id=submitButton (Som sender tegningen til serveren og returnerer en prediction)

Et canvas med id=drawingCanvas
Script med source=Drawing.js
efterfulgt af
<script> Load(); </script>

til HTML dokumentet og funktionerne burde virke
*/