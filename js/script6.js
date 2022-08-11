const requestURL = 'https://jsonplaceholder.typicode.com/users'

function sendRequest(method, url, body = null) {
    const headers = {
        'Content-Type': 'application/json'
    }
    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
        return response.then(error => {
            const e = new Error('Something went wrong')
            e.data = error
            throw e
        })
    })
}

const body = {name: 'Roman', surname: 'Bozhek'}

// // GET sendRequest
// sendRequest('GET', requestURL)
//     .then((data) => {console.log(data)})
//     .catch((error) => {console.error(error)})

// POST
sendRequest('POST', requestURL, body)
    .then((data) => {console.log(data)})
    .catch((error) => {console.error(error)})
