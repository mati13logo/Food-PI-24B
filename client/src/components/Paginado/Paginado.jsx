import React from "react";

export default function Paginado({recipesPerPage, allRecipes, paginado}){
    const pageNumber=[];

    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumber.push(i)
    }
    //obtenemos el numero redondo de dividir la cantidad de recetas por la cantidad de recetas que queremos en pantalla
    
    return(
        //Mapeamos el arreglo de numeros para obtener el numero de cada pagina
        <nav>
            <ul className="paginado">
                {pageNumber && pageNumber.map(number =>{
                    return(
                    <li className="number" key={number}>
                        <a className="prueba" onClick={()=> paginado(number)}>{number}</a>
                    </li>
                    )
                })}
            </ul>
        </nav>
    )
}