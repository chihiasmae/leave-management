const express = require('express');
const config = require('../config');

const errorDbHandler = require('../middleware/erreur-db');

const jour = require('../models/jour');

const router = express.Router();

router.get('/getAlljour', async (req, res, next) => {
  try {
  
 
    const result = await jour.query();
    res.status(201).json(result);
  } catch (err) {
    errorDbHandler.sendErrorHttp(err, res);
  }
})

module.exports = router;