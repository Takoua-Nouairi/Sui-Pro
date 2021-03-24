const tacheD =require('../models/tache_done');


exports.getAlltacheD= async(req,res,next)=>{
    try {
       const [alltacheD]=  await tacheD.fetchAll() ;
       res.status(200).json(alltacheD);
    
    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);
    }
   }