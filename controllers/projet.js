const projets =require('../models/projet');
const { validationResult } = require('express-validator');

//afichage de tous les projets
exports.getAllprojets= async(req,res,next)=>{
    try {
       const [allprojets]=  await projets.fetchAll() ;
       res.status(200).json(allprojets);
    
    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);
    }
    };

    //afichage de projets en cours de Travaille
exports.getprojets= async(req,res,next)=>{
    try {
       const [projet]=  await projets.Select() ;
       res.status(200).json(projet);
    
    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);
    }
    };

    //insertion des projets
    exports.registerP = async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return;
      const nom_P = req.body.nom_P;
      const Pole = req.body.Pole;
      const nb_t=req.body.nb_t;
      const date_d = req.body.date_d;
      const date_f=req.body.date_f;
      const id_p = req.body.id_P;
      const etat= req.body.etat;

      try {
       
        const ProjetsDetails = {
          nom_P:nom_P,
          Pole:Pole,
          nb_taches:nb_t,
          date_debut:date_d,
          date_fin:date_f,
          id_P:id_p,
          etat:etat,
        };
        //console.log(ProjetsDetails);
        const result = await projets.save(ProjetsDetails);
                res.status(201).json({ message: 'Projets Ajouter!' });
      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
    }; 
    


//Update de projet
exports.putprojets= async(req,res,next)=>{
   const errors = validationResult(req);
      if (!errors.isEmpty()) return;
      const nom_P = req.body.nom_P;
      const Pole = req.body.Pole;
      const nb_t=req.body.nb_taches;
      const date_d = req.body.date_debut;
      const date_f=req.body.date_fin;
      const etat= req.body.etat;
      const id_P = req.body.id_P;

         try {
      const ProjetsDetails = {
         nom_P:nom_P,
         Pole:Pole,
         nb_taches:nb_t,
         date_debut:date_d,
         date_fin:date_f,
         etat:etat,
       };
       const putprojets=await projets.update(id_P,ProjetsDetails) ;
       
       res.status(201).json(putprojets);
      
if (ProjetsDetails.etat=="Done"){
   const result = await projets.saveArchive(ProjetsDetails);
   const deleteprojet=await projets.delete(id_P) ;
}
    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);
    }
    };

//Delete de projet
exports.deleteprojets= async(req,res,next)=>{
    try {
       const deleteprojet=await projets.delete(req.params.id_P) ;
       res.status(201).json(deleteprojet);
    
    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);
    }
    };
 //Recherche Nom_p
 exports.findNomP=async(req,res,next)=>{
    try{
       const findNomP=await projets.findNomP(req.params.nom_P);
       res.status(201).json(findNomP);
    }catch(err){
       if(!err.statusCode){
          err.statusCode=500;
       } next(err);
    }
  
 }   