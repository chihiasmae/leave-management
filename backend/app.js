/**
 * @author MBE
 */
const config = require('./config');
const express = require('express');
const app = express();

const knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('./database/knexfile');

var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

const database = knex(knexConfig.development);

Model.knex(database);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(bodyParser.text({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
})

let queryTest = 'select 1+1 as result';
database.raw(queryTest).then(async r => {
  console.log('database: ' + config.clientDB + ', result: ', r[0]);
}).catch(err => {
  console.log(err);
});

/**
 * les routes
 */
const userRoutes = require("./routes/conge");
const perRoutes = require("./routes/personnel");
const craRoutes = require("./routes/cra");
const projetRoutes = require("./routes/projet");
const tactionRoutes = require("./routes/Taction");
const jourRoutes = require("./routes/jour");
const persoRoutes = require("./routes/personel");


////////////////////////////
app.use('/conge', userRoutes);
app.use('/per', perRoutes);
app.use('/cra', craRoutes);
app.use('/projet', projetRoutes);
app.use('/action', tactionRoutes);
app.use('/jour', jourRoutes);
app.use('/personel', persoRoutes);

module.exports = app;
