// Async, Await

console.group('Async, Await')

const delay = ms => {
    return new Promise (resolve => setTimeout(() => resolve(),ms))
}

const url = 'https://jsonplaceholder.typicode.com/todos/1'

async function fetchAsyncTodos() {
    console.log('Start fetching ...')
    try {
        await delay(1000)
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        console.log('Successfully')
    } catch (e) {
        console.error('Error: ', e)
    } finally {
        console.groupEnd()
    }
}

fetchAsyncTodos()