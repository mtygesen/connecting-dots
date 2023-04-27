import { LoadModel } from "./load_model.js";
import mnist from "easy-mnist";

function CalculateFeatures(model, input) {
    const layers = model.net.layers;
    
    const filters = GetFilters(layers);

    const features = [];

    let data = mnist.makeData(1, 1);
    let test = data.testdata;

    Convolution(test[0].image, filters[0][0]);

    return features;
}

function Convolution(input, filter) {
    const filterSize = Math.sqrt(filter.length);
    const inputSize = Math.sqrt(input.length);

    const input2d = [];

    for (let i = 0; i < input.length; ++i) input2d.push(input.splice(0, inputSize));
    const padSize = Math.floor((filterSize - 1) / 2);

    const paddedInput = PadInput(input2d, padSize);

    console.log(paddedInput);
    
    const output = [];

    // Perform convolution

    return output;
}

/**
 * Pads the input matrix with same padding
 * 
 * @param input 2d array
 * @param padSize to pad the input
 * 
 * @returns padded input
 */
function PadInput(input, padSize) {
    const paddedInput = [...input];

    for (let i = 0; i < paddedInput.length; ++i) {
        for (let j = 0; j < padSize; ++j) {
            paddedInput[i].unshift(0);
            paddedInput[i].push(0);
        }
    }

    for (let i = 0; i < padSize; ++i) {
        paddedInput.unshift(new Array(paddedInput[0].length).fill(0));
        paddedInput.push(new Array(paddedInput[0].length).fill(0));
    }

    return paddedInput;
}

/**
 * Gets the filters from a model
 * 
 * @param layers property of a model object
 * 
 * @returns a 2d array of filters where the first dimension is the layer and the second dimension is the filter
 */
function GetFilters(layers) {
    const filterArr = new Array(layers.length).fill(0).map(() => new Array(GetMaxFilterSize(layers)).fill(0));
    
    let removed = 0;

    for (let i = 0; i < layers.length; ++i) {
        if ('filters' in layers[i]) {
            const filters = layers[i].filters;

            for (let j = 0; j < filters.length; ++j) {
                filterArr[i - removed].push(Object.values(filters[j].w));
            }
        }
        else {
            filterArr.splice(i - removed, 1);
            ++removed;
        }
    }

    return filterArr;
}

/**
 * Finds the maximum filter size in a model
 * 
 * @param layers property of a model object
 * 
 * @returns the maximum filter size
 */
function GetMaxFilterSize(layers) {
    let maxFilterSize = 0;

    for (let i = 0; i < layers.length; ++i) {
        if ('filters' in layers[i]) {
            const currentFilterSize = layers[i].sx * layers[i].sy * layers[i].depth;
            
            if (currentFilterSize > maxFilterSize) maxFilterSize = currentFilterSize;
        }
    }

    return maxFilterSize;
}

CalculateFeatures(await LoadModel('model1'), 1);