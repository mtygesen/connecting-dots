/**
 * Gets a specific model from the server
 *
 * @param modelName model to fetch from server
 *
 * @return model object promise or throws error
 */
async function GetModel(modelName) {
  const response = await fetch(`/get-model/${modelName}`);

  if (response.ok) return response.json();

  throw new Error(`Unexpected response status ${response.status}`);
}

/**
 * Gets a models prediction for a random MNIST image containing a specific number
 *
 * @param modelName to use for prediction
 * @param number to get prediction for
 *
 * @return promise that resolves to the prediction object or throws error
 */
async function GetPrediction(modelName, number) {
  const response = await fetch(`/get-prediction/${modelName}/${number}`);

  if (response.ok) return response.json();

  throw new Error(`Unexpected response status ${response.status}`);
}

/**
 * Gets a models prediction for a given input
 *
 * @param input matrix of the image for the model to predict
 * @param modelName the model to use for prediction
 *
 * @return promise that resolves to the prediction object or throws error
 */
async function PostInput(input, modelName) {
  const response = await fetch(`/post-input/${modelName}`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(input),
  });

  if (response.ok) return response.json();

  throw new Error(`Unexpected response status ${response.status}`);
}

export {GetModel, GetPrediction, PostInput};
