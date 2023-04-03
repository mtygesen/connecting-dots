import mnist from 'easy-mnist';
import { SetupNetwork, TrainNetwork, TestNetwork } from './trainer.js';

let net = SetupNetwork();

const dataset = mnist.makeData(10000, 10000);

const trainingSet = dataset.traindata;
const testSet = dataset.testdata;

let stats = TrainNetwork(net, trainingSet, 2);

let accuracy = TestNetwork(net, testSet);

console.log(stats);
console.log(`Accuracy: ${accuracy}%`);