const express = require('express')
const router = express.Router()
const axios = require('axios');
require('dotenv').config();
const { Recipe, Diet } = require('../db');
const { ApiKey } = process.env;


const getApiInfo = async () => {

    try {
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ApiKey}&addRecipeInformation=true&number=100`)
        const apiInfo = await apiUrl.data.results.map(el => {
            return {
                name: el.title,
                id: el.id,
                vegetarian: el.vegetarian,
                summary: el.summary,
                image: el.image,
                score: el.spoonacularScore,
                healthScore: el.healthScore,
                types: el.dishTypes?.map(element => element),
                diets: el.diets?.map(element => element),
                steps: (el.analyzedInstructions[0] && el.analyzedInstructions[0].steps ? el.analyzedInstructions[0].steps.map(item => item.step).join(" \n") : '')
            }
        })
        return apiInfo;
    }
    catch (error) {
        return alert('No hay mas peticiones')
    }
};

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllRecipe = async () => {
    const apiInfo = await getApiInfo();
    // console.log(apiInfo)
    const dataInfo = await getDbInfo();
    // console.log(dataInfo)
    const infoTotal = apiInfo.concat(dataInfo)
    return infoTotal;
}



router.get('/', async (req, res) => {
    const name = req.query.name
    let recipeTotal = await getAllRecipe();
    if (name) {
        let recipeName = await recipeTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(404).send('No existe ninguna receta con ese nombre');

    } else {
        res.status(200).send(recipeTotal)
    }
})


router.get("/:id", async (req, res) => {
    const id = req.params.id
    let recipeTotal = await getAllRecipe();
    if (id) {
        let recipeId = await recipeTotal.filter(el => el.id == id)
        console.log(recipeId)
        recipeId.length ?
            res.status(200).json(recipeId) :
            res.status(404).send("No se encontro la receta")
    }
})


router.delete("/:id", async (req, res) => {
    try {

        const { id } = req.params;

        if (id) {
            await Recipe.destroy({
                where: {
                    id: id
                }
            })

            res.status(200).send('Eliminado con exito')
        }
    }
    catch (error) {

        res.status(404).send('Debe ingresar un Id o es incorrecto')
    }


})

router.put("/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const { name } = req.body;
        if (id) {
            await Recipe.update({
                name: name
            }, {
                where: {
                    id: id
                }
            })
            res.status(200).send('Nombre cambiado con exito')
        }
    }
    catch (error) {

        res.status(404).send('Debe ingresar un id o id incorrecto')
    }

})








module.exports = router
