import convnetjs from 'convnetjs';

/**
 * Sets up the neural network
 *
 * @param {object}network object
 *
 * @return {object} net object
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
    } catch (err) {
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
 * @param {object} net object
 * @param {object} trainingSet to train the network
 * @param {object} testSet to test the network
 * @param {object} network object
 *
 * @return {object} stats object
 */
function TrainNetwork(net, trainingSet, testSet, network) {
    const logInterval = network.logInterval;
    const printInterval = 100;

    const trainingMethod = network.trainingMethod;
    const batchSize = network.batchSize;
    const l2Decay = network.l2Decay;
    const l1Decay = network.l1Decay;
    const learningRate = network.learning_rate;
    const momentum = network.momentum;
    const epochs = network.epochs;

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
    } catch (err) {
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

            if (j % logInterval === 0) {
                stats.push(trainer.train(digit, trainingSet[j].label.indexOf(1)));
                stats[(j + i * trainingSet.length) / logInterval].acc = TestNetwork(net, testSet, network);
            } else {
                trainer.train(digit, trainingSet[j].label.indexOf(1));
            }

            if (j > 0 && j % printInterval === 0) {
                PrintStatus(j + i * trainingSet.length, trainingSet, epochs, startTimer);
            }
        }
    }

    return stats;
}

/**
 * Prints the time left before training is done
 *
 * @param {number} i iteration number
 * @param {object}trainingSet to calculate the percentage
 * @param {number} epochs to calculate the overall percentage
 * @param {[number, number]} startTimer to calculate the time left
 *
 * @return {void} void
 */
function PrintStatus(i, trainingSet, epochs, startTimer) {
    const percentage = i / (trainingSet.length * epochs) * 100;

    const endTimer = process.hrtime(startTimer);

    const time = endTimer[0] + endTimer[1] / Math.pow(10, 9); // Time passed in seconds with 9 decimal places precision

    const timeLeft = Math.round(time / percentage * (100 - percentage));
    const minutesLeft = Math.floor(timeLeft / 60);
    const secondsLeft = timeLeft % 60;

    console.clear();
    console.log(`Training time left: ${minutesLeft}m ${secondsLeft}s`);

    return;
}

/**
 * Tests the neural network
 *
 * @param {object} net object
 * @param {object} testSet to test the network
 * @param {object} network object
 *
 * @return {number} accuracy of model
 */
function TestNetwork(net, testSet, network) {
    let correct = 0;

    for (let i = 0; i < testSet.length; ++i) {
        let digit = new convnetjs.Vol(28, 28, 1, 0.0);
        digit.w = testSet[i].image;

        const augment = network.augment;

        if (augment) { // Crop the image to 24x24 and randomly translate it by -2 to 2 pixels
            const dx = Math.floor(Math.random() * 5 - 2);
            const dy = Math.floor(Math.random() * 5 - 2);
            const flipImage = Math.random() < 0.5;

            digit = convnetjs.augment(digit, 24, dx, dy, flipImage);
        }

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
 * @param {string} modelName name of the model trained
 * @param {number}accuracy accuracy of the model trained
 *
 * @return {void} void
 */
function PrintDone(modelName, accuracy) {
    console.clear();

    console.log('Training complete!\n');
    console.log(`Model accuracy: ${accuracy}%`);
    console.log(`Saved as ${modelName}.json in models/\n`);

    return;
}

export { SetupNetwork, TrainNetwork, TestNetwork, PrintDone };
