import convnetjs from 'convnetjs';
import { LoadModel } from './load_model.js';

/**
 * Async function that evaluates the result of a model given an input image
 * 
 * @param modelName name of the model to evaluate
 * @param input image to evaluate
 * 
 * @returns a promise with an array of probabilities
 */
async function EvaluateModel(modelName, input) {
    const model = (await LoadModel(modelName)).default;

    const digit = new convnetjs.Vol(28, 28, 1, 0.0);

    digit.w = input;

    const net = new convnetjs.Net();

    net.fromJSON(model.net);

    const result = net.forward(digit);

    return result.w;
}

export { EvaluateModel };
