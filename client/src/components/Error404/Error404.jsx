import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Error404.css'
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../SearchBar/SearchBar";


export class Error404 extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="contenedorError404">
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

            </div>
        )
    }

}
export default connect(mapDispatchToProps, mapStateToProps)(Error404)



















// export default function Error404() {
//     return (
//         <div className="Error404">
//             <div >
//                 <h1>Error404</h1>
//                 <br></br>
//                 <h3>Page not found</h3>
//             </div>
//             <div>
//                 <Link to='/home'><button className="boton">Home</button></Link>
//             </div>
//         </div>

//     )
// };
