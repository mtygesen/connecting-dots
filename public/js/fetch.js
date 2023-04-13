// Input er en string svarende til modellen man vil hente
// Output er modellen i JSON format
function GetModel(modelNumber) {
    // Muligvis skift url når server er sat op
    fetch(`localhost:3000/${modelNumber}`, {
        method: "GET"
    })
    .then(response => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error (`Unexpected response status ${response.status}`)
        }
    })
    .catch(error => console.error(error))
}

// variablen input er et billede konverteret til en vektor
// variablen modelNumber er en string som svarer til modelnummeret
// output er en prediction i JSON format
// (Er ikke sikker på hvorvidt dette virker, men kan ikke teste det inden vores serverarkitektur er sat op)
function getPrediction(input, modelNumber) {
    fetch(`localhost:3000/${modelNumber}`, {
        method: "POST",
        headers: {
            "content-type": "picture/json"
        },
        body: JSON.stringify(input)
    })
    .then (response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error (`Unexpected response status ${response.status}`)
        }
    })
    .catch(error => console.error(error))
}