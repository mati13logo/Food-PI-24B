import React from "react";
import { useState } from "react";
import { useDispatch, connect} from "react-redux";
import { getNameRecipes } from "../../actions";

// export class SearchBar extends React.Component{

//     constructor(props){
//             super(props)
//             this.state = {search: ''}
//     }
//     handleInputChange(e){
//         e.preventDefault();
//         this.setState({search: e.target.value})
//     }
//     handleSubmit(e){
//         e.preventDefault()
//         this.props.getNameRecipes(this.state.search)
//     }
    
//     render(){
//     //    {console.log(this)}
//         return(
//                 <div>
//                     <input type='text'
//                     placeholder="Buscar"
//                     onChange={(e)=> this.handleInputChange(e)}
//                     />
//                     <button className='boton' type="submit"
//                     onClick={(e)=> this.handleSubmit(e)}
//                     >Buscar</button>
//                 </div>
//             )
//     }
    
// }
// export const mapStateToProps = (state)=>{
//     return{
//       recipes: state.recipes
//     }
//     };

// export const mapDispatchToProps = (dispatch)=>{
//     return{
//         getNameRecipes: (name)=>dispatch(getNameRecipes(name))
//     }
//   };

// export default connect(mapStateToProps,mapDispatchToProps)(SearchBar)

export default function SearchBar(){
const dispatch = useDispatch();
const [name, setName] = useState("")

function handleInputChange(e){
e.preventDefault();
setName(e.target.value)

}
function handleSubmit(e){
    e.preventDefault();
    dispatch(getNameRecipes(name))
}


return(
    <div>
        <input type='text'
        placeholder="Buscar"
        onChange={(e)=> handleInputChange(e)}
        />
        <button className='boton' type="submit"
        onClick={(e)=> handleSubmit(e)}
        >Buscar</button>
    </div>
)
}


