/** @author Loïc Lemonsu */
/** @author Pierre Liaubet */
/** @author Philippe Roques-Geoffroy */

//// Packages pour lancer le serveur

// Utilisation de colors pour la mise en couleur dans le log
var colors = require('colors/safe');

// Utilisation de express pour publier l'API
var express = require('express');
var app = express();

// Configuration serveur mongodb
var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/android';
var options = {
  useNewUrlParser: true
};

mongoose.connect(url, options, function(error) {
  if (error) {
    console.log(error);
  }
  console.log(colors.yellow("Connexion réussie !"));
});

mongoose.set('debug', true);

var db = mongoose.connection;


// utilisation de bodyParser pour récupérer les données d'un POST par exemple
var bodyParser = require('body-parser');

// Configuration de BodyParser pour récupérer les données d'un POST
app.use(bodyParser.urlencoded({
  extended: true
}));

// Configuration de BodyParser pour l'envoi des images
app.use(bodyParser.json({
  limit: '50mb',
  type: 'application/json'
}));

//// Configuration Serveur

// Appelle du routeur définissant les routes dans le fichier routes/routes.js
var router = require("./routes/routes")

// Utilisation du routeur pour toutes les routes qui commencent par "/"
app.use('/', router);

// Port qui sera utilisé pour l'API REST
var port = 8080;
var addr = '0.0.0.0';

/**
 * lance le serveur sur l'adresse d'écoute et sur le port associé
 */
app.listen(port, addr);

console.log(colors.yellow('Go on localhost:' + port + ' !'));
