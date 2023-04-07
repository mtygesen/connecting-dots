import fs from 'fs'; // Filesystem
import mnist from 'easy-mnist'; // MNIST dataset

import { SetupNetwork, TrainNetwork, TestNetwork } from './network.js'; // Training functions
import config from './model_config.json' assert { type: 'json' }; // Model configuration

let network = config.network,
    other = config.other;

let modelName = network.modelName,
    activation = network.activation,
    trainingSize = network.trainingSize,
    testSize = network.testSize;

let net = SetupNetwork(activation); // Setup the network

const dataset = mnist.makeData(trainingSize, testSize);
const trainingSet = dataset.traindata;
const testSet = dataset.testdata;

let stats = TrainNetwork(net, trainingSet, network); // Train the network and return stats

let accuracy = TestNetwork(net, testSet); // Test the network and return accuracy

let model = { 'net': net, 'stats': stats, 'accuracy': accuracy, 'config': network }; // Format model object
let modelStr = other.formattedOutput ? JSON.stringify(model, null, 4) : JSON.stringify(model); // Format model string

fs.writeFileSync(`models/${modelName}.json`, modelStr); // Save model

PrintDone(modelName, accuracy); // Print done message

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