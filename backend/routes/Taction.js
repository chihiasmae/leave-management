const express = require('express');
const config = require('../config');

const errorDbHandler = require('../middleware/erreur-db');

const Taction = require('../models/Taction');

const router = express.Router();

router.get('/getAllTaction', async (req, res, next) => {
  try {
   
    const result = await Taction.query();
    res.status(201).json(result);
  } catch (err) {
    errorDbHandler.sendErrorHttp(err, res);
  }
})

module.exports = router;