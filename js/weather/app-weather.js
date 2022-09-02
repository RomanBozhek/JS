requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../js',
        jquery: ['https://code.jquery.com/jquery-3.6.1.min', 'jquery'],
        underscore: ['https://underscorejs.org/underscore-min', 'underscore']
    }
})

requirejs(['jquery', 'underscore', 'app/weather/weather-data', 'app/weather/weather'])

