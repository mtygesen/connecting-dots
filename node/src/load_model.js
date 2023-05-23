/**
 * Loads a model from the models folder
 * 
 * @param {string} modelName name of the model to load
 * 
 * @return {promise} a promise with the model object 
 */
export default async function LoadModel(modelName) {
    return (await import(`./trainer/models/${modelName}.json`, { assert: { type: 'json' }})).default;
}