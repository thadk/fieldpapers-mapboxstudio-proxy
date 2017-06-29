const fs          = require('fs'),
      express     = require('express'),
      app         = express(),
      httpProxy = require('http-proxy-middleware');

// NOTE: not my real subdomain
const API_SERVER = 'https://a.api.mapbox.com';

//   /styles/v1/thadk/cj4fts6o83n4a2rnpnqi6uuk6/tiles/256/17/61618/63242@2x?access_token=pk.eyJ1IjoidGhhZGsiLCJhIjoidWlIX1J4OCJ9.BZnfrT_Jdc8aSQyWV8fL7g
// b.tiles.mapbox.com/v3/stamen.i808gmk6/17/61617/63244.png
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

/*app.all('*', function(req, res, next) {
    /*res.set({
        'www-version': `${packageJson.version}`,
        'X-Frame-Options': 'DENY',
        'Cache-control': 'no-store',
        'Pragma': 'no-cache',
        'Strict-Transport-Security': 'max-age=' + (365 * 24 * 60 * 60) // 365 days, in seconds
    });
    next();
});*/


// Define the port.
const port = process.env.PORT || 4000;

// Start the HTTP server.
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
