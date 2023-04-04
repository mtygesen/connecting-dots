import fs from 'fs';
import mnist from 'easy-mnist';

import { SetupNetwork, TrainNetwork, TestNetwork } from './trainer.js';
import config from './model_config.json' assert { type: 'json' };

let modelName = config.modelName;
let activation = config.activation;
let trainingSize = config.trainingSize;
let testSize = config.testSize;

let net = SetupNetwork(activation);

const dataset = mnist.makeData(trainingSize, testSize);

let startTimer = process.hrtime(); 

let stats = TrainNetwork(net, dataset.traindata, startTimer, config);

let accuracy = TestNetwork(net, dataset.testdata);

console.log(stats);
console.log(`Accuracy: ${accuracy}%`);

let model = { 'net': net, 'stats': stats, 'accuracy': accuracy, 'config': config };

fs.writeFileSync(`models/${modelName}.json`, JSON.stringify(model));