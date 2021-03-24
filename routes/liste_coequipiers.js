const express = require('express');
const coequipiersController = require('../controllers/liste_coequipiers');
const router = express.Router();


router.get('/getAllcoequipiers', coequipiersController.getAllcoequipiers);
router.delete('/deleteCo/:id',coequipiersController.deleteCo);
router.put('/putco',
coequipiersController.putco);
module.exports=router ;
