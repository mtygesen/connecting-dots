// Input er en string i formattet "modelx" hvor x svarer til modelnummeret man vil hente. Eksempelvis model1
// Output er modellen i json format
function GetModel(modelNumber) {
    // Muligvis skift url når server er sat op
    fetch(`localhost:3000/{modelNumber}`)
    .then(response => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error (`Unexpected response status ${response.status}`)
        }
    })
    .catch(error => console.error(error))
}