const request = require('postman-request')

const weatherCall = (geocode, callback) => {
    const URI = `http://api.weatherstack.com/current?access_key=3fafe539fc3eccc57d3949c09d055cd8&query=${geocode}&units=f`
    request({url: URI, json: true}, (err, {body}) => {
        if(err){
            callback('unable to reach services')
        } else if(body.error) {
            callback('Error: Invalid location')
        } else {
            callback(undefined, `Currently in ${body.location.name} the weather is ${body.current.weather_descriptions[0]}. It is ${body.current.temperature}℉  and it feels like ${body.current.feelslike}℉  out`);
        }
    });
};

module.exports = weatherCall;