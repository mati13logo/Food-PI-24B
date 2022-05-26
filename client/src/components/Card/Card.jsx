import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../SearchBar/SearchBar";
import './Card.css'




export class Card extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div className="card">
                <img className="cardImage" src={this.props.image} alt='img not found'></img>
                <h3 className="cardName">{this.props.name}</h3>
                <div className="contenedorDiets">
                    <h5 >Diet : </h5>
                    <div className="cardDietP">
                        {this.props.diets?.map(diets => <p key={this.props.diets}>{`${diets.name ? diets.name : diets}-`} </p>)}
                    </div>
                </div>

            </div>

        )
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(Card)




































// export default function Card({ name, image, diets, score ,types}) {
//     return (
//         <div className="card">
//             <img className="cardImage" src={image} alt='img not found'></img>
//             <h3 className="cardName">{name}</h3>
//             <div className="contenedorDiets">
//                 <h5 >Diet : </h5>
//                 <div className="cardDietP">
//                     {diets?.map(diets => <p key={diets}>{`${diets.name ? diets.name : diets}-`} </p>)}
//                 </div>
//             </div>

//         </div>
//     )
// }

