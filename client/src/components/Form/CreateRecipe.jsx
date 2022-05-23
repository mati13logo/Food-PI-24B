import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { getRecipes, getTypes, postRecipes } from "../../actions";
import './CreateRecipe.css'



export default function CreateRecipes() {
    const dispatch = useDispatch();
    const typesAll = useSelector((state) => state.types)
    const history = useHistory()
    const [errors, setErrors] = useState({
        name: 'Name is require'
    })
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

    function validate(input) {
        let errors = {}

        if (!input.name) errors.name = 'Name is require'
        if (!input.score) errors.score = 'Score is require'
        if (!input.summary) errors.summary = 'Summary is require'
        if (!input.healthScore) errors.healthScore = 'HealthScore is require'
        if (!input.steps) errors.steps = 'Steps is require'
        if (!input.image) errors.image = 'Image is require'
        return errors
    }

    useEffect(() => {
        dispatch(getTypes())
        dispatch(getRecipes())
    }, []);
    // console.log(input.diets)

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

   
    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
    }

    function handleNumber(e) {
        try {
            const score = parseInt(e.target.value)
            if ((Number.isInteger(score)) && (score >= 0) && (score <= 100)) {
                setInput({
                    ...input,
                    [e.target.name]: score
                })
                setErrors(validate({
                    ...input,
                    [e.target.name]: score
                }))
            }
        } catch {
            console.log('error')
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postRecipes(input))
        alert('Recipe Created')
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

    function handleDelete(e) {
        e.preventDefault()
        console.log(e)
        setInput({
            ...input,
            diets: input.diets.filter(diets => diets !== e.target.value)
        })
        // console.log(e)
    }


    return (
        <div >
            <div className="contenedorPlantilla">
                <h1>Create Recipe</h1>


                <form className="form">
                    <div className="input">
                        <div className="divLabel" >
                            <label>Name</label>
                            <input
                                type="text"
                                value={input.name}
                                name='name'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="pError">
                            {errors.name && (<p className="error">{errors.name}</p>)}
                        </div>

                    </div>
                    <div className="input">
                        <div className="divLabel" >
                            <label>Score</label>
                            <input
                                type="number"
                                value={input.score}
                                name='score'
                                onChange={e => handleNumber(e)}
                            />
                        </div>
                        <div className="pError">
                            {errors.score && (<p className="error">{errors.score}</p>)}
                        </div>
                    </div>
                    <div className="input">
                        <div className="divLabel" >
                            <label> Summary</label>
                            <input
                                type="text"
                                value={input.summary}
                                name='summary'
                                onChange={handleChange}
                                maxLength="250"
                            />
                        </div>
                        <div className="pError">

                            {errors.summary && (<p className="error">{errors.summary}</p>)}
                        </div>
                    </div>
                    <div className="input">
                        <div className="divLabel" >
                            <label> HealthScore</label>
                            <input
                                type="number"
                                value={input.healthScore}
                                name='healthScore'
                                onChange={e => handleNumber(e)}
                            />
                        </div>
                        <div className="pError">

                            {errors.healthScore && (<p className="error">{errors.healthScore}</p>)}
                        </div>
                    </div>
                    <div className="input">
                        <div className="divLabel" >
                            <label>Steps</label>
                            <input
                                type="text"
                                value={input.steps}
                                name='steps'
                                onChange={handleChange}
                                maxLength="250"
                            />
                        </div>
                        <div className="pError">

                            {errors.steps && (<p className="error">{errors.steps}</p>)}
                        </div>
                    </div>
                    <div className="input">
                        <div className="divLabel" >
                            <label>Image</label>
                            <input
                                type="text"
                                value={input.image}
                                name='image'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="pError">
                            {errors.image && (<p className="error">{errors.image}</p>)}

                        </div>
                    </div>
                    <div className="labelInput">
                        {typesAll?.map(el =>
                            (<label className="label"> <input className="inputDiets" type='checkbox' key={el.name} value={el.name} onChange={e => { handleCheck(e) }} /> {el.name} </label>))}
                    </div>


                    <div >
                        <button className="boton" type='submit' disabled={Object.keys(errors).length === 0 ? false : true} onClick={e => handleSubmit(e)}>Recipes Create</button>
                    </div>

                </form>
            </div>
            <Link to='/home'><button className="boton">  Back </button></Link>
        </div>
    )
}