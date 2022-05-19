import React from 'react'
import {Link} from 'react-router-dom'
import '../LandingPage/LandingPage.css'


export default function LandingPage(){
    return(
        <div className='contenedor1'>
        <div className='contenedorPrincipal'>
            <h1 className='titulo'>
                Welcome to the page
            </h1>
            <Link to='/home'>
                <button className='boton'> Open </button>
            </Link>
        </div>

        </div>
    )
}