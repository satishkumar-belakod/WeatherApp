const request = require('request');

var getTemperature = (longitude, latitude , callback) => {
   request({
      url: `https://api.darksky.net/forecast/c56ad11bfad179bd82914ccb451e01e0/${longitude},${latitude}`,
      json: true
   }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
         callback(undefined, {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
         });
      } else {
         callback('Unable to fetch weather');
   }
})
};

module.exports.getTemperature = getTemperature;
