const express=require('express');
const authController=require('../controllers/auth');
const router=express.Router();
const User = require('../models/user');

const { body } = require('express-validator');


/*
router.get('/',authController.getAllUser);
router.post('/',authController.postUser);
router.put('/',authController.putUser);
router.delete('/:email',authController.deleteUser);
*/

router.post( '/signup', [
       body('email').isEmail().withMessage('Please enter a valid email.').custom(async (email) => {
          const user = await User.find(email);
          if (user[0].length > 0) {
            return Promise.reject('Email address already exist!');
          }
        })
        .normalizeEmail(),
      body('password').trim().isLength({ min: 7 }),
      body('numero').trim().isLength({ min: 8 }),
      body('role').trim().not().isEmpty(),
      body('nom').trim().not().isEmpty(),
      body('prenom').trim().not().isEmpty(),
    ],
    authController.signup
  );
 
  router.post('/login', authController.login);
module.exports=router;