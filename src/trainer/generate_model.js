/**
 * Script that setups, trains and tests a convolutional neural network on the mnist dataset, and saves the model as a json file.
 * The configuration can be changed in model_settings.json
 */

import fs from 'fs'; // Filesystem
import mnist from 'easy-mnist'; // MNIST dataset

import { SetupNetwork, TrainNetwork, TestNetwork, PrintDone } from './setup_model.js'; // Import helper functions
import config from './model_settings.json' assert { type: 'json' }; // Model configuration

let network = config.network,
    other = config.other;

let modelName = network.modelName,
    activation = network.activation,
    trainingSize = network.trainingSize,
    testSize = network.testSize;

let net = SetupNetwork(activation); // Setup the network

const dataset = mnist.makeData(trainingSize, testSize);

let trainingSet = dataset.traindata,
    testSet = dataset.testdata;

let stats = TrainNetwork(net, trainingSet, network); // Train the network and return stats

let accuracy = TestNetwork(net, testSet); // Test the network and return accuracy

let model = { 'net': net, stats, 'accuracy': accuracy, 'config': network }; // Format model object

let modelStr = other.formattedOutput ? JSON.stringify(model, null, 4) : JSON.stringify(model); // Format model string

fs.writeFileSync(`models/${modelName}.json`, modelStr); // Save model

PrintDone(modelName, accuracy); // Print done message