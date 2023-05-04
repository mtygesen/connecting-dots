import { GetModel } from './fetch.js';
import PlotGraph from './plot_graph.js';
/*
const buttons = document.querySelectorAll('.modelRightBtn');

const buttonPressed = e => {
    console.log(e.target.id);  // Get ID of Clicked Element
    console.log("hello")
  }

    buttons.addEventListener("click", buttonPressed);
  */

 /*let reply_click = function()
{
  console.log("Button clicked, id "+this.id);
}
document.getElementById('model1').onclick = reply_click;
document.getElementById('model2').onclick = reply_click;
document.getElementById('model3').onclick = reply_click;


document.querySelectorAll('.modelRightBtn').forEach(item => {
    item.addEventListener('click', modelEvent)
})

const button = document.querySelector('#id');

button.addEventListener('click', () => await GetModel('modelName'));
*/

/*
async function modelEvent() {
    await GetModel('modelName')
    PlotGraph(model);
}
*/

const buttons = document.querySelectorAll('.getModelButton');

for (const button of buttons) {
    button.addEventListener('click', e => { 
        try {
            GetModel(`${e.target.id}`).then(model => PlotGraph(model));
        }
        catch (err) {
            console.log(err);
        }
    });
}