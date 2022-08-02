import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getTypes, filterByDiet, orderByName, orderByScore } from '../../actions'
import { Link } from 'react-router-dom'
import Card from '../Card/Card.jsx'
import Paginado from '../Paginado/Paginado.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import './Home.css';
import Loading from '../Loading/Loading'

export default function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes)
    const typesAll = useSelector(state => state.types)
    const [orden, setOrden] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

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
        
    }
    function handleSort(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)
    }
    function handleSortScore(e) {
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)
    }

    
    return (
<div >



        <div className='contenedor'>
            <div className='searchBar'>
                <Link to='/recipe'>
                    <button className='boton'> Create Recipe</button>
                </Link>
                <SearchBar className='searchbar'></SearchBar>
            </div>

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
                        typesAll?.map((el) => {
                            return (
                                <option key={el.id} value={el.name.toLowerCase()}> {el.name.toLowerCase()}</option>
                                )
                            })
                        }

                </select>

            </div >
                        {allRecipes.length === 0? <Loading/>: 
            <div className='cardConteinter'>

                {currentRecipes?.map((el) => {
                    return (
                        <div >
                            <Link to={'/home/' + el.id}>
                                <Card className="card" name={el.name} score={el.score} image={el.image} diets={el.diets} key={el.id}/>
                            </Link>

                        </div>
                    )
                })
            }
            </div>
        }
            <div className='divPaginado'>
                <Paginado
                    className='paginado '
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    />
            
            </div>
        </div>
        </div>
    )

}  