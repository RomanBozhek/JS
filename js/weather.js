let latitude = '0'
let longitude = '0'

let city = ''

let picImgSrc = []
picImgSrc[0] = 'icons/weather/sun.png'
picImgSrc[1] = 'icons/weather/cloudy.png'
picImgSrc[2] = 'icons/weather/cloudy.png'
picImgSrc[3] = 'icons/weather/overcast.png'
picImgSrc[45] = 'icons/weather/fog.png'
picImgSrc[46] = 'icons/weather/fog.png'
picImgSrc[47] = 'icons/weather/fog.png'
picImgSrc[48] = 'icons/weather/fog.png'
picImgSrc[51] = 'icons/weather/drizzle.png'
picImgSrc[52] = 'icons/weather/drizzle.png'
picImgSrc[53] = 'icons/weather/drizzle.png'
picImgSrc[54] = 'icons/weather/drizzle.png'
picImgSrc[55] = 'icons/weather/drizzle.png'
picImgSrc[56] = 'icons/weather/drizzle.png'
picImgSrc[57] = 'icons/weather/drizzle.png'
picImgSrc[61] = 'icons/weather/rain.png'
picImgSrc[62] = 'icons/weather/rain.png'
picImgSrc[63] = 'icons/weather/rain.png'
picImgSrc[64] = 'icons/weather/rain.png'
picImgSrc[65] = 'icons/weather/rain.png'
picImgSrc[66] = 'icons/weather/rain.png'
picImgSrc[67] = 'icons/weather/rain.png'
picImgSrc[71] = 'icons/weather/snow.png'
picImgSrc[72] = 'icons/weather/snow.png'
picImgSrc[73] = 'icons/weather/snow.png'
picImgSrc[74] = 'icons/weather/snow.png'
picImgSrc[75] = 'icons/weather/snow.png'
picImgSrc[80] = 'icons/weather/rain.png'
picImgSrc[81] = 'icons/weather/rain.png'
picImgSrc[82] = 'icons/weather/rain.png'
picImgSrc[85] = 'icons/weather/snow.png'
picImgSrc[86] = 'icons/weather/snow.png'
picImgSrc[95] = 'icons/weather/thunderstorm.png'
picImgSrc[96] = 'icons/weather/thunderstorm.png'
picImgSrc[97] = 'icons/weather/thunderstorm.png'
picImgSrc[98] = 'icons/weather/thunderstorm.png'
picImgSrc[99] = 'icons/weather/thunderstorm.png'

let weatherCodeStr = []
weatherCodeStr[0] = 'Clear sky'
weatherCodeStr[1] = 'Mainly clear'
weatherCodeStr[2] = 'Partly cloudy'
weatherCodeStr[3] = 'Overcast'
weatherCodeStr[45] = 'Fog'
weatherCodeStr[48] = 'Depositing rime fog'
weatherCodeStr[51] = 'Light drizzle'
weatherCodeStr[53] = 'Moderate drizzle'
weatherCodeStr[55] = 'Dense intensity drizzle'
weatherCodeStr[56] = 'Light freezing drizzle'
weatherCodeStr[57] = 'Dense intensity freezing drizzle'
weatherCodeStr[61] = 'Slight rain'
weatherCodeStr[63] = 'Moderate rain'
weatherCodeStr[65] = 'Heavy intensity rain'
weatherCodeStr[66] = 'Light freezing rain'
weatherCodeStr[67] = 'Heavy intensity freezing rain'
weatherCodeStr[71] = 'Slight snow fall'
weatherCodeStr[73] = 'Moderate snow fall'
weatherCodeStr[75] = 'Heavy intensity snow fall'
weatherCodeStr[80] = 'Rain showers: slight'
weatherCodeStr[81] = 'Rain showers: moderate'
weatherCodeStr[82] = 'Rain showers: violent'
weatherCodeStr[85] = 'Snow showers: slight'
weatherCodeStr[86] = 'Snow showers: heavy'
weatherCodeStr[95] = 'Thunderstorm: slight or moderate'
weatherCodeStr[96] = 'Thunderstorm with slight hail'
weatherCodeStr[99] = 'Thunderstorm with heavy hail'

document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {searchWeatherFromSearchBox()}
})

