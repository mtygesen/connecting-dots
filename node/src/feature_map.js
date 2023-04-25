import { LoadModel } from "./load_model.js";

function CalculateFeatures(model, input) {
    const layers = model.net.layers;
    
    const filters = GetFilters(layers);

    const features = [];

    for (let i = 0; i < filters.length; ++i) {
        for (let j = 0; j < filters[i].length; ++j) {
            features.push(Convolution(input, filters[i]));
        }
    }
}

function Convolution(input, filter) {
    return filter
    // To be made
}

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