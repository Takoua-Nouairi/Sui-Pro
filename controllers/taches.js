const express=require("express");
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');
const {  SelectIDP } = require("../models/taches");
const taches = require('../models/taches');
const user = require('../models/user');
const projet= require('../models/projet');
//afichage de tous les taches
exports.getAlltaches= async(req,res,next)=>{
    try {
       const [alltaches]=  await taches.fetchAll() ;
       res.status(200).json(alltaches);
    
    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);
    }
   
    };

    //afichage de taches en cours de Travaille
exports.gettaches= async(req,res,next)=>{
    try {
       const [tache]=  await taches.Select() ;
       res.status(200).json(tache);
    
    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);
    }
    
    };
   
    //insertion des taches
    exports.registerT = async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return;
      const nom_t = req.body.nom_t;
      const email = req.body.email;
      const nom_p=req.body.nom_P;
      const date_d = req.body.date_d;
      const date_f=req.body.date_f;
      const description = req.body.description;
      const etat=req.body.etat;

      try {
         
   const P= await projet.find(nom_p);

   const co=await  user.find(email);
  
        const TachesDetails = {
          nom_t:nom_t,
          description:description,
          date_debut:date_d,
          date_fin:date_f,
          id_P:P[0][0].id_P,
          id_co:co[0][0].id,
          etat:etat,
        }

        console.log(TachesDetails);
        const result = await taches.save(TachesDetails);
                res.status(201).json({ message: 'Tache Ajouter!' });
      } catch (err) { 
        if (!err.statusCode) { 
          err.statusCode = 500;
        }
        next(err);
      }
     // console.log(result.value);
    }; 

//Update de taches
exports.puttaches= async(req,res,next)=>{
    try {
       const puttaches=await taches.update(req.body.id_t,req.body.nom_t,req.body.date_debut,req.body.date_fin,req.body.id_P,req.body.id_co) ;
       res.status(201).json(puttaches);
    
    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);
    }
    };

//Delete de projet
exports.deletetaches= async(req,res,next)=>{

    try {
       
       const deletetaches=await taches.delete(req.params.id_t) ;
       res.status(201).json(deletetaches);
    
    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);
    }
    console.log(req.params.id_t); 
    };

    //Update etat
exports.putEtat= async(req,res,next)=>{
   const errors = validationResult(req);
      if (!errors.isEmpty()) return;
      const id_t = req.body.id_t;
      const etat= req.body.etat;
      const nom_t=req.body.nom_t;
      const description=req.body.description;
      const date_d=req.body.date_debut;
      const date_f=req.body.date_fin;
      const nom_p=req.body.nom_P;
      const email=req.body.email;
      const P= await projet.find(nom_p);

      const co=await  user.find(email);
         try {
      const TachesDetails = {
         nom_t:nom_t,
         description:description,
         date_debut:date_d,
         date_fin:date_f,
         id_P:P[0][0].id_P,
         id_co:co[0][0].id,
         etat:etat,
       };
       
       const putEtat=await taches.updateE(id_t,etat) ;
       res.status(201).json(putEtat);
       console.log(email);
       
       if (etat=="Done"){
         const result = await taches.saveArchive(TachesDetails);
         const deletetaches=await taches.delete(id_t) ;
        
      }

    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);
    }
    };
    //Update tache
exports.puttache= async(req,res,next)=>{
   const errors = validationResult(req);
      if (!errors.isEmpty()) return;
      const nom_t = req.body.nom_t;
      const description = req.body.description;
      const date_debut=req.body.date_debut;
      const date_fin = req.body.date_fin;
      const nom_p=req.body.nom_p;
      const email= req.body.email;
      const etat = req.body.etat;
      const id_t = req.body.id_t;
    const P= await projet.find(nom_p);
   const co=await  user.find(email);  
         try {
      const TacheDetails = {  
         id_t:id_t,
         nom_t :nom_t,
       description:description,
      date_debut:date_debut,
       date_fin : date_fin,
      id_p:P[0][0].id_P,
      id_co:co[0][0].id,
      etat : etat,
       };
       console.log(TacheDetails);
       const puttache=await taches.update(id_t,TacheDetails) ;

       if (TacheDetails.etat=="Done"){
         const result = await taches.saveArchive(TachesDetails);
         const deletetaches=await taches.delete(id_t) ;
      }
       res.status(201).json(puttache);
    } catch(err){
       if (!err.statusCode){
           err.statusCode=500 ;
       }
       next(err);  
    }
    };