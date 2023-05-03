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
 * Gets a prediction from the server given an input matrix and a model name
 * 
 * @param modelName name of the model to evaluate
 * @param input matrix of pixels to be evaluated
 * 
 * @returns a promise with a prediction object or throws error
 */
async function GetPrediction(input, modelName) {
    const response = await fetch(`localhost:3000/get-prediction/${modelName}`, {
        method: "POST",
        headers: {
            "content-type": "picture/json"
        },
        body: JSON.stringify(input)
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(`Unexpected response status ${response.status}`)
            }
        })
        .catch(error => console.error(error))
}

export { GetModel, GetPrediction };