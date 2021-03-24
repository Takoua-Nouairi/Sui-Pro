const express = require('express');

const projetsController = require('../controllers/projet');
const { body } = require('express-validator');
const projets= require('../controllers/projet');

const router = express.Router();

router.get('/getAllprojets', projetsController.getAllprojets);
router.get('/getprojets', projetsController.getprojets);

router.post(
    '/registerP',
    [
      body('nom_P').trim().not().isEmpty(),
      body('Pole').trim().not().isEmpty(),
      body('nb_t').trim().not().isEmpty(),
      body('date_d').trim().not().isEmpty(),
      body('date_f').trim().not().isEmpty(),
      body('etat').trim().not().isEmpty(),

    ],
    projets.registerP 
  );

router.put('/putprojets',
 projetsController.putprojets);

router.delete('/deleteprojets/:id_P', projetsController.deleteprojets);
router.get('/:nom_P', projetsController.findNomP);

module.exports = router;
 