function makeRequestURLToGoogleMaps(locationName) {
    return 'https://maps.googleapis.com/maps/api/geocode/json?address=' 
            + locationName + '&key=AIzaSyA9R30QTxtTkp6xwqr0FL7Q4I2c20VatZs'
}

function makewRequestURLToWeatherServer() {
    return 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude 
        + '&hourly=temperature_2m,precipitation,rain,showers,weathercode&daily=' 
        + 'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=auto'
}

function sendRequestToServer(method, url) {
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

function changeElementById(id, newValue) {
    const element = document.getElementById(id)
    element.textContent = newValue
}

function changePicByWeather(weatherCode, picId, imgWidth = 64) {
    picture = document.getElementById(picId)
    picture.width = imgWidth
    picture.src = getImgSrcByWeatherCode(weatherCode)
}

function getImgSrcByWeatherCode(code) {
    if (picImgSrc[code] != '') {
        return picImgSrc[code]
    } else return 'icons/weather/sun.png'
}

function updateMap() {
    const location = { lat: parseFloat(latitude), lng: parseFloat(longitude) }
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: location,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        fullscreenControl: false,
    })
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    })
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
        divHour.innerHTML += '<img src=' + getImgSrcByWeatherCode(data.hourly.weathercode[i + hoursNow])
            + ' width=32>' + '<br>' + Math.round(data.hourly.temperature_2m[i + hoursNow]) + '<sup>o</sup>'
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

function getDayOfWeek(date) {
    const day = date.getDay()
    const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    return week[day]
}

function forecastFor7days(data) {
    const parentElement = document.getElementById('forecast-for-7-days')
    parentElement.innerHTML = ''
    for (let i = 0; i < 7; i++) {
        const divDay = document.createElement('div')
        divDay.classList.add('weather-day')
        const divDay1Day = document.createElement('div')
        divDay1Day.style.width = '60px'
        const divDay2Pic = document.createElement('div')
        divDay2Pic.style.width = '40px'
        const divDay3MinT = document.createElement('div')
        divDay3MinT.width = '30px'
        const divDay4Bar = document.createElement('div')
        divDay4Bar.classList.add('progress')
        divDay4Bar.style.width = '100px'
        divDay4Bar.style.margin = '0 10px'
        const divDay5MaxT = document.createElement('div')
        divDay5MaxT.style.width = '30px'
        
        if (i != 0) {
            divDay1Day.innerHTML = getDayOfWeek(new Date(data.daily.time[i]))
        } else { divDay1Day.innerHTML = 'today'}
        divDay2Pic.innerHTML = '<img src=' + getImgSrcByWeatherCode(data.daily.weathercode[i]) + ' width=16>'
        divDay3MinT.innerHTML = Math.round(data.daily.temperature_2m_min[i]) + '<sup>o</sup>'
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
        divDay5MaxT.innerHTML = Math.round(data.daily.temperature_2m_max[i]) + '<sup>o</sup>'
        
        divDay.appendChild(divDay1Day)
        divDay.appendChild(divDay2Pic)
        divDay.appendChild(divDay3MinT)
        divDay.appendChild(divDay4Bar)
        divDay.appendChild(divDay5MaxT)
        parentElement.appendChild(divDay)
    }
}

function updateWeatherInfo() {
    sendRequestToServer('GET', makewRequestURLToWeatherServer())
    .then((data) => {
        changeElementById('city-location', city)
        changeElementById('temperature-now', Math.round(data.hourly.temperature_2m[0]))
        changePicByWeather(data.hourly.weathercode[0], 'pic-weather-now', 64)
        changeElementById('max-temperature', Math.round(data.daily.temperature_2m_max[0]))
        changeElementById('min-temperature', Math.round(data.daily.temperature_2m_min[0]))
        updateMap()
        forecastFor24Hours(data)
        forecastFor7days(data)
    })
    .catch((error) => {console.error(error)})
}

function searchWeatherFromSearchBox() {
    const searchLocation = document.getElementById('search-input')
    if (searchLocation.value != '') {
        sendRequestToServer('GET', makeRequestURLToGoogleMaps(searchLocation.value))
            .then((data) => {
                searchLocation.value = ''
                latitude = data.results[0].geometry.location.lat
                longitude = data.results[0].geometry.location.lng
                city = data.results[0].address_components[0].short_name
                updateWeatherInfo()
            })  
            .catch((err) => {console.error(err)})    
    }
}

searchWeatherFromSearchBox()
