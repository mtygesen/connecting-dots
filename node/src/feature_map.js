import LoadModel from "./load_model.js";
import mnist from "easy-mnist";

/**
 * Calculates the features of the first convolution layer
 * 
 * @param model to get the filters from
 * @param input to calculate the features of
 * 
 * @returns a tensor of features where the first dimension is the feature and the second and third dimension are x and y of the img
 */
function CalculateFeatures(model, input) {
    const layers = model.net.layers;
    const filters = GetFilters(layers);

    let data = mnist.makeData(1, 1); // tmp
    let test = data.testdata; // tmp

    const features = [];
    
    for (let j = 0; j < filters[0].length; ++j) {
        features.push(Convolution(test[0].image, filters[0][j]));
    } 

    return features;
}

/**
 * Performs convolution on the input matrix with the filter matrix. The input matrix is padded with same padding.
 * 
 * @param input image matrix
 * @param filter matrix
 * 
 * @returns the output matrix
 */
function Convolution(input, filter) {
    const filterSize = Math.sqrt(filter.length);
    const inputSize = Math.sqrt(input.length);
    const outputSize = 1 + inputSize - filterSize;

    const filter2d = [];
    const input2d = [];
    
    while (filter.length) filter2d.push(filter.splice(0, filterSize));

    for (let i = 0; i * inputSize + inputSize <= input.length; ++i) {
        input2d.push(input.slice(i * inputSize, i * inputSize + inputSize));
    }

    const padSize = Math.floor((inputSize - outputSize) / 2);
    const paddedInput = PadInput(input2d, padSize);
    
    const output2d = [];

    for (let i = 0; i < outputSize; ++i) {
        const output1d = [];

        for (let j = 0; j < outputSize; ++j) {
            const temp2d = [];

            for (let k = 0; k < filterSize; ++k) {
                const temp1d = [];

                for (let l = 0; l < filterSize; ++l) {
                    temp1d[l] = paddedInput[i + k][j + l] * filter2d[k][l];
                }

                temp2d.push(temp1d);
            }

            output1d[j] = temp2d.reduce((a, b) => a.concat(b)).reduce((a, b) => a + b); // Flatten 2d array and calculate sum
        }

        output2d.push(output1d);
    }

    return output2d;
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

    // Pad columns
    for (let i = 0; i < paddedInput.length; ++i) {
        for (let j = 0; j < padSize; ++j) {
            paddedInput[i].unshift(0);
            paddedInput[i].push(0);
        }
    }

    // Pad rows
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
        else filterArr.splice(i - removed++, 1);
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

const features = CalculateFeatures(await LoadModel('model1'), 1);
console.log(features);