import { GetModel } from './fetch.js';
import PlotGraph from './plot_graph.js';
import { Load } from './drawing.js';

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
Load();

function ResetInput(){
    clearButton = document.getElementById("reset_input")
    clearButton.addEventListener("click", ClearCanvas, )
    clearButton.addEventListener("click", ClearCopyCanvas, )
}
