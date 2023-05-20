import PlotGraph from './plot_graph.js';
import { GetModel } from './fetch.js';
import { Load } from './drawing.js';
import { DisplayModelInfo } from './display.js';

const defaultModel = 'model1';

try {
    GetModel(defaultModel).then((model) => {
        PlotGraph(model);
        DisplayModelInfo(model);
    });
}
catch (err) {
    console.error(err);
}

Load();
