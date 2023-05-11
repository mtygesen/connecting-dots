import PlotGraph from './plot_graph.js';
import { GetModel } from './fetch.js';
import { Load } from './drawing.js';
import { DisplayModelInfo } from './display.js'; 

const buttons = document.querySelectorAll('.getModelButton');

for (const button of buttons) {
    button.addEventListener('click', e => { 
        try {
            GetModel(`${e.target.classList[1]}`).then(model => {
                PlotGraph(model);
                DisplayModelInfo(model);
            }); 
            console.log(e)
        }
        catch (err) {
            console.log(err);
        }
    });
}

Load();