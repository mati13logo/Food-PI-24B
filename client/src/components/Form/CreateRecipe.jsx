import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { getRecipes, getTypes, postRecipes } from "../../actions";
import './CreateRecipe.css'

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Name is require'
    }
    if (!input.summary) {
        errors.summary = 'Summary is require'
    }
    if (!input.score) {
        errors.score = 'Score is require'
    }
    if (!input.healthScore) {
        errors.healthScore = 'HealthScore is require'
    }
    if (!input.image) {
        errors.image = 'Image is require'
    }
    if (!input.steps) {
        errors.steps = 'Steps is require'
    }
    if (!input.diets) {
        errors.diets = 'Diets is require'
    }
    return errors
}


export default function CreateRecipes() {
    const dispatch = useDispatch();
    const typesAll = useSelector((state) => state.types)
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const allState = useSelector((state) => state.allRecipes)
    // console.log(allState)
    const [input, setInput] = useState({
        name: '',
        summary: '',
        score: 0,
        healthScore: 0,
        image: '',
        steps: '',
        diets: [],
    })
    useEffect(() => {
        dispatch(getTypes())
        dispatch(getRecipes())
    }, []);
    console.log(input.diets)
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        if (allState.find(recipe => recipe.name.toLowerCase() === e.target.value.toLowerCase())) {
            setErrors({
                ...input,
                [e.target.name]: 'Recipe is found'
            })
        }
        
    }
    console.log(errors)
    function handleSelect(e) {
        if (!input.diets.includes(e.target.value)) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        // console.log(input)
        dispatch(postRecipes(input))
        // alert('Recipe Created')
        setInput({
            name: '',
            summary: '',
            score: 0,
            healthScore: 0,
            image: '',
            steps: '',
            diets: [],
        })
        history.push('/home')
    }
    function handleNumber(e){
        try{
            const score = parseInt(e.target.value)
            if ((Number.isInteger(score)) && (score >= 0) && (score <= 100)){
                setInput({
                    ...input,
                    [e.target.name]: score
                })
            }
        }catch{
            console.log('error')
        }
        // console.log(input)
    }


    function handleDelete(e) {

        setInput({
            ...input,
            diets: input.diets.filter(diets => diets !== e)
        })
        // console.log(e)
    }


    return (
        <div className="contenedorDetails">
            <div className="contenedorPlantilla">
                <h1>Create Recipe</h1>


                <form>
                    <div>
                        <input
                            placeholder="Nombre"
                            type="text"
                            value={input.name}
                            name='name'
                            onChange={handleChange}
                            title='Name incorrect'
                            required
                            />
                         {errors.name && (<p className="error">{errors.name}</p>)} 
                    </div>
                    <div>
                        <input
                        placeholder="Score"
                            min='0'
                            max='100'
                            type="number"
                            value={input.score}
                            name='score'
                            onChange={e => handleNumber(e)}
                        />
                        {/* {errors.score && (<p className="error">{errors.score}</p>)} */}
                    </div>
                    <div>
                        {/* <label> Summary</label> */}
                        <input
                            placeholder="Summary"
                            type="text"
                            value={input.summary}
                            name='summary'
                            onChange={handleChange}

                            required maxLength="250" />
                        {/* {errors.summary && (
                            <p className="error">{errors.summary}</p>
                        )} */}

                    </div>
                    <div>
                        {/* <label> HealthScore</label> */}
                        <input
                        placeholder="HealthScore"
                            min='0'
                            max='100'
                            type="number"
                            value={input.healthScore}
                            name='healthScore'
                            onChange={e => handleNumber(e)}
                            required />
                            {/* {errors.healthScore && (<p className="error">{errors.healthScore}</p>)} */}
                    </div>
                    <div>
                        <input
                            placeholder="Steps"
                            type="text"
                            value={input.steps}
                            name='steps'
                            onChange={handleChange}
                            required maxLength="250" />
                            {/* {errors.steps && (<p className="error">{errors.steps}</p>)} */}
                    </div>
                    <div>
                        <input
                            placeholder="Image"
                            type="text"
                            value={input.image}
                            name='image'
                            onChange={handleChange}
                            required />
                            {/* {errors.image && (<p className="error">{errors.image}</p>)} */}
                    </div>
                    <select defaultValue='Diets' onChange={e => { handleSelect(e) }}>
                        <option disabled>Diets</option>
                        {
                            typesAll?.map(el =>
                            (
                                <option key={el.name} value={el.name}> {el.name}</option>
                            )
                            )
                        }
                    </select>
                    <div >
                        {input.diets.map(
                            (el) => <div className="divDelete"><p>{el}</p>
                                <button className="botonDelete" onClick={(e) => handleDelete(el)}>x</button></div>)}
                    </div>
                    <div className="error">

                        {((input.name !== '') && (!errors.name) && (input.summary !== '') && (input.score) && (input.healthScore) && (input.steps) && (input.image) && (input.diets)) ?

                            <button className="boton" type='submit' onClick={e => handleSubmit(e)}>Recipes Create</button>

                            : input.name === '' ? <p>Name is require</p>
                                : !input.score ? <p>Score is require</p>
                                    : !input.summary ? <p>Summary is require</p>
                                        : !input.healthScore ? <p>HealthScore is require</p>
                                            : !input.steps ? <p>Steps is require</p>
                                                : !input.image ? <p>Image is require</p>
                                                    : <p>Diets is require</p>

                        }
                    </div>




                </form>
            </div>
            <Link to='/home'><button className="boton">  Back </button></Link>
        </div>
    )
}