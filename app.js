const express = require('express');
const app = express();
const morgan = require('morgan');
const ping = require('ping');

//Configuraciones
// app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

var port = process.env.PORT || 5000;
var host = process.env.HOST || 'localhost';

//Middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Nuestro primer WS Get
app.get('/ping', (req, res) => {

  (async function () {
    // const result = await ping.promise.probe(req.query.host, {
    //   timeout: 10
    // });

    ping.sys.probe(req.query.host, function (_alive) {

      res.json({ 'alive': _alive });
    });
  
  })();
});

//Iniciando el servidor
app.listen(port);
