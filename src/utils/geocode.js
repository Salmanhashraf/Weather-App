const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FsbHU0MTYiLCJhIjoiY2p1c28wdXBjMHRtdDQ1bzhpY2xjaTdwbyJ9.9D33EUBpaU7iJLRp4gnFfg&limit=1'

    request({url: url, json: true}, (error, {body}) => { //destructure body off of response
        if(error) {
            callback('Unable to connect to location services', undefined); //the value of error in the callback is now that string so the user can do what they want with it
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {// When defining a function, use callback to define the values of the arguments that will be passed into the callback function when the function is called.
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}


module.exports = geocode;