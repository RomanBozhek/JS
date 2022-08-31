requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../js',
        jquery: 'jquery',
        underscore: 'https://underscorejs.org/underscore-min'
    }
})

requirejs(['jquery', 'underscore', '../js/weather/weather-data', '../js/weather'])

