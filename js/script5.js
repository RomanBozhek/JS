const requestURL = 'https://jsonplaceholder.typicode.com/users'

function sendRequest(method, url, body = null) {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)
        xhr.responseType = 'json'
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onload = (() => {
            if (xhr.status >= 400) {
                reject(xhr.response)
            } else {
                resolve(xhr.response)
            }
        })

        xhr.onerror = (() => {
            reject(xhr.response)
        })

        xhr.send(JSON.stringify(body))
    })
}

// // GET sendRequest
// sendRequest('GET', requestURL)
//     .then((data) => {console.log(data)})
//     .catch((error) => {console.error(error)})

// POST sendRequest
const body = {name: 'Roman', surname: 'Bozhek'}
sendRequest('POST', requestURL, body)
    .then((data) => {console.log(data)})
    .catch((error) => {console.error(error)})