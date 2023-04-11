/**
 * Appends model info to the DOM
 * 
 * @param model object 
 * 
 * @returns void 
 */
function DisplayModelInfo(model) {
    const config = model.config,
          accuracy = model.accuracy;

    const activation = config.activation,
          trainingSize = config.trainingSize,
          epochs = config.epochs;

    const html = `<p>
                    Model: ${modelName}<br>
                    Activation function: ${activation}<br>
                    Training size: ${trainingSize}<br>
                    Epochs: ${epochs}<br>
                    Accuracy: ${accuracy}
                  </p>`;

    const modelInfo = document.querySelector('#model_info');

    modelInfo.append(html);

    return;
}