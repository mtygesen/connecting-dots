import { GrayScale } from "./image.js"
import { GetPrediction } from "./fetch"

var currentPos = { x: 0, y: 0 }
var previousPos = { x: 0, y: 0 }
var currentlyDrawing = false
var drawingCanvas = false
var ctx = false
var clearButton = false
var submitButton = false
var currentModel = false

function Load() {
  currentModel = "?"
  drawingCanvas = document.getElementById("drawingCanvas")
  ctx = drawingCanvas.getContext("2d")
  drawingCanvas.style.position = 'fixed'

  drawingCanvas.addEventListener("mousedown", StartDrawing)
  drawingCanvas.addEventListener("mousemove", Draw)
  drawingCanvas.addEventListener("mouseup", StopDrawing)

  clearButton = document.getElementById("clearButton")
  clearButton.addEventListener("click", ClearCanvas)

  submitButton = document.getElementById("submitButton")
  submitButton.addEventListener("click", () => {
    data = ConvertToMatrix()
    GetPrediction(data, currentModel)
  })
}

function UpdatePos(event) {
  previousPos.x = currentPos.x
  previousPos.y = currentPos.y
  currentPos.x = event.clientX - drawingCanvas.offsetLeft
  currentPos.y = event.clientY - drawingCanvas.offsetTop
}

function StartDrawing(event) {
  UpdatePos(event)
  currentlyDrawing = true
}

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
function StopDrawing(event) {
  UpdatePos(event)
  currentlyDrawing = false
}

function ConvertToMatrix() {
  ctx.drawImage(img, 0, 0);
  const array = ctx.getImageData(0, 0, 10, 10)
  pictureData = GrayScale(array.data)
  return pictureData
}

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