const express = require('express')
const router = express.Router()
const axios = require('axios');
require('dotenv').config();
const { Recipe, Diet } = require('../db');
const { ApiKey } = process.env;



const getApiInfo = async ()=>{ 

    try{  
        
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ApiKey}&addRecipeInformation=true&number=100`)
        // console.log(apiUrl)
        const apiInfo = await apiUrl.data.results.map(el=>{
            return{
                name: el.title, 
                id: el.id, 
                summary: el.summary, 
                image: el.image,
                score: el.spoonacularScore,
                healthScore: el.healthScore,
                types: el.dishTypes?.map(element => element),  
                diets: el.diets?.map(element => element), 
                steps: (el.analyzedInstructions[0] && el.analyzedInstructions[0].steps?el.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
    
            }
        }) 
        return apiInfo; 
    }
    catch(error){ 
        return []
    }
}; 

const getDbInfo = async()=>{
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through:{
                attributes:[],
            }
        }
    }) 
}
 
const getAllRecipe= async()=>{
    const apiInfo= await getApiInfo();
    // console.log(apiInfo)
    const dataInfo= await getDbInfo();
    // console.log(dataInfo)
    const infoTotal= apiInfo.concat(dataInfo)
    return infoTotal;
}

const getIdInfo = async(id)=>{
const recipeId = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${ApiKey}&includeNutrition=true`)
    const result = recipeId.data
    let obj = {
                name: result.title, 
                vegetarian: result.vegetarian,
                vegan: result.vegan,
                glutenFree: result.glutenFree,
                dairyFree: result.dairyFree, 
                image: result.image, 
                idApi: result.id, 
                score: result.spoonacularScore, 
                healthScore: result.healthScore, 
                diets: result.diets?.map(element => element),
                types: result.dishTypes?.map(element => element), 
                summary:result.summary, 
                steps: result.instructions
            }
            // console.log(obj)
            return obj
}

const getIdBdInfo = async(id)=>{
    return await Recipe.findByPk(id,{
        includes:{
            model: Diet,
            attributes: ['name'],
            through:{
                attributes:[]
            }
        }
    })
}

const getAllInfoId = async(id)=>{
    const apiInfo= getIdInfo(id)
    // .log(apiInfo)
    const dbInfo= getIdBdInfo(id)
    // console.log(dbInfo)
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal
}





router.get('/', async(req, res)=>{
    const name = req.query.name 
    let recipeTotal = await getAllRecipe();
    if(name){
        let recipeName = await recipeTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length ?
        res.status(200).send(recipeName):
        res.status(404).send('No existe ninguna receta con ese nombre');

    }else{
        res.status(200).send(recipeTotal)
    }
})

router.get("/:id", async(req,res,next)=>{
    const id = req.params.id
    let recipeTotal = await getAllRecipe();
    if(id){
        let recipeId = await recipeTotal.filter(el => el.id == id)
        console.log(recipeId)
        recipeId.length?
        res.status(200).json(recipeId):
        res.status(404).send("No se encontro la receta")
    }
})





module.exports = router
