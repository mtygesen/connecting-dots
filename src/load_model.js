/**
 * Loads a model from the models folder
 * 
 * @param modelName name of the model to load
 * 
 * @returns a promise with the model object 
 */
async function GetModel(modelName) {
    return await import(`./trainer/models/${modelName}.json`, { assert: { type: 'json' }});
}

export { GetModel };