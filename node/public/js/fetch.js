/**
 * Gets a specific model from the server
 *
 * @param {string} modelName model to fetch from server
 *
 * @return {object} model object promise or throws error
 */
async function GetModel(modelName) {
    const response = await fetch(`/get-model/${modelName}`);

    if (response.ok) return response.json();

    throw new Error(`Unexpected response status ${response.status}`);
}

/**
 * Gets a models prediction for a random MNIST image containing a specific number
 *
 * @param {string} modelName to use for prediction
 * @param {number} number to get prediction for
 *
 * @return {promise} promise that resolves to the prediction object or throws error
 */
async function GetPrediction(modelName, number) {
    const response = await fetch(`/get-prediction/${modelName}/${number}`);

    if (response.ok) return response.json();

    throw new Error(`Unexpected response status ${response.status}`);
}

/**
 * Gets a models prediction for a given input
 *
 * @param {array} input matrix of the image for the model to predict
 * @param {string} modelName the model to use for prediction
 *
 * @return {promise} promise that resolves to the prediction object or throws error
 */
async function PostInput(input, modelName) {
    const response = await fetch(`/post-input/${modelName}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(input),
    });

    if (response.ok) return response.json();

    throw new Error(`Unexpected response status ${response.status}`);
}

export { GetModel, GetPrediction, PostInput };
