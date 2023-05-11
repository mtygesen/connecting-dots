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

    const divModelName = document.createElement('div');
    divModelName.append(`Model name: ${modelName}`);

    const divActivation = document.createElement('div');
    divActivation.append(`Activation function: ${activation}`);

    const divTrainingSize = document.createElement('div');
    divTrainingSize.append(`Training size: ${trainingSize}`);

    const divEpochs = document.createElement('div');
    divEpochs.append(`Epochs: ${epochs}`);

    const divAccuracy = document.createElement('div');
    divAccuracy.append(`Accuracy: ${accuracy}`);

    html.append(divModelName, divActivation, divTrainingSize, divEpochs, divAccuracy);

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