var currentPos = {x:0, y:0}
var previousPos = {x:0, y:0}
var currentlyDrawing = false
var drawingCanvas = false
var ctx = false

function Load() {
drawingCanvas = document.getElementById("drawingCanvas")
ctx = drawingCanvas.getContext("2d")
drawingCanvas.style.position = 'fixed';

drawingCanvas.addEventListener("mousedown", StartDrawing)
drawingCanvas.addEventListener("mousemove", Draw)
drawingCanvas.addEventListener("mouseup", StopDrawing)
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
  if(event.buttons === 1) {
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

/* Tilføj:

<canvas id="drawingCanvas" width="1000" height="1000"></canvas>
<script src="Drawing.js", type="text/Javascript"></script>
<script> Load(); </script>

til HTML dokumentet og dette burde virke
*/