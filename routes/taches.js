const express = require('express');
const { body } = require('express-validator');

const tachesController = require('../controllers/taches');

const router = express.Router();

router.get('/getAlltaches', tachesController.getAlltaches);
router.get('/gettaches', tachesController.gettaches);
router.post(
    '/registerT',
    [
      body('nom_t').trim().not().isEmpty(),
      body('nom_P').trim().not().isEmpty(),
      body('description').trim().not().isEmpty(),
      body('email').trim().not().isEmpty(),
      body('date_d').trim().not().isEmpty(),
      body('date_f').trim().not().isEmpty(),
    ],
    tachesController.registerT 
  );
  router.put('/puttache',
  tachesController.puttache);
  router.put('/putEtat',
  tachesController.putEtat);




router.put('/puttaches', tachesController.puttaches);

router.delete('/deletetaches/:id_t', tachesController.deletetaches);

module.exports = router;
