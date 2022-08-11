// Замикання

console.groupCollapsed('Замикання')

function urlGenerator(domain) {
    return function(url) {
        return `https://${url}.${domain}`
    }
}

const domainCom = urlGenerator('com')
const domainUa = urlGenerator('ua')

console.log(domainCom('adidas'))
console.log(domainUa('football'))

console.groupEnd()

// Binding

console.groupCollapsed('Binding')

function bindPerson (context, fn) {
    return function(...args) {
        fn.apply(context, args)
    }
}
function logPerson() {
    console.log(`Person: ${this.name}, ${this.age}, ${this.job}`)
}

const people = [{name: 'Mike', age: 19, job: 'driver'}, 
    {name: 'Ed', age: 23, job: 'seller'},
    {name: 'Veronika', age: 21, job: 'secretary'}]

for (let i = 0; i < people.length; i++) {
    bindPerson(people[i], logPerson)()
}

console.groupEnd()

// Promise

console.groupCollapsed('Promises')

console.log('Request data ...')

const p = new Promise(function(resolve, reject) {
    setTimeout(() => {
        const backendData = {context: 'smthng'}
        backendData.requested = true
        console.log('Preparing data ...',backendData)
        resolve(backendData)
    }, 2000)
})

p.then((receivedData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            receivedData.receieved = true
            console.log('Data received ...', receivedData)
            resolve()
        }, 2000)
    })
}).then(() => {
    console.log('Successfully')
}).finally(() => {console.groupEnd()})

