import fs from 'fs';
import mnist from 'easy-mnist';
import EvaluateModel from './evaluate_model.js';

test('Test a model on some input matrix', async () => {
    // Get the name of the first model in the models folder without file extension
    const modelName = fs.readdirSync('./node/src/trainer/models/')[0].split('.')[0];

    // Get a random input matrix from the MNIST dataset
    const input = mnist.makeData(1).traindata[0].image;

    // Check that the model returns the expected properties for a valid model and input
    const prediction1 = await EvaluateModel(modelName, input);

    expect(prediction1).toBeDefined();
    expect(prediction1).toHaveProperty('features');
    expect(prediction1).toHaveProperty('result');
    expect(prediction1).toHaveProperty('guess');

    // Test for nonexistent model with valid input
    try {
        const prediction2 = await EvaluateModel('nonexistent', input);
        expect(prediction2).toBeUndefined();
    }
    catch (err) {
        expect(err.code).toBe('MODULE_NOT_FOUND');
    }

    // Test for valid model with invalid input
    try {
        const prediction3 = await EvaluateModel(modelName);

        expect(prediction3).toBeDefined();
        expect(prediction3).not.toHaveProperty('features');
        expect(prediction3).not.toHaveProperty('result');
        expect(prediction3).not.toHaveProperty('guess');
    }
    catch (err) {
        expect(err.message).toBe('Cannot read properties of undefined (reading \'0\')');
    }
});
