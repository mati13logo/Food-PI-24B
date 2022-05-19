const e = require('express');
const express = require('express')
const router = express.Router()
require('dotenv').config();
const { Recipe, Diet } = require('../db');

router.post('/', async (req, res) => {
    
    try{
        const{
            name, 
            summary,
            score,
            healthScore, 
            diets ,  
            image,   
            steps,
        } = req.body
        // console.log(req.body.diets)

        const recipeCreate = await Recipe.create({ 
            name,
            summary,
            score,
            healthScore,  
            image,     
            steps,   
        })
        
        let dietDB = await Diet.findAll({  
            where: {name: diets}
        })
            // console.log(recipeCreate)
        // if (!name) return res.status(400).send({errors: 'Debe ingresar el name para la receta'});
        // if (!summary) return res.status(400).send({errors: 'Debe ingresar un summary del receta'});
        // console.log(recipeCreate);
        // console.log(dietDB);
        
        recipeCreate.addDiet(dietDB);
        res.send('exito');

    }catch(error){
        res.status(400).send(error);
    }
})
 



module.exports = router;