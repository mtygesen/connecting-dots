import fs from 'fs';
import LoadModel from './load_model.js';

test('Load model from file system and verify top level properties', async () => {
    // Get the name of the first model in the models folder without file extenstion
    const modelName = fs.readdirSync('./node/src/trainer/models/')[0].split('.')[0];
    const model1 = await LoadModel(modelName);

    expect(model1).toHaveProperty('net');
    expect(model1).toHaveProperty('stats');
    expect(model1).toHaveProperty('accuracy');
    expect(model1).toHaveProperty('config');

    // Test for nonexistent model
    try {
        const model2 = await LoadModel('nonexistent');
        expect(model2).toBeUndefined();
    } catch (err) {
        expect(err.code).toBe('MODULE_NOT_FOUND');
    }
});
