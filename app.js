const express = require('express');
const app = express();
const morgan = require('morgan');
const ping = require('ping');
const tcpp = require('tcp-ping');
const request = require('request');
const { tcpPingPort } = require("tcp-ping-port");
var ht = require('http-test');
const Latenz = require('latenz');

//Configuraciones
// app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

var port = process.env.PORT || 5000;
var host = process.env.HOST || 'localhost';

//Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Nuestro primer WS Get
app.get('/ping', (req, res) => {

  tcpp.probe(req.query.host, 80, function (err, available) {
    if (err) console.log(err)
    res.send({
      host: req.query.host,
      isAlive: available
    });
  });

  // request(req.query.host, function(error, response, body) {
  //   if (error) console.log(error)
  //   res.send({ alive: response })
  // })

  //   tcpPingPort(req.query.host).then(online => {
  //     res.send(online)
  // })

  // ht({
  //   name: 'http-test'
  // }).add(req.query.host).run()
  //   .then(function (result) {
  //     res.send(result)
  //   })
  //   .catch(function(err) {
  //     console.log(err)
  //     res.send({alive: false});
  //   })

});

//Iniciando el servidor
app.listen(port);