import fs from 'fs'; // Filesystem
import mnist from 'easy-mnist'; // MNIST dataset

import { SetupNetwork, TrainNetwork, TestNetwork, PrintDone } from './trainer.js'; // Training functions
import config from './model_config.json' assert { type: 'json' }; // Model configuration

let modelName = config.modelName,
    activation = config.activation,
    trainingSize = config.trainingSize,
    testSize = config.testSize;

let net = SetupNetwork(activation); // Setup the network

const dataset = mnist.makeData(trainingSize, testSize);

let startTimer = process.hrtime(); 

let stats = TrainNetwork(net, dataset.traindata, startTimer, config); // Train the network and return stats

let accuracy = TestNetwork(net, dataset.testdata); // Test the network and return accuracy

let model = { 'net': net, 'stats': stats, 'accuracy': accuracy, 'config': config }; // Format model object

fs.writeFileSync(`models/${modelName}.json`, JSON.stringify(model)); // Save model

PrintDone(modelName, accuracy); // Print done message