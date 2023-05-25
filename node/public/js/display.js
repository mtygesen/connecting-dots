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
    const trainingMethod = config.trainingMethod;
    const trainingSize = config.trainingSize;
    const batchSize = config.batchSize;
    const epochs = config.epochs;
    const augment = config.augment;
    const hiddenLayers = config.hiddenLayers;

    let accuracy = model.accuracy;

    accuracy = Math.round((accuracy + Number.EPSILON) * 100) / 100;

    const html = document.createElement('p');
    html.className = 'infoboxcontent';
    html.id = 'model_info';

    const pModelName = document.createElement('p');
    pModelName.id = 'model_name';
    pModelName.append(`Model name: ${modelName}`);

    const pActivation = document.createElement('p');
    pActivation.append(`Activation function: ${activation}`);

    const pTrainingMethod = document.createElement('p');
    pTrainingMethod.append(`Training method: ${trainingMethod}`);

    const pTrainingSize = document.createElement('p');
    pTrainingSize.append(`Training size: ${trainingSize}`);

    const pBatchSize = document.createElement('p');
    pBatchSize.append(`BatchSize: ${batchSize}`);

    const pEpochs = document.createElement('p');
    pEpochs.append(`Epochs: ${epochs}`);

    const pAugment = document.createElement('p');
    pAugment.append(`Augment: ${augment}`);

    const pHiddenLayers = document.createElement('p');
    pHiddenLayers.append(`Hidden layers: [${hiddenLayers}]`);

    const pAccuracy = document.createElement('p');
    pAccuracy.append(`Accuracy: ${accuracy}`);

    html.append(pModelName, pActivation, pTrainingMethod, pTrainingSize);
    html.append(pBatchSize, pEpochs, pAugment, pHiddenLayers, pAccuracy);

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
        let text = Math.round(resultArray[i] * 10000) / 100
        element.innerHTML = ' ' + text.toFixed(2) + '%';
    }

    return;
}

/**
 * Reset prediction stats
 *
 * @return {void} void
 */
function ResetStats() {
    const predictionElement = document.getElementById('prediction');
    predictionElement.innerHTML = 'Prediction: X';
    const accuracyElement = document.getElementById('accuracy');
    accuracyElement.innerHTML = ' X%';
    for (let i = 0; i < 10; i++) {
        const element = document.getElementById('probability_' + i);
        element.innerHTML = ' X%';
    }

    return;
}

export { DisplayModelInfo, DisplayStats, ResetStats };
