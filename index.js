const fs          = require('fs'),
      express     = require('express'),
      app         = express(),
      httpProxy = require('http-proxy-middleware');

const API_SERVER = 'https://a.api.mapbox.com';

/* accept provider urls like:
https://fieldpapers-mapboxstudio-proxy.herokuapp.com/v10/mapbox.outdoors-v10/{Z}/{X}/{Y}.png?access_token=pk.eyJ1IjoidGhhZGsiLCJhIjoidWlIX1J4OCJ9.BZnfrT_Jdc8aSQyWV8fL7g
which refers to:
mapbox://styles/mapbox/outdoors-v10
and
https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGhhZGsiLCJhIjoidWlIX1J4OCJ9.BZnfrT_Jdc8aSQyWV8fL7g
*/

app.disable('x-powered-by');

// apply reverse proxy to heroku API
app.use('/', httpProxy({
    logLevel     : 'debug',
    target       : API_SERVER,
    changeOrigin : true,
    secure       : false,
    xfwd         : false,
    ignorePath: true,
    toProxy:  true,
    autoRewrite:  true,
    router: function (req) {
        if (req.path.indexOf('/v10/') >-1 ) {
          var myRegexp = /v10\/([a-zA-Z0-9\-\_]+)[\.\/]([a-zA-Z0-9\-\_]+)\/(\w+)\/(\w+)\/(\w+)(\.png|\.jpg)?/gi;
          var match = myRegexp.exec(req.path);
          console.log(req.path,req.query["access_token"],match)
        return `${API_SERVER}/styles/v1/${match[1]}/${match[2]}/tiles/256/${match[3]}/${match[4]}/${match[5]}?access_token=${req.query["access_token"]}`
      }
    },


}));

// Define the port.
const port = process.env.PORT || 4000;

// Start the HTTP server.
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
