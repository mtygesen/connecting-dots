import fs from 'fs';
import mnist from 'easy-mnist';

import { SetupNetwork, TrainNetwork, TestNetwork } from './trainer.js';
import config from './model_config.json' assert { type: 'json' };

let modelName = config.modelName,
    activation = config.activation,
    trainingSize = config.trainingSize,
    testSize = config.testSize;

let net = SetupNetwork(activation);

const dataset = mnist.makeData(trainingSize, testSize);

let startTimer = process.hrtime(); 

let stats = TrainNetwork(net, dataset.traindata, startTimer, config);

let accuracy = TestNetwork(net, dataset.testdata);

let model = { 'net': net, 'stats': stats, 'accuracy': accuracy, 'config': config };

fs.writeFileSync(`models/${modelName}.json`, JSON.stringify(model));

console.clear();

console.log('Training complete!\n');
console.log(`Model accuracy: ${accuracy}%`);
console.log(`Saved as ${modelName}.json in models/`);