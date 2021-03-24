
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const User=require('../models/user');

/*
exports.getAllUser= async(req,res,next)=>{
try {
   const [allUser]=  await user.fetchAll() ;
   res.status(200).json(allUser);

} catch(err){
   if (!err.statusCode){
       err.statusCode=500 ;
   }
   next(err);
}
};
exports.postUser= async(req,res,next)=>{
   try {
      const postReponse=await user.post(req.body.email,req.body.password) ;
      res.status(201).json(postReponse);
   
   } catch(err){
      if (!err.statusCode){
          err.statusCode=500 ;
      }
      next(err);
   }
   };

   exports.putUser= async(req,res,next)=>{
      try {
         const putReponse=await user.update(req.body.email,req.body.password) ;
         res.status(201).json(putReponse);
      
      } catch(err){
         if (!err.statusCode){
             err.statusCode=500 ;
         }
         next(err);
      }
      };
   
      exports.deleteUser= async(req,res,next)=>{
         try {
            const deleteReponse=await user.delete(req.body.email) ;
            res.status(201).json(deleteReponse);
         
         } catch(err){
            if (!err.statusCode){
                err.statusCode=500 ;
            }
            next(err);
         }
         };*/
         exports.signup = async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return;
            const email = req.body.email;
            const password = req.body.password;
            const role=req.body.role;
            const nom=req.body.nom;
            const prenom=req.body.prenom;
            const numero=req.body.numero;
            try {
              //const hashedPassword = await bcrypt.hash(password, 12);
              const userDetails = {
                email: email,
                password: password,
                role:role,
                nom: nom,
                prenom: prenom,
                numero:numero,

              };
              const result = await User.save(userDetails);
              res.status(201).json({ message: 'User registered!' });
            } catch (err) {
              if (!err.statusCode) {
                err.statusCode = 500;
              }
              next(err);
            }
          }; 
          
      
          exports.login = async (req, res, next) => {
            const email = req.body.email;
            const password = req.body.password;
            try {
              const user = await User.find(email);
              const user_role = await User.findR(email);
             // console.log(user_role[0][0].role);
              if (user[0].length !== 1 )  {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
              }
           
              const storedUser = user[0][0];
              const user_password = await User.findP(password);
              
           
              if (user_password[0].length !== 1)   {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error ;
              res.status(401).json({ message  : "wrong password" , status:res.statusCode});
              }
              const token = jwt.sign(
                {
                  email: storedUser.email,
                  userId: storedUser.id,
                  role:user_role[0][0].role,
                },

                'secretfortoken',
                { expiresIn: '1h' }
              );
              res.status(200).json({ token: token, userId: storedUser.id , role : storedUser.role});
        
            } 
            catch (err) {
              if (!err.statusCode) {
                err.statusCode = 500;
              }
              next(err);
            }
          };    