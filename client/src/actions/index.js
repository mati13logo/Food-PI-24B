import axios from 'axios'

export function getRecipes() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}
export function filterByDiet(payload) {
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function getTypes() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/types')
        return (
            dispatch({
                type: 'GET_TYPES',
                payload: json.data
            })
        )
    }
}


export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByScore(payload) {
    return {
        type: 'ORDER_BY_SCORE',
        payload
    }
}

export function getNameRecipes(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type: "GET_NAME_RECIPES",
                payload: json.data
            })
        }
        catch (error) {
            return alert('La receta ingresada no existe')
        }

    }
}

export function postRecipes(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:3001/recipe', payload)
        return json
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data[0]
            })
        }
        catch (error) {
            return alert('El id ingresado no es valido ')
        }
    }
}

