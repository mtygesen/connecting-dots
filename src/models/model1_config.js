import mnist from 'easy-mnist';
import { SetupNetwork, TrainNetwork, TestNetwork } from '../trainer.js';

let net = SetupNetwork();

const dataset = mnist.makeData(10000, 10000);

let startTimer = process.hrtime(); 

let stats = TrainNetwork(net, dataset.traindata, startTimer, 1);

let accuracy = TestNetwork(net, dataset.testdata);

console.log(stats);
console.log(`Accuracy: ${accuracy}%`);