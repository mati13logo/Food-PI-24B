import React from "react";
import { Link } from "react-router-dom";
import './Error404.css'

export default function Error404() {
    return (
        <div className="Error404">
            <div >
                <h1>Error404</h1>
                <br></br>
                <h3>Page not found</h3>
            </div>
            <div>
                <Link to='/home'><button className="boton">Home</button></Link>
            </div>
        </div>

    )
};
