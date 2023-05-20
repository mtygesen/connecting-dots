import convnetjs from 'convnetjs';
import LoadModel from './load_model.js';
import CalculateFeatures from './feature_map.js';

/**
 * Async function that evaluates the result of a model given an input image
 *
 * @param {string} modelName name of the model to evaluate
 * @param {array} input image to evaluate
 *
 * @return {promise} a promise with a prediction object
 */
export default async function EvaluateModel(modelName, input) {
    const model = await LoadModel(modelName);

    const digit = new convnetjs.Vol(28, 28, 1, 0.0);

    digit.w = input;

    const net = new convnetjs.Net();

    net.fromJSON(model.net);

    const result = net.forward(digit);
    const guess = result.w.indexOf(Math.max(...result.w));

    return { features: CalculateFeatures(model, input), result: result.w, guess: guess };
}
