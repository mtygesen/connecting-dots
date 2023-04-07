import convnetjs from 'convnetjs';

/**
 * Sets up the neural network
 * 
 * @param activation function string
 * 
 * @returns net object
 */
function SetupNetwork(activation) {
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
 * @param net network object
 * @param trainingSet to train the network
 * @param network object
 * 
 * @returns stats object
 */
function TrainNetwork(net, trainingSet, network) {
    const printInterval = 100;

    let trainingMethod = network.trainingMethod,
        batchSize = network.batchSize,
        l2Decay = network.l2Decay,
        epochs = network.epochs;

    let trainer = new convnetjs.SGDTrainer(net, { method: `${trainingMethod}`, batch_size: `${batchSize}`, l2_decay: `${l2Decay}` });
    
    let stats = []

    let startTimer = process.hrtime(); 

    for (let i = 0; i < epochs; ++i) {
        for (let j = 0; j < trainingSet.length; ++j) {
            let digit = new convnetjs.Vol(28, 28, 1, 0.0);
            digit.w = trainingSet[j].image;
        
            stats.push([trainer.train(digit, trainingSet[j].label.indexOf(1))]);

            if (j > 0 && j %  printInterval === 0) {
                PrintStatus(j, trainingSet, epochs, startTimer);
            }
        }
    }

    return stats;
}

/**
 * Prints the time left before training is done
 * 
 * @param j iteration number
 * @param trainingSet to calculate the percentage
 * @param epochs to calculate the overall percentage
 * @param startTimer to calculate the time left
 * 
 * @returns void
 */
function PrintStatus(j, trainingSet, epochs, startTimer) {
    let percentage = j / (trainingSet.length * epochs) * 100;

    let endTimer = process.hrtime(startTimer);

    let time = endTimer[0] + endTimer[1] / Math.pow(10, 9); // Time passed in seconds with 9 decimal places precision
    
    let timeLeft = Math.round(time / percentage * (100 - percentage)),
        minutesLeft = Math.floor(timeLeft / 60),
        secondsLeft = timeLeft % 60;
    
    console.clear();
    console.log(`Training time left: ${minutesLeft}m ${secondsLeft}s`);
    
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

/**
 * Prints a message to the console, when the program is done
 * 
 * @param modelName name of the model trained
 * @param accuracy accuracy of the model trained
 * 
 * @returns void
 */
function PrintDone(modelName, accuracy) {
    console.clear();

    console.log('Training complete!\n');
    console.log(`Model accuracy: ${accuracy}%`);
    console.log(`Saved as ${modelName}.json in models/\n`);
    
    return;
}

export { SetupNetwork, TrainNetwork, TestNetwork, PrintDone };