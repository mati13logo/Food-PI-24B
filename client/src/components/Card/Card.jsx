import React from "react";
import './Card.css'

export default function Card({ name, image, diets, score ,types}) {
    return (
        <div className="card">
            <img className="cardImage" src={image} alt='img not found'></img>
            <h3 className="cardName">{name}</h3>
            <div className="contenedorDiets">
                <div className="cardDietP">
                <h5 >Diet : </h5>
                    {diets?.map(diets => <p key={diets}>{`${diets.name ? diets.name : diets}-`} </p>)}
                </div>
                <div  className="cardTypes">
            <h5>Types : </h5>
            {types?.map(types => <p key={types}>{types}</p>)}

                </div>
            </div>

        </div>
    )
}

