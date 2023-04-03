import mnist from 'easy-mnist';
import { SetupNetwork, TrainNetwork, TestNetwork } from './trainer.js';

let net = SetupNetwork();

const dataset = mnist.makeData(100, 1000);

const trainingSet = dataset.traindata;
const testSet = dataset.testdata;

let stats = TrainNetwork(net, trainingSet);

TestNetwork(net, testSet);

console.log(stats);