/**
 * Script that sets up, trains and tests a convolutional neural network on the MNIST dataset, and saves the model as a json file.
 * The configuration can be changed in model_settings.json
 */

import fs from 'fs'; // Filesystem
import mnist from 'easy-mnist'; // MNIST dataset

import { SetupNetwork, TrainNetwork, TestNetwork, PrintDone } from './setup_model.js'; // Import helper functions
import config from './model_settings.json' assert { type: 'json' }; // Model configuration

const network = config.network,
      other = config.other;

const modelName = network.modelName,
      trainingSize = network.trainingSize,
      testSize = network.testSize;

const net = SetupNetwork(network); // Setup the network

const dataset = mnist.makeData(trainingSize, testSize);

const trainingSet = dataset.traindata,
      testSet = dataset.testdata;

const stats = TrainNetwork(net, trainingSet, testSet, network); // Train the network and return stats

const accuracy = TestNetwork(net, testSet); // Test the network and return accuracy

const model = { 'net': net, 'stats': stats, 'accuracy': accuracy, 'config': network }; // Format model object

const modelStr = other.formattedOutput ? JSON.stringify(model, null, 4) : JSON.stringify(model); // Format model string

fs.writeFileSync(`models/${modelName}.json`, modelStr); // Save model

PrintDone(modelName, accuracy); // Print done message

process.exit(0);