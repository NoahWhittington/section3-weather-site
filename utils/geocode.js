const request = require('postman-request')

const geoCode = (address, callback) =>{
    const URIgeo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWVkaXVtZHViYiIsImEiOiJja2FycWFnOTUwcDN0MnFwbG14bnc2a201In0.nyzBrTAddkWN7R3Rz4eIag&limit=1`
    request({url: URIgeo, json: true}, (err, {body}) => {
        if(err) {
            callback('Unable to connect to location services', undefined);
        } else if(body.message) {
            callback(`Error: ${data.body.message}. Try another search`, undefined);
        } else if(body.features[0] === undefined) {
            callback("Error: information provided doesn't have any results", undefined)
        } else {
            callback( undefined, 
                {
                    message: `Place: ${body.features[0].place_name}-- lat: ${body.features[0].center[1]} lon: ${body.features[0].center[0]}`,
                    latlon: `${body.features[0].center[1]},${body.features[0].center[0]}`
                });
        };
    });
};

module.exports = geoCode;
