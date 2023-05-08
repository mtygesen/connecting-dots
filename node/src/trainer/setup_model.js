import convnetjs from 'convnetjs';

/**
 * Sets up the neural network
 * 
 * @param network object
 * 
 * @returns net object
 */
function SetupNetwork(network) {    
    const activation = network.activation;
    
    try {
        switch (activation) {
            case 'relu':
            case 'sigmoid':
            case 'tanh':
                break;
            default:
                throw new Error('Invalid activation function!');
            }
        }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
         
    const layers = [];
    const inputSize = network.inputSize;
        
    layers.push({ type: 'input', out_sx: inputSize, out_sy: inputSize, out_depth: 1 });
    layers.push({ type: 'conv', sx: 5, filters: 8, stride: 1, pad: 2, activation: `${activation}` });
    layers.push({ type: 'pool', sx: 2, stride: 2 });
    layers.push({ type: 'conv', sx: 5, filters: 16, stride: 1, pad: 2, activation: `${activation}` });
    layers.push({ type: 'pool', sx: 3, stride: 3 });

    const hiddenLayers = network.hiddenLayers;
    
    for (let i = 0; i < hiddenLayers.length; ++i) {
        layers.push({ type: 'fc', num_neurons: hiddenLayers[i], activation: `${activation}` });
    }

    layers.push({ type: 'softmax', num_classes: 10 });
    
    const net = new convnetjs.Net();   

    net.makeLayers(layers);

    return net;
}

/**
 * Trains the neural network
 * 
 * @param net object
 * @param trainingSet to train the network
 * @param network object
 * 
 * @returns stats object
 */
function TrainNetwork(net, trainingSet, testSet, network) {
    const printInterval = 100;

    const trainingMethod = network.trainingMethod,
          batchSize = network.batchSize,
          l2Decay = network.l2Decay,
          l1Decay = network.l1Decay,
          learningRate = network.learning_rate,
          momentum = network.momentum,
          epochs = network.epochs;

    const settings = { method: `${trainingMethod}`, batch_size: `${batchSize}`, l2_decay: `${l2Decay}` };

    try {
        switch (trainingMethod) {
            case 'adadelta':
                break;
            case 'adagrad':
                settings.l1_decay = l1Decay;
                break;
            case 'sgd':
                settings.l1_decay = l1Decay;
                settings.learning_rate = learningRate;
                settings.momentum = momentum;
                break;
            default:
                throw new Error('Invalid training method!');
        }
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    const trainer = new convnetjs.SGDTrainer(net, settings);
    
    const stats = [];

    const startTimer = process.hrtime(); 

    for (let i = 0; i < epochs; ++i) {
        for (let j = 0; j < trainingSet.length; ++j) {
            const digit = new convnetjs.Vol(28, 28, 1, 0.0);
            digit.w = trainingSet[j].image;
            
            stats.push(trainer.train(digit, trainingSet[j].label.indexOf(1)));
            stats[j].acc = TestNetwork(net, testSet);

            if (j % printInterval === 1) {
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
    const percentage = j / (trainingSet.length * epochs) * 100;

    const endTimer = process.hrtime(startTimer);

    const time = endTimer[0] + endTimer[1] / Math.pow(10, 9); // Time passed in seconds with 9 decimal places precision
    
    const timeLeft = Math.round(time / percentage * (100 - percentage)),
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
        const digit = new convnetjs.Vol(28, 28, 1, 0.0);
        digit.w = testSet[i].image;

        const prediction = net.forward(digit);
        const predictionMax = Math.max(...prediction.w);

        const guess = prediction.w.indexOf(predictionMax);

        const answer = testSet[i].label.indexOf(1);

        if (guess === answer) ++correct;
    }
    
    return (correct / testSet.length) * 100;
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