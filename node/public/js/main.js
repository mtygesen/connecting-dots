import PlotGraph from './plot_graph.js';
import { GetModel, GetPrediction } from './fetch.js';
import { Load } from './drawing.js';
import { DisplayModelInfo } from './display.js'; 

const buttons = document.querySelectorAll('.getModelButton');
const defaultModel = 'model1';

try {
    GetModel(defaultModel).then(model => {
        PlotGraph(model);
        DisplayModelInfo(model);
    }); 
}
catch (err) {
    console.error(err);
}

for (const button of buttons) {
    button.addEventListener('click', e => { 
        try {
            GetModel(`${e.target.classList[1]}`).then(model => {
                PlotGraph(model);
                DisplayModelInfo(model);
            }); 
        }
        catch (err) {
            console.log(err);
        }
    });
}

Load();