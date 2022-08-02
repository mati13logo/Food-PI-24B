const express = require('express')
const router = express.Router()
const axios = require('axios');
require('dotenv').config();
const { Recipe, Diet } = require('../db');
const { ApiKey } = process.env;


// const getApiInfo = async () => {

//     try {
//         const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ApiKey}&addRecipeInformation=true&number=100`)
//         const apiInfo = await apiUrl.data.results.map(el => {
//             return {
//                 name: el.title,
//                 id: el.id,
//                 vegetarian: el.vegetarian,
//                 summary: el.summary,
//                 image: el.image,
//                 score: el.spoonacularScore,
//                 healthScore: el.healthScore,
//                 types: el.dishTypes?.map(element => element),
//                 diets: el.diets?.map(element => element),
//                 steps: (el.analyzedInstructions[0] && el.analyzedInstructions[0].steps ? el.analyzedInstructions[0].steps.map(item => item.step).join(" \n") : '')
//             }
//         })
//         return apiInfo;
//     }
//     catch (error) {
//         return alert('No hay mas peticiones')
//     }
// };


const getApiInfo = async () => {
    try {

        let resp = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ApiKey}&addRecipeInformation=true&number=100`)
        .then(res => res.data.results)
        let apiInfo = resp?.map(el => {
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
        return apiInfo
    }
    catch (error) {
        alert('La api no tiene mas peticiones')
    }

}




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
    const dataInfo = await getDbInfo();
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

module.exports = router
