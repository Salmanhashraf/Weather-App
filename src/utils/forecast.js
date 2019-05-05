const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d464992133e47c9275ada491a4832922/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    request({url, json: true}, (error, {body}) => { //destructuring response to just include body //before (error, response) => {} and everytime response was used it would be response.body.etc... now just body.etc...
        if(error) {
            callback ('Unable to connect to reach server', undefined);
        } else if(body.error) {
            callback('Unable to find the given coordinates', undefined);
        } else {
            callback(undefined, {
                summary: body.daily.summary,
                tempHigh: body.daily.data[0].temperatureHigh,
                tempLow: body.daily.data[0].temperatureLow
            });
        }
    });
}

module.exports = forecast;