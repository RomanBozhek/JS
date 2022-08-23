requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../js',
        jquery: 'jquery'
    }
})

requirejs(['jquery', '../js/weather/weather-data', '../js/weather'])

