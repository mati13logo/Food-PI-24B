import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import './Details.css'
import Loading from "../Loading/Loading";

export default function Detail(props) {
    const myRecipe = useSelector((state) => state.detail)
    const id = props.match?.params.id

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])
    
    return (
        <div className="contenedorDetails">
            {
                Object.keys(myRecipe).length > 0 ?
                    <div>
                        <div className="detailTitulo">
                            <h1 className="h1">{myRecipe.name} </h1>
                            <img alt="Img not found" src={myRecipe.image}></img>
                        </div>
                <div className="contenedorTablas">
                        <div className="contenedorInterno">
                            <p className="pDiets">Types :{myRecipe.types?.map(el => <li key={el}>{el}</li>)}</p>
                        </div>
                        <div className="contenedorInterno">
                            <p className="pDiets">Diets :{myRecipe.diets?.map(el => <li key={el}>{el.name ? el.name : el}</li>)}</p>
                        </div>
                        <div>
                            <p className="pScore">Score :{myRecipe.score}</p>
                            <p className="pScore">HealthScore :{myRecipe.healthScore}</p>
                        </div>
                </div>
                    <div className="tablaSummary">
                        <div className="texto">
                            <h3 className="h3">Summary </h3><p>  {myRecipe?.summary?.replace(/<[^>]*>/g, '')}  </p>
                        </div>
                        <div className="texto">
                            <h3 className="h3">Steps</h3><p>{myRecipe.steps}</p>
                        </div>
                    </div>
                    </div> : <Loading/>
            }
            <Link to='/home'><button className="boton">Back</button></Link>


        </div>
    )
}