const user = require('../models/liste_coequipiers');
const { validationResult } = require('express-validator');
//affichage de tous les co-equipiers
exports.getAllcoequipiers= async(req,res,next)=>{
    try {
       const [allco]=  await user.findCo() ;
       res.status(200).json(allco);
    
    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);
    }
   }
   // Delete de co-equipiers
    exports.deleteCo= async(req,res,next)=>{
      const co= await user.find(req.params.id);
   
      const ListeCo = {
        
         nom:co[0][0].nom,
         prenom:co[0][0].prenom,
         email:co[0][0].email,
         numero:co[0][0].numero,
         role:co[0][0].role,
       };
        try {

         const result = await user.saveArchive(ListeCo);
         const deleteCo=await user.delete(req.params.id) ;
           res.status(201).json(deleteCo);
        
        } catch(err){  
           if (!err.statusCode){ 
               err.statusCode=500 ;
           }
           next(err);
        }

    }
//Update co-équipiers
exports.putco= async(req,res,next)=>{
   const errors = validationResult(req);
      if (!errors.isEmpty()) return;
      const email= req.body.email;
      const numero= req.body.numero;
      const id = req.body.id;

         try {
      const CoDetails = {
         email:email,
         numero:numero,
       };
       const putco=await user.update(id,CoDetails) ;
       
       res.status(201).json(putco);
       

    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);
    }
    };
