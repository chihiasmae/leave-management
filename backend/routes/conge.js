const express = require('express');
const config = require('../config');

const errorDbHandler = require('../middleware/erreur-db');

const Conge = require('../models/Conge');

const router = express.Router();
var salarier;
const chekAuth = require('../middleware/check-auth');
local=new Date();
var annee;
annee=local.getFullYear();
var x=annee+"-01-01";
router.route('/getSalarier').post(async(req, res) => {
  salarier=req.body.data;
  
 });

router.route('/getAllConge').get(async (req, res) => {
  try {
   
   

    const result = await Conge.query().orderBy('dated','desc');
    res.status(201).json(result);
  } catch (err) {
    errorDbHandler.sendErrorHttp(err, res);
  }
});
router.route('/getAllSum').get(async (req, res) => {
  try {
  
    const result = await Conge.query().where('demandeur',salarier).andWhere('TypeConge','Conge Paye').andWhere('dated','>=',x);
   
    res.status(201).json(result);
  } catch (err) {
    errorDbHandler.sendErrorHttp(err, res);
  }
});

router.route('/addConge').post(async(req, res) => {
 
  await Conge.query().insert({
    datedeb : req.body.data.dateDebut,
    datefin : req.body.data.dateFin,
    nbrJours : req.body.data.nbJours,
    dated : req.body.data.date_posted,
    etat : req.body.data.etat,
    TypeConge : req.body.data.type,
    demandeur:req.body.data.demandeur,
    motif:req.body.data.body,
    });
    console.log('Conge creé');
 
  res.status(201).json('test');

});

router.route('/updateConge').post(async(req, res) =>{
  
var id=req.body.id;
    
     await Conge.query().findById(id).patch({
      etat : req.body.etat,
   
      })
  
      });

      router.route('/suppConge').post(async(req, res) =>{
      
       await Conge.query().where('id',req.body.id).del();
        
                });
    


module.exports = router;
