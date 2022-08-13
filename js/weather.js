let latitude = ''
let longitude = ''

// starting geometry.location

// KYIV, UKRAINE
latitude = '50.4422'
longitude = '30.5367'

// // KHMELNYTSKYI, UKRAINE
// latitude = '49.422983' 
// longitude = '26.987133'

document.getElementById('search').addEventListener('keydown', function(event) {
    if (event.key == 'Enter') { searchWeatherFromAddress()}
})

function weatherRequestURL() {
    url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude 
        + '&hourly=temperature_2m,precipitation,rain,showers,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=auto'
    return url
}

function latLonRequestURL(search) {
    url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' 
            + search + '&key=AIzaSyA9R30QTxtTkp6xwqr0FL7Q4I2c20VatZs'
    return url
}

function sendRequest(method, url) {
    const headers = {
        'Content-Type': 'application/json'
    }
    return fetch(url).then(response => {
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

function getWeatherByLocation(city, country) {
    sendRequest('GET', weatherRequestURL())
    .then((data) => {
        console.log(data)
        changeElementById('city-location', city)
        changeElementById('country-location', country)
        changeElementById('temperature-now', Math.round(data.hourly.temperature_2m[0]))
        putPicByWeather(data.hourly.weathercode[0], 'pic-weather-now', 64)
        changeElementById('description-now-w', ('now: ' + decodeWeatherCode(data.hourly.weathercode[0])))
        changeElementById('max-temperature', Math.round(data.daily.temperature_2m_max[0]))
        changeElementById('min-temperature', Math.round(data.daily.temperature_2m_min[0]))
        changeElementById('description-today-w', ('today: ' + decodeWeatherCode(data.daily.weathercode[0])))
        forecastFor24Hours(data)
        forecastFor7days(data)
    })
    .catch((error) => {console.error(error)})
}

function changeElementById(id, newValue) {
    const element = document.getElementById(id)
    element.textContent = newValue
}

function forecastFor24Hours(data) {
    const parentElement = document.getElementById('forecast-24-hours-sunset-sunrise')
    parentElement.innerHTML = ''
    
    const divSunrise = document.createElement('div')
    divSunrise.classList.add('weather-hour')
    let tSunrise = new Date(data.daily.sunrise[0])
    divSunrise.innerHTML = tSunrise.getHours() + ':' + tSunrise.getMinutes() + '<br>' 
        + '<img src = "icons/weather/sunrise.png" width = 32><br>'

    const divSunset = document.createElement('div')
    divSunset.classList.add('weather-hour')
    let tSunset = new Date(data.daily.sunset[0])
    divSunset.innerHTML = tSunset.getHours() + ':' + tSunset.getMinutes()+ '<br>' 
        + '<img src = "icons/weather/sunset.png" width = 32><br>'

    const hoursNow = new Date().getHours()
    for (let i = 0; i < 24; i++) {
        const divHour = document.createElement('div')
        const time = new Date(data.hourly.time[i + hoursNow])
        divHour.classList.add('weather-hour')
        if (i === 0) {divHour.innerHTML = 'now<br>'} 
        else {divHour.innerHTML = time.getHours() + ':00<br>'}
        divHour.innerHTML += getImgCodeHTMLByWeatherCode(data.hourly.weathercode[i + hoursNow], 32) + '<br>'
            + Math.round(data.hourly.temperature_2m[i + hoursNow]) + '<sup>o</sup>'
        parentElement.appendChild(divHour)
        if ((tSunrise.getHours() >= time.getHours()) && (tSunrise.getHours() < (time.getHours() + 1))) {
            divSunrise.innerHTML += Math.round(data.hourly.temperature_2m[i + hoursNow]) + '<sup>o</sup>'
            parentElement.appendChild(divSunrise)
        }
        if ((tSunset.getHours() >= time.getHours()) && (tSunset.getHours() < (time.getHours() + 1))) {
            divSunset.innerHTML += Math.round(data.hourly.temperature_2m[i + hoursNow]) + '<sup>o</sup>'
            parentElement.appendChild(divSunset)
        }
    }
}

function forecastFor7days(data) {
    const parentElement = document.getElementById('forecast-for-7-days')
    parentElement.innerHTML = ''
    for (let i = 0; i < 7; i++) {
        // main div
        const divDay = document.createElement('div')
        divDay.classList.add('weather-day')
        // 1 div containing name of the day
        const divDay1Day = document.createElement('div')
        divDay1Day.classList.add('align-left', 'inline-block')
        divDay1Day.style.width = '60px'
        // 2 div containing picture of weather
        const divDay2Pic = document.createElement('div')
        divDay2Pic.classList.add('align-left', 'inline-block')
        divDay2Pic.style.width = '40px'
        // 3 div containing min temperature
        const divDay3MinT = document.createElement('div')
        divDay3MinT.classList.add('align-center', 'inline-block')
        divDay3MinT.width = '30px'
        // 4 div containing temperature bar
        const divDay4Bar = document.createElement('div')
        divDay4Bar.classList.add('progress', 'inline-block', 'align-center')
        divDay4Bar.style.width = '100px'
        divDay4Bar.style.margin = '0 10px'
        // 5 div containing max temperature
        const divDay5MaxT = document.createElement('div')
        divDay5MaxT.classList.add('align-center', 'inline-block')
        divDay5MaxT.style.width = '30px'
        // divDay1Day
        if (i != 0) {
            divDay1Day.innerHTML = getDayOfWeek(new Date(data.daily.time[i]))
        } else { divDay1Day.innerHTML = 'today'}
        // divDay2Pic
        divDay2Pic.innerHTML = getImgCodeHTMLByWeatherCode(data.daily.weathercode[i], 16)
        // divDay3MinT
        divDay3MinT.innerHTML = Math.round(data.daily.temperature_2m_min[i]) + '<sup>o</sup>'
        // divDay4Bar
        const maxT = Math.round(Math.max(...data.daily.temperature_2m_max))
        const minT = Math.round(Math.min(...data.daily.temperature_2m_min))
        const per1Deg = 100 / (maxT - minT)
        let leftDifference = Math.round(data.daily.temperature_2m_min[i] - minT)
        let rightDifference = Math.round(maxT - data.daily.temperature_2m_max[i])
        if (leftDifference > 0) {
            const progressLeft = document.createElement('div')
            progressLeft.classList.add('progress1')
            progressLeft.style.width = Math.round(per1Deg * leftDifference) + 'px'
            divDay4Bar.appendChild(progressLeft)
        }
        if (rightDifference > 0) {
            const progressRight = document.createElement('div')
            progressRight.classList.add('progress2')
            progressRight.style.width = Math.round(per1Deg * rightDifference) + 'px'
            progressRight.style.left = 100 - (Math.round(rightDifference * per1Deg)) + 'px'
            divDay4Bar.appendChild(progressRight)
        }
        // divDay5MaxT
        divDay5MaxT.innerHTML = Math.round(data.daily.temperature_2m_max[i]) + '<sup>o</sup>'
        
        // divDay construct
        divDay.appendChild(divDay1Day)
        divDay.appendChild(divDay2Pic)
        divDay.appendChild(divDay3MinT)
        divDay.appendChild(divDay4Bar)
        divDay.appendChild(divDay5MaxT)
        parentElement.appendChild(divDay)
    }
}

function decodeWeatherCode(code) {
    switch(code) {
        case 0:
            return 'Clear sky'
            break
        case 1:
            return 'Mainly clear'
            break
        case 2:
            return 'Partly cloudy'
            break
        case 3:
            return 'Overcast'
            break
        case 45:
            return 'Fog'
            break
        case 48:
            return 'Depositing rime fog'
            break
        case 51:
            return 'Light drizzle'
            break
        case 53:
            return 'Moderate drizzle'
            break
        case 55:
            return 'Dense intensity drizzle'
            break
        case 56:
            return 'Light freezing drizzle'
            break
        case 57:
            return 'Dense intensity freezing drizzle'
            break
        case 61:
            return 'Slight rain'
            break
        case 63:
            return 'Moderate rain'
            break
        case 65: 
            return 'Heavy intensity rain'
            break
        case 66:
            return 'Light freezing rain'
            break
        case 67:
            return 'Heavy intensity freezing rain'
            break
        case 71:
            return 'Slight snow fall'
            break
        case 73:
            return 'Moderate snow fall'
            break
        case 75:
            return 'Heavy intensity snow fall'
            break
        case 80:
            return 'Rain showers: slight'
            break
        case 81:
            return 'Rain showers: moderate'
            break
        case 82:
            return 'Rain showers: violent'
            break
        case 85:
            return 'Snow showers: slight'
            break
        case 86:
            return 'Snow showers: heavy'
            break
        case 95:
            return 'Thunderstorm: slight or moderate'
            break
        case 96:
            return 'Thunderstorm with slight hail'
            break
        case 99:
            return 'Thunderstorm with heavy hail'
            break
        default:
            return 'Normal weather'
    }
}

function putPicByWeather(weatherCode, picId, imgWidth = 64) {
    let imgSrc = ''
    
    if ((weatherCode > 0) && (weatherCode < 3)) {
        imgSrc = 'icons/weather/cloudy.png'
    } else if (weatherCode === 3) {
        imgSrc = 'icons/weather/overcast.png'
    } else if ((weatherCode >= 45) && (weatherCode <= 48)) {
        imgSrc = 'icons/weather/fog.png'
    } else if ((weatherCode >= 51) && (weatherCode <= 57)) {
        imgSrc = 'icons/weather/drizzle.png'
    } else if ((weatherCode >= 61) && (weatherCode <= 67)) {
        imgSrc = 'icons/weather/rain.png'
    } else if ((weatherCode >= 71) && (weatherCode <= 75)) {
        imgSrc = 'icons/weather/snow.png'
    } else if ((weatherCode >= 80) && (weatherCode <= 82)) {
        imgSrc = 'icons/weather/rain.png' 
    } else if ((weatherCode >= 85) && (weatherCode <= 86)) {
        imgSrc = 'icons/weather/snow.png'
    } else if ((weatherCode >= 95) && (weatherCode <= 99)) {
        imgSrc = 'icons/weather/thunderstorm.png'
    } else {imgSrc = 'icons/weather/sun.png'}
    
    document.getElementById(picId).src = imgSrc
    document.getElementById(picId).width = imgWidth
}

function getImgCodeHTMLByWeatherCode(weatherCode, width = 32) {
    let imgElement = '<img '
    imgSrc = ''

    if ((weatherCode > 0) && (weatherCode < 3)) {
        imgSrc += 'icons/weather/cloudy.png'
    } else if (weatherCode === 3) {
        imgSrc += 'icons/weather/overcast.png'
    } else if ((weatherCode >= 45) && (weatherCode <= 48)) {
        imgSrc += 'icons/weather/fog.png'
    } else if ((weatherCode >= 51) && (weatherCode <= 57)) {
        imgSrc += 'icons/weather/drizzle.png'
    } else if ((weatherCode >= 61) && (weatherCode <= 67)) {
        imgSrc = 'icons/weather/rain.png'
    } else if ((weatherCode >= 71) && (weatherCode <= 75)) {
        imgSrc = 'icons/weather/snow.png'
    } else if ((weatherCode >= 80) && (weatherCode <= 82)) {
        imgSrc = 'icons/weather/rain.png' 
    } else if ((weatherCode >= 85) && (weatherCode <= 86)) {
        imgSrc = 'icons/weather/snow.png'
    } else if ((weatherCode >= 95) && (weatherCode <= 99)) {
        imgSrc += 'icons/weather/thunderstorm.png'
    } else {imgSrc += 'icons/weather/sun.png'}

    imgElement += 'src = "' + imgSrc + '" width = ' + width + '>'
    return imgElement
}

function getDayOfWeek(date) {
    const day = date.getDay()
    const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    return week[day]
}

// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: parseFloat(latitude), lng: parseFloat(longitude) }
    console.log(uluru)
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: uluru,
    })
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    })
}

// window.initMap = initMap 

function searchWeatherFromAddress() {
    const searchLocation = document.getElementById('search')
    if (searchLocation.value != '') {
        sendRequest('GET', latLonRequestURL(searchLocation.value))
            .then((data) => {
                searchLocation.value = ''
                console.log(data)
                latitude = data.results[0].geometry.location.lat
                longitude = data.results[0].geometry.location.lng
                // console.log('lat: ', latitude, 'lon: ', longitude)
                const city = data.results[0].address_components[0].short_name
                const country = data.results[0].address_components[data.results[0].address_components.length - 2].short_name
                getWeatherByLocation(city, country)
                initMap()
            })  
            .catch((err) => {console.error(err)})    
    }
}

// starting point
searchWeatherFromAddress()
