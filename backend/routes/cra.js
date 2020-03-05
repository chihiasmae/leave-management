const express = require('express');
const config = require('../config');

const errorDbHandler = require('../middleware/erreur-db');

const Cra = require('../models/Cra');

const router = express.Router();

const chekAuth = require('../middleware/check-auth')
var name;
var pos;
var d;
var dup = false;
var annee;
var mois;
var date;
var salarier;
router.route('/getAllCraa').get(async (req, res) => {
  try {

    const result1 = await Cra.query().select('date').orderBy('date', 'desc').first();
    if (result1 != undefined) {
      date = new Date(result1.date);
      annee = date.getFullYear();

      mois = date.getMonth() + 1;

      var x = annee + "-" + mois + "-01";
      x = new Date(x);
    }
    else {
      x = new Date();
    }
    const result = await Cra.query().where('date', '>=', x).orderBy('position');
    res.status(201).json(result);
  }

  catch (err) {
    errorDbHandler.sendErrorHttp(err, res);
  }

});
router.route('/getAllDate').get(async (req, res) => {
  try {




  } catch (err) {
    errorDbHandler.sendErrorHttp(err, res);
  }
});
router.route('/getSalarier').post(async (req, res) => {
  salarier = req.body.data;

});
router.route('/addCra').post(async (req, res) => {
  if (dup == false) {

    await Cra.query().insert({
      date: req.body.data.date,
      fiche: req.body.data.fiche,
      projet: req.body.data.projet,
      action: req.body.data.Taction,
      commentaire: req.body.data.commentaire,
      charge: req.body.data.charge,
      position: req.body.data.position,
      salarie: req.body.data.salarie,
      dateString: req.body.data.dateString,
    });
    console.log('Cra creé normal');

  }
  else {
    await Cra.query().increment('position', 1).where('position', '>=', pos);

    await Cra.query().insert({
      date: req.body.data.date,
      fiche: req.body.data.fiche,
      projet: req.body.data.projet,
      action: req.body.data.Taction,
      commentaire: req.body.data.commentaire,
      charge: req.body.data.charge,
      position: req.body.data.position,
      dateString: req.body.data.dateString,
      salarie: req.body.data.salarie,
    });
    console.log('Cra creé ');
    dup = false;
  }


  res.status(201).json('test');

});
router.route('/dupliquer').post(async (req, res) => {
  dup = true;

  pos = req.body.data;



  res.status(201).json('test');

});
router.route('/updateCra').post(async (req, res) => {

  var pos = req.body.data.position;

  await Cra.query().update({
    date: req.body.data.date,
    fiche: req.body.data.fiche,
    projet: req.body.data.projet,
    action: req.body.data.Taction,
    commentaire: req.body.data.commentaire,
    charge: req.body.data.charge,
    dateString: req.body.data.dateString,
  }).where('position', pos).andWhere('salarie', req.body.data.salarie)

  console.log('Cra modifié');
});

router.route('/getCrabyName').get(async (req, res) => {
  try {

    const result = await Cra.query().where('salarie', name).orderBy('position');


    res.status(201).json(result);
  } catch (err) {
    errorDbHandler.sendErrorHttp(err, res);
  }
});

router.route('/sendName').post(async (req, res) => {

  name = req.body.data;
});

router.route('/suppCra').post(async (req, res) => {


  await Cra.query().where('id', req.body.id).del();
  await Cra.query().decrement('position', 1).where('position', '>', req.body.position);
  // name=req.body.data;
});


router.route('/group').get(async (req, res) => {
  try {

    const result = await Cra.query().where('salarie', salarier).sum('charge as sum').select('dateString').groupBy('dateString');
    res.status(201).json(result);
  }

  catch (err) {
    errorDbHandler.sendErrorHttp(err, res);
  }

});





module.exports = router;