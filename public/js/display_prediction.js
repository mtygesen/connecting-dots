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