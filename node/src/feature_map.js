import LoadModel from "./load_model.js";

function CalculateFeatures(model, input) {
    const layers = model.net.layers;
    
    const filters = GetFilters(layers);

    const features = [];

    // Convolution()

    return features;
}

function Convolution(input, filter) {

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