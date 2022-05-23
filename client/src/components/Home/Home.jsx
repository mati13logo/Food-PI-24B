import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getTypes, filterByDiet, orderByName, orderByScore } from '../../actions'
import { Link } from 'react-router-dom'
import Card from '../Card/Card.jsx'
import Paginado from '../Paginado/Paginado.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import './Home.css';

export default function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes)
    const typesAll = useSelector(state => state.types)
    const [orden, setOrden] = useState('')
    // console.log(typesAll)
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    function nextPage(e){
        e.preventDefault()
        setCurrentPage(currentPage + 1)
    }
    function prevPage(e){
        e.preventDefault()
        setCurrentPage(currentPage - 1)
    }
    

    // console.log(allRecipes)
    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch])
    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])


    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes())
    }

    function handleFilterDiet(e) {
        e.preventDefault();
        dispatch(filterByDiet(e.target.value))
        // console.log(e.target.value)
    }
    function handleSort(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleSortScore(e) {
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }


    return (
        <div className='contenedor'>
            <h1>Recipes</h1>
            <Link to='/recipe'>
                <button className='boton'> Create Recipe</button>
            </Link>
            <div className='selectFiltros'>
                <button className='boton' onClick={e => { handleClick(e) }}>RELEASE</button>
                <select defaultValue='todo' onChange={e => { handleSort(e) }}>
                    <option disabled value='todo'>ORDER</option>
                    <option value='asce'>ASCENDENTE</option>
                    <option value='desc'>DESCENDENTE</option>
                </select>
                <select defaultValue='score' onChange={e => { handleSortScore(e) }}>
                    <option disabled value='score'>SCORE</option>
                    <option value='maxs'>MAX SCORE</option>
                    <option value='mins'>MIN SCORE</option>
                </select>

                <select defaultValue='All' onChange={e => { handleFilterDiet(e) }}>

                    <option value='All'> ALL</option>
                    {
                        typesAll?.map(el => {
                            return (
                                <option key={el.id} value={el.name.toLowerCase()}> {el.name.toLowerCase()}</option>
                            )
                        })
                    }

                </select>
            </div>
            <SearchBar className='searchbar'></SearchBar>
            <div className='cardConteinter'>

                {currentRecipes?.map((el) => {
                    //  console.log(allRecipes)
                    return (
                        <div >
                            <Link to={'/home/' + el.id}>
                                <Card className="card" name={el.name} score={el.score} image={el.image}  diets={el.diets} key={el.id} />
                            </Link>

                        </div>
                    )
                })
                }
            </div>
        <div className='divPaginado'>
            <button  disabled={currentPage === 1} onClick={(e)=> prevPage(e)}>Prev</button>
            <Paginado
                className='paginado '
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
                />
                <button disabled={currentPage > allRecipes.length/9} onClick={(e)=>nextPage(e)} >Next</button>
        </div>

        </div>
    )

}  