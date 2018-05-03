const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
   .options({
      a: {
         demand: true,
         alias: 'address',
         describe: 'Address to fetch weather for',
         string: true
         }
   })
   .help()
   .alias('help', 'h')
   .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
   if (errorMessage) {
      console.log(errorMessage);
   } else {
      console.log(results.address);
      weather.getTemperature(results.latitude, results.longitude, (errorMessage, weatherResults) => {
         if (errorMessage) {
            console.log(errorMessage);
         } else {
            console.log(`Its currently ${weatherResults.temperature} & feels like ${weatherResults.temperature}`);
         }
      });
   }
});
//c56ad11bfad179bd82914ccb451e01e0
