/**
 * Appends model info to the DOM
 *
 * @param {object} model object
 *
 * @return {void} void
 */
function DisplayModelInfo(model) {
    const config = model.config;

    const modelName = config.modelName;
    const activation = config.activation;
    const trainingSize = config.trainingSize;
    const batchSize = config.batchSize;
    const epochs = config.epochs;
    const augment = config.augment;
    const hiddenLayers = config.hiddenLayers;

    let accuracy = model.accuracy;

    accuracy = Math.round((accuracy + Number.EPSILON) * 100) / 100;

    const html = document.createElement('div');
    html.className = 'infoboxcontent';
    html.id = 'model_info';

    const pModelName = document.createElement('div');
    pModelName.id = 'model_name';
    pModelName.append(`Model name: ${modelName}`);

    const pActivation = document.createElement('div');
    pActivation.append(`Activation function: ${activation}`);

    const pTrainingSize = document.createElement('div');
    pTrainingSize.append(`Training size: ${trainingSize}`);

    const pBatchSize = document.createElement('div');
    pBatchSize.append(`BatchSize: ${batchSize}`);

    const pEpochs = document.createElement('div');
    pEpochs.append(`Epochs: ${epochs}`);

    const pAugment = document.createElement('div');
    pAugment.append(`Augment: ${augment}`);

    const pHiddenLayers = document.createElement('div');
    pHiddenLayers.append(`Hidden layers: [${hiddenLayers}]`);

    const pAccuracy = document.createElement('div');
    pAccuracy.append(`Accuracy: ${accuracy}`);

    html.append(pModelName, pActivation, pTrainingSize, pBatchSize, pEpochs, pAugment, pHiddenLayers, pAccuracy);

    const modelInfo = document.querySelector('#model_info');

    modelInfo.replaceWith(html);

    return;
}

/**
 * Displays the prediction and the accuracy
 *
 * @param {object} prediction
 *
 * @return {void} void
 */
function DisplayStats(prediction) {
    const predictionElement = document.getElementById('prediction');
    const guess = prediction.guess;
    const resultArray = prediction.result;
    predictionElement.innerHTML = 'Prediction: ' + guess;
    const accuracy = resultArray[guess];
    const accuracyElement = document.getElementById('accuracy');
    accuracyElement.innerHTML = ' ' + Math.round(accuracy * 10000) / 100 + '%';
    for (let i = 0; i < 10; i++) {
        const element = document.getElementById('probability_' + i);
        element.innerHTML = Math.round(resultArray[i] * 10000) / 100 + '%';
    }
}

export { DisplayModelInfo, DisplayStats };
