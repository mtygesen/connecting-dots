/**
 * Gets a specific model from the server
 * 
 * @param modelName model to fetch from server
 * 
 * @returns model object promise or throws error
 */
async function GetModel(modelName) {
    const response = await fetch(`/get-model/${modelName}`);

    if (response.ok) return response.json();

    throw new Error(`Unexpected response status ${response.status}`);
}

/**
 * Gets a models prediction for a given input
 * 
 * @param input matrix of the image for the model to predict
 * @param modelName the model to use for prediction
 * 
 * @returns promise that resolves to the prediction object or throws error
 */
async function GetPrediction(input, modelName) {
    const response = await fetch(`/get-prediction/${modelName}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input)
    });
        
    if (response.ok) {
        return response.json();
    } 
    
    throw new Error(`Unexpected response status ${response.status}`);
}

export { GetModel, GetPrediction };
