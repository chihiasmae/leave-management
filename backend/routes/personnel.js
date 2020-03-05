const express = require('express');
const config = require('../config');

const errorDbHandler = require('../middleware/erreur-db');

const personnel = require('../models/personnel');

const router = express.Router();

router.route('/getAllp').get(async (req, res) => {
  try {
   
   

    const result = await personnel.query();
    res.status(201).json(result);
  } catch (err) {
    errorDbHandler.sendErrorHttp(err, res);
  }
});
router.route('/addPersonnel').post(async(req, res) => {
  console.log('req.body', req.body);
  await personnel.query().insert({
   
    etat : req.body.data.etat,
    nbrJours: req.body.data.nbrJours,
    TypeConge: req.body.data.TypeConge,
    motif: req.body.data.motif,
    });
    console.log('employe creé');
 
  res.status(201).json('test');

});
router.route('/suppConge').post(async(req, res) =>{
      
  await Conge.query().where('id',req.body.id).del();
   
           });
module.exports = router;
