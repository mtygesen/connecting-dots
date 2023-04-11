// Input er et heltal som svarer til modelnummeret man vil hente
// Output er modellen i json format
function GetModel(modelNumber) {
    // Muligvis skift url når server er sat op
    fetch(`localhost:3000/model${modelNumber}`)
    .then(response => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error (`Unexpected response status ${response.status}`)
        }
    })
    .catch(error => console.error(error))
}