const projetsD =require('../models/projet_done');

//afichage de tous les projets Done
exports.getAllprojetsD= async(req,res,next)=>{
    try {
       const [allprojets]=  await projetsD.fetchAll() ;
       res.status(200).json(allprojets);
    
    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);
    }
    };