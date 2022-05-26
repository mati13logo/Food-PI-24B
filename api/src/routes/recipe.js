const e = require('express');
const express = require('express')
const router = express.Router()
require('dotenv').config();
const { Recipe, Diet } = require('../db');

router.post('/', async (req, res) => {

    try {
        const {
            name, 
            summary, 
            score, 
            healthScore, 
            diets,     
            image,  
            steps,
        } = req.body

        const recipeCreate = await Recipe.create({
            name,
            summary,
            score,
            healthScore,
            image,
            steps,
        })

        let dietDB = await Diet.findAll({
            where: { name: diets }
        })
        recipeCreate.addDiet(dietDB);
        res.send('exito');

    } catch (error) {
        res.status(400).send(error);
    }
})




module.exports = router;