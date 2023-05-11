import { GetModel } from './fetch.js';
import PlotGraph from './plot_graph.js';
import { Load } from './drawing.js';

const buttons = document.querySelectorAll('.getModelButton');

for (const button of buttons) {
    button.addEventListener('click', e => { 
        try {
            GetModel(`${e.target.classList[1]}`).then(model => PlotGraph(model));
            console.log(e)
        }
        catch (err) {
            console.log(err);
        }
    });
}
Load();
