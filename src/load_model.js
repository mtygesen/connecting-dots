async function GetModel(modelName) {
    return await import(`./trainer/models/${modelName}.json`, { assert: { type: 'json' }});
}

export { GetModel };