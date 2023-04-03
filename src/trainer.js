import convnetjs from 'convnetjs';

/**
 * Sets up the neural network
 * 
 * @param activation function string
 * @returns net object
 */
function SetupNetwork(activation = 'relu') {
    let net = new convnetjs.Net();
    let layers = [];

    layers.push({ type: 'input', out_sx: 28, out_sy: 28, out_depth: 1 });
    layers.push({ type: 'conv', sx: 5, filters: 8, stride: 1, pad: 2, activation: `${activation}` });
    layers.push({ type: 'pool', sx: 2, stride: 2 });
    layers.push({ type: 'conv', sx: 5, filters: 16, stride: 1, pad: 2, activation: `${activation}` });
    layers.push({ type: 'pool', sx: 3, stride: 3 });
    layers.push({ type: 'fc', num_neurons: 256, activation: `${activation}`});
    layers.push({ type: 'softmax', num_classes: 10 });
    
    net.makeLayers(layers);

    return net;
}

/**
 * Trains the neural network
 * 
 * @param net object
 * @param trainingSet to train the network
 * @param method of training string
 * @param epochs number
 * 
 * @returns stats array
 */
function TrainNetwork(net, trainingSet, method = 'adadelta', epochs = 1) {
    let trainer = new convnetjs.SGDTrainer(net, { method: `${method}`, batch_size: 1, l2_decay: 0.001 });
    
    let stats = [];

    let startTimer = process.hrtime(); 

    for (let i = 0; i < epochs; ++i) {
        for (let j = 0; j < trainingSet.length; ++j) {
            let digit = new convnetjs.Vol(28, 28, 1, 0.0);
            digit.w = trainingSet[j].image;
        
            stats.push([trainer.train(digit, trainingSet[j].label.indexOf(1))]);
        
            PrintStatus(j, 50, trainingSet, startTimer);
        }

        console.log('Training done.');
    }

    return stats;
}

/**
 * Prints the training status
 * 
 * @param i number
 * @param interval number
 * @param trainingSet to calculate the percentage
 * @param startTimer to calculate the time left
 * 
 * @returns void
 */
function PrintStatus(i, interval, trainingSet, startTimer) {
    if (i > 0 && i % interval === 0) {
        let percentage = i / trainingSet.length * 100;

        let endTimer = process.hrtime(startTimer);

        let time = endTimer[0] + endTimer[1] / 1000000000;

        let timeLeft = Math.round(time / percentage * (100 - percentage));

        let minutesLeft = Math.floor(timeLeft / 60); 
        let secondsLeft = timeLeft % 60;

        console.clear();
        console.log(`Training time left: ${minutesLeft}m ${secondsLeft}s`);
    }

    return;
}

/**
 * Tests the neural network
 * 
 * @param net object
 * @param testSet to test the network
 * 
 * @returns accuracy of model
 */
function TestNetwork(net, testSet) {
    let correct = 0;

    for (let i = 0; i < testSet.length; ++i) {
        let digit = new convnetjs.Vol(28, 28, 1, 0.0);
        digit.w = testSet[i].image;

        let prediction = net.forward(digit);
        let predictionMax = Math.max(...prediction.w);

        let guess = prediction.w.indexOf(predictionMax);

        let answer = testSet[i].label.indexOf(1);

        if (guess === answer) ++correct;
    }

    let accuracy = (correct / testSet.length) * 100;

    return accuracy;
}

export { SetupNetwork, TrainNetwork, TestNetwork };