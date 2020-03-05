const express = require('express');
const config = require('../config');

const errorDbHandler = require('../middleware/erreur-db');

const projet = require('../models/projet');

const router = express.Router();

router.get('/getAllProjet', async (req, res, next) => {
  try {
   
 
    const result = await projet.query();
    res.status(201).json(result);
  } catch (err) {
    errorDbHandler.sendErrorHttp(err, res);
  }
})

module.exports = router;