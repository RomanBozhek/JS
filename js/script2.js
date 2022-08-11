// const timeout = setTimeout(() => {
//     clearInterval(interval)
// }, 10000)

// let count = 0
// const interval = setInterval(() => {
//     console.log('seconds')
// }, 1000)

// clearTimeout(timeout)
// clearInterval(interval)

// const delay = (wait = 1000) => {
//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve()
//             // reject('Smthng went wrong. error')
//         }, wait)
//     })
//     return promise
// }

// delay(2500)
//     .then(() => {
//         console.log('after 2 seconds')
//     })
//     .catch(err => {console.error(err)})
//     .finally(() => {console.log('finally')})

// const getData = () => new Promise(resolve => resolve([
//     1, 1, 2, 3, 5, 8
// ]))
// getData().then(data => console.log(data))

// async function asyncExample () {
//     try {
//         await delay(3000)
//         const data = await getData()
//         console.log('Data: ', data)
//     } catch (e) {
//         console.log(e)
//     } finally {
//         console.log('finally!')
//     }
    
// }
// asyncExample()