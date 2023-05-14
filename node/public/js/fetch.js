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
 * @param input matrice som svarer til billedet der skal evalueres
 * @param modelNavn string som svarer til modelnavn
 * 
 * @returns prediction til billedet som blev inputtet
 */
async function GetPrediction(input, modelName) {
    const response = await fetch(`/get-prediction/${modelName}`, {
        method: "POST",
        headers: {
            "content-type": "picture/json"
        },
        body: JSON.stringify(input)
    })
    if (response.ok) {
        return response.json()
    } else {
        throw new Error(`Unexpected response status ${response.status}`)
    }
}

export { GetModel, GetPrediction };
