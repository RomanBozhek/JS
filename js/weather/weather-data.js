let weatherForecast = {
    latitude: '0',
    longitude: '0',
    city: '', 
    picImgSrc: [],
    weatherCodeStr: [],
    urlToGoogleMaps: '',
    urlToWeatherServer: ''
}

weatherForecast.picImgSrc[0] = 'icons/weather/sun.png'
weatherForecast.picImgSrc[1] = 'icons/weather/cloudy.png'
weatherForecast.picImgSrc[2] = 'icons/weather/cloudy.png'
weatherForecast.picImgSrc[3] = 'icons/weather/overcast.png'
weatherForecast.picImgSrc[45] = 'icons/weather/fog.png'
weatherForecast.picImgSrc[46] = 'icons/weather/fog.png'
weatherForecast.picImgSrc[47] = 'icons/weather/fog.png'
weatherForecast.picImgSrc[48] = 'icons/weather/fog.png'
weatherForecast.picImgSrc[51] = 'icons/weather/drizzle.png'
weatherForecast.picImgSrc[52] = 'icons/weather/drizzle.png'
weatherForecast.picImgSrc[53] = 'icons/weather/drizzle.png'
weatherForecast.picImgSrc[54] = 'icons/weather/drizzle.png'
weatherForecast.picImgSrc[55] = 'icons/weather/drizzle.png'
weatherForecast.picImgSrc[56] = 'icons/weather/drizzle.png'
weatherForecast.picImgSrc[57] = 'icons/weather/drizzle.png'
weatherForecast.picImgSrc[61] = 'icons/weather/rain.png'
weatherForecast.picImgSrc[62] = 'icons/weather/rain.png'
weatherForecast.picImgSrc[63] = 'icons/weather/rain.png'
weatherForecast.picImgSrc[64] = 'icons/weather/rain.png'
weatherForecast.picImgSrc[65] = 'icons/weather/rain.png'
weatherForecast.picImgSrc[66] = 'icons/weather/rain.png'
weatherForecast.picImgSrc[67] = 'icons/weather/rain.png'
weatherForecast.picImgSrc[71] = 'icons/weather/snow.png'
weatherForecast.picImgSrc[72] = 'icons/weather/snow.png'
weatherForecast.picImgSrc[73] = 'icons/weather/snow.png'
weatherForecast.picImgSrc[74] = 'icons/weather/snow.png'
weatherForecast.picImgSrc[75] = 'icons/weather/snow.png'
weatherForecast.picImgSrc[80] = 'icons/weather/rain.png'
weatherForecast.picImgSrc[81] = 'icons/weather/rain.png'
weatherForecast.picImgSrc[82] = 'icons/weather/rain.png'
weatherForecast.picImgSrc[85] = 'icons/weather/snow.png'
weatherForecast.picImgSrc[86] = 'icons/weather/snow.png'
weatherForecast.picImgSrc[95] = 'icons/weather/thunderstorm.png'
weatherForecast.picImgSrc[96] = 'icons/weather/thunderstorm.png'
weatherForecast.picImgSrc[97] = 'icons/weather/thunderstorm.png'
weatherForecast.picImgSrc[98] = 'icons/weather/thunderstorm.png'
weatherForecast.picImgSrc[99] = 'icons/weather/thunderstorm.png'

weatherForecast.weatherCodeStr[0] = 'Clear sky'
weatherForecast.weatherCodeStr[1] = 'Mainly clear'
weatherForecast.weatherCodeStr[2] = 'Partly cloudy'
weatherForecast.weatherCodeStr[3] = 'Overcast'
weatherForecast.weatherCodeStr[45] = 'Fog'
weatherForecast.weatherCodeStr[48] = 'Depositing rime fog'
weatherForecast.weatherCodeStr[51] = 'Light drizzle'
weatherForecast.weatherCodeStr[53] = 'Moderate drizzle'
weatherForecast.weatherCodeStr[55] = 'Dense intensity drizzle'
weatherForecast.weatherCodeStr[56] = 'Light freezing drizzle'
weatherForecast.weatherCodeStr[57] = 'Dense intensity freezing drizzle'
weatherForecast.weatherCodeStr[61] = 'Slight rain'
weatherForecast.weatherCodeStr[63] = 'Moderate rain'
weatherForecast.weatherCodeStr[65] = 'Heavy intensity rain'
weatherForecast.weatherCodeStr[66] = 'Light freezing rain'
weatherForecast.weatherCodeStr[67] = 'Heavy intensity freezing rain'
weatherForecast.weatherCodeStr[71] = 'Slight snow fall'
weatherForecast.weatherCodeStr[73] = 'Moderate snow fall'
weatherForecast.weatherCodeStr[75] = 'Heavy intensity snow fall'
weatherForecast.weatherCodeStr[80] = 'Rain showers: slight'
weatherForecast.weatherCodeStr[81] = 'Rain showers: moderate'
weatherForecast.weatherCodeStr[82] = 'Rain showers: violent'
weatherForecast.weatherCodeStr[85] = 'Snow showers: slight'
weatherForecast.weatherCodeStr[86] = 'Snow showers: heavy'
weatherForecast.weatherCodeStr[95] = 'Thunderstorm: slight or moderate'
weatherForecast.weatherCodeStr[96] = 'Thunderstorm with slight hail'
weatherForecast.weatherCodeStr[99] = 'Thunderstorm with heavy hail'