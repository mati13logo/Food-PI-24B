const express = require('express')
const router = express.Router()
const { Diet } = require('../db');

    const dietTypesDb=["gluten free","ketogenic","vegetarian","lacto vegetarian","ovo vegetarian","lacto ovo vegetarian","vegan","pescetarian","paleolithic","primal","fodmap friendly","whole 30","dairy free"]

    router.get("/", async(req,res,next)=>{
     
        try{
            
            dietTypesDb.forEach(el =>{
                Diet.findOrCreate({
                    where:{
                        name:el
                    }
                })
            });
            
            let typesDiet = await Diet.findAll();
            
            res.json(typesDiet);
        }catch(error){
            next(error); 
        }
    });

module.exports = router