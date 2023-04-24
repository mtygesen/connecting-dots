import fs from 'fs';
import mnist from 'easy-mnist';
import { EvaluateModel } from "./evaluate_model";

test("Test a model on some input matrix", async () => {
    // Get the name of the first model in the models folder without file extenstion
    const modelName = fs.readdirSync('./src/trainer/models/')[0].split('.')[0];

    // Get a random input matrix from the MNIST dataset
    const input = mnist.makeData(1).traindata[0].image;

    // Check that the model returns the expected properties for a valid model and input
    const prediction1 = await EvaluateModel(modelName, input); 

    expect(prediction1).toBeDefined();
    expect(prediction1).toHaveProperty('sx');
    expect(prediction1).toHaveProperty('sy');
    expect(prediction1).toHaveProperty('depth');
    expect(prediction1).toHaveProperty('w');
    expect(prediction1).toHaveProperty('dw');
    
    // Test for nonexistent model with valid input
    try {
        const prediction2 = await EvaluateModel('nonexistent', input)
    }
    catch (err) {
        expect(err.code).toBe('MODULE_NOT_FOUND');
    }

    // Test for valid model with invalid input
    try {
        const prediction3 = await EvaluateModel(modelName);

        expect(prediction3).toBeDefined();
        expect(prediction3).not.toHaveProperty('sx');
        expect(prediction3).not.toHaveProperty('sy');
        expect(prediction3).not.toHaveProperty('depth');
        expect(prediction3).not.toHaveProperty('w');
        expect(prediction3).not.toHaveProperty('dw');
    }
    catch (err) {
        expect(err.message).toBe("Cannot read properties of undefined (reading '0')");
    }
});