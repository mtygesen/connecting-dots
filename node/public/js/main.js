import { GetModel } from './fetch.js';
import PlotGraph from './plot_graph.js';

let model;

try {
    model = await GetModel('model1');
}
catch (err) {
    console.error(err);
}

PlotGraph(model);