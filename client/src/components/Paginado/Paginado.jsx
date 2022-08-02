import React from "react";

export default function Paginado({ recipesPerPage, currentPage, setCurrentPage, allRecipes}) {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumber.push(i)
    }
    const paginado1 = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    function nextPage(e) {
        e.preventDefault()
        setCurrentPage(currentPage + 1)
    }
    function prevPage(e) {
        e.preventDefault()
        setCurrentPage(currentPage - 1)
    }

    return (
        <nav className="navPaginado">
            <button disabled={currentPage === 1} onClick={(e) => prevPage(e)}>Prev</button>
                {pageNumber && pageNumber.map(number => {
                    return (
                        <li className="number" key={number}>
                            <button className="prueba" onClick={() => paginado1(number)}>{number}</button>
                        </li>
                    )
                })}
            
            <button disabled={currentPage > allRecipes / 9} onClick={(e) => nextPage(e)} >Next</button>
        </nav>
    )
}



