/**
 * Script that sets up, trains and tests a convolutional neural network on the MNIST dataset, and saves the model as a json file.
 * The configuration of the model can be changed in model_settings.json
 */
import fs from 'fs'; // Filesystem
import mnist from 'easy-mnist'; // MNIST dataset

import { SetupNetwork, TrainNetwork, TestNetwork, PrintDone } from './setup_model.js'; // Import helper functions

const json = fs.readFileSync('./node/src/trainer/model_settings.json', 'utf8');
const config = JSON.parse(json);

const network = config.network;
const other = config.other;

const modelName = network.modelName;
const trainingSize = network.trainingSize;
const testSize = network.testSize;

const net = SetupNetwork(network); // Setup the network

const dataset = mnist.makeData(trainingSize, testSize);

const trainingSet = dataset.traindata;
const testSet = dataset.testdata;

const stats = TrainNetwork(net, trainingSet, testSet, network); // Train the network and return stats

const accuracy = TestNetwork(net, testSet, network); // Test the network and return accuracy

const model = { 'net': net, 'stats': stats, 'accuracy': accuracy, 'config': network }; // Format model object

const modelStr = other.formattedOutput ? JSON.stringify(model, null, 4) : JSON.stringify(model); // Format model string

fs.writeFileSync(`models/${modelName}.json`, modelStr); // Save model

PrintDone(modelName, accuracy); // Print done message

process.exit(0); // Exit process
