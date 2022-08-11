// Spread & REST API

const citiesUKR = ['Kyiv', 'Lviv', 'Khmelnytskyi', 'Odesa', 'Dnipro']
const citiesEU = ['London', 'Berlin', 'Warsaw', 'Rome', 'Paris', 'Bratislava']

const citiesWithClubsUKR = {
    Kyiv: 'Dynamo',
    Lviv: 'Karpaty',
    Khmelnytskyi: 'Podillya',
    Odesa: 'Chornomorets',
    Dnipro: 'Dnipro-1'
}

const citiesWithClubsEU = {
    Kyiv: 'CSKA',
    London: 'Arsenal',
    Berlin: 'Union Berlin',
    Warsaw: 'Legia Warszawa',
    Rome: 'AS Roma',
    Paris: 'Pari-Saint-Germain',
    Bratislava: 'Slovan'
}

//Spread

// Spread with arrays
console.groupCollapsed('Spread with Arrays:')
console.log(... citiesUKR)
const allCities = [...citiesEU, 'Washington D.C.', ...citiesUKR]
console.log(allCities)
console.groupEnd()

// Spread with objects
console.group('Spread with Objects:')
console.log(citiesWithClubsUKR)
console.log({...citiesWithClubsUKR, ...citiesWithClubsEU})
console.groupEnd()