/**
 * @param modelName string som svarer til modelnavn
 * 
 * @returns model som svarer til modelnavn som promise eller fejl
 */
async function GetModel(modelName) {
    const response = await fetch(`/get-model/${modelName}`);

    if (response.ok) return response.json()
    
    throw new Error (`Unexpected response status ${response.status}`);
}

/**
 * @param input matrice som svarer til billedet der skal evalueres
 * @param modelNavn string som svarer til modelnavn
 * 
 * @returns prediction til billedet som blev inputtet
 */
function getPrediction(input, modelNavn) {
    fetch(`localhost:3000/get-prediction/${modelNavn}`, {
        method: "POST",
        headers: {
            "content-type": "picture/json"
        },
        body: JSON.stringify(input)
    })
    .then (response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error (`Unexpected response status ${response.status}`)
        }
    })
    .catch(error => console.error(error))
}