/**
 * Appends model info to the DOM
 * 
 * @param model object 
 * 
 * @returns void 
 */
function DisplayModelInfo(model) {
    const config = model.config;

    let accuracy = model.accuracy;

    const modelName = config.modelName,
          activation = config.activation,
          trainingSize = config.trainingSize,
          epochs = config.epochs;

    accuracy = Math.round((accuracy + Number.EPSILON) * 100) / 100;

    const html = document.createElement('div');
    html.className = 'infoboxcontent';
    html.id = 'model_info';

    const pModelName = document.createElement('div');
    pModelName.id = "model_name"
    pModelName.append(`Model name: ${modelName}`);

    const pActivation = document.createElement('div');
    pActivation.append(`Activation function: ${activation}`);

    const pTrainingSize = document.createElement('div');
    pTrainingSize.append(`Training size: ${trainingSize}`);

    const pEpochs = document.createElement('div');
    pEpochs.append(`Epochs: ${epochs}`);

    const pAccuracy = document.createElement('div');
    pAccuracy.append(`Accuracy: ${accuracy}`);

    html.append(pModelName, pActivation, pTrainingSize, pEpochs, pAccuracy);

    const modelInfo = document.querySelector('#model_info');

    modelInfo.replaceWith(html);

    return;
}

/**
 * Displays the prediction on the page
 * 
 * @param prediction object
 * 
 * @returns void
 */
function DisplayPrediction(prediction) {
    const predictionInfo = document.querySelector('#prediction_info')

    const html = `<p>
                    Prediction: ${prediction}
                  </p>`;

    predictionInfo.append(html);

    return;
}


export { DisplayModelInfo, DisplayPrediction };