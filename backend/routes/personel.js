const express = require('express');
const config = require('../config');

const errorDbHandler = require('../middleware/erreur-db');

const perspnnel = require('../models/persnnel');

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

router.route('/getAllPerso').get(async (req, res) => {
  console.log("personnel")
  try {
   
   

    const result = await perspnnel.query().orderBy('dated','desc');
    res.status(201).json(result);
  } catch (err) {
    errorDbHandler.sendErrorHttp(err, res);
  }
});
router.route('/getAllSum').get(async (req, res) => {
  try {
  
    const result = await perspnnel.query().where('demandeur',salarier).andWhere('TypeConge','Conge Paye').andWhere('dated','>=',x);
   
    res.status(201).json(result);
  } catch (err) {
    errorDbHandler.sendErrorHttp(err, res);
  }
});

router.route('/addPerso').post(async(req, res) => {
 console.log("coog",req.body);
  await perspnnel.query().insert({
    nom : req.body.data.nom,
    role : req.body.data.role,
    anneeNaissance : req.body.data.anneeNaissance,
    dated : req.body.data.dated, 
   fonction:req.body.data.fonction,
   ville:req.body.data.ville,
   email:req.body.data.email,
   tele:req.body.data.tele,
  motDePass:req.body.data.motDePass,
    });
   
 
  res.status(201).json('test');

});
router.route('/updateConge').post(async(req, res) =>{
  
var id=req.body.id;
    
     await Conge.query().findById(id).patch({
      etat : req.body.etat,
   
      })
  
      });

      router.route('/suppConge').post(async(req, res) =>{
      
       await perspnnel.query().where('id',req.body.id).del();
        
                });
    


module.exports = router;
