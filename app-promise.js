const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address);
var locationUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=%20AIzaSyCHE69XlL2DL9uWDu93x8Kfhgwc06E8-JE`;

axios.get(locationUrl).then((response)=>{
   if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address');
   }
   var lat = response.data.results[0].geometry.location.lat;
   var lng = response.data.results[0].geometry.location.lng;
   var weatherUrl= `https://api.darksky.net/forecast/c56ad11bfad179bd82914ccb451e01e0/${lat},${lng}`;
   console.log(response.data.results[0].formatted_address);
   return axios.get(weatherUrl);
}).then((response)=>{
   var temperature = response.data.currently.temperature;
   var apparentTemperature = response.data.currently.apparentTemperature;
   console.log(`temperature is ${temperature} & feels like ${apparentTemperature}`);
}).catch((e) => {
   if (e.code === 'ENOTFOUND'){
      console.log('Unable to connect to API servers');
   } else {
   console.log('Some error');
   }
});
