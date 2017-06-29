const Hapi = require('hapi');

const server = new Hapi.Server(process.env.PORT || 3000, '0.0.0.0');

server.register({
      register: require('h2o2')
}, function (err) {

      if (err) {
                console.log('Failed to load h2o2');
            }

      server.start(function (err) {

                console.log('Server started at: ' );
            });
});
server.route({
    method: 'GET',
    path: '/',
    handler: {
        proxy: {
            uri: 'https://some.upstream.service.com/that/has?what=you&want=todo'
        }
    }
});
