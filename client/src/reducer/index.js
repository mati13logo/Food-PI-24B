
const initialState = {
    allRecipes: [],
    recipes: [],
    types: [],
    detail: {},
}


export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

            case 'FILTER_BY_DIET':
                const recipesAll = state.allRecipes
                let dietFilter = action.payload === "All" ? recipesAll : recipesAll.filter(el => el.diets.some(el => el.name ? el.name === action.payload : el === action.payload))
            let vegetarian = [];
            if (action.payload === 'vegetarian') {
                for (let i = 0; i < recipesAll.length; i++) {
                    if (recipesAll[i].vegetarian === true) { vegetarian.push(recipesAll[i]) }
                }
                dietFilter = [...dietFilter, ...vegetarian]
            }

            return {
                ...state,
                recipes: dietFilter
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'ORDER_BY_NAME':
            let orderRecipe = [...state.recipes]
            orderRecipe = orderRecipe.sort((a, b) => {
                //las mayusculas tienen prioridad en sort
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return action.payload === "asce" ? -1 : 1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return action.payload === "asce" ? 1 : -1;
                }

                return 0;
            });

            return {
                ...state,
                recipes: orderRecipe
            }

        case 'ORDER_BY_SCORE':
            let sortScore = action.payload === 'mins' ?
                state.recipes.sort(function (a, b) {
                    if (a.score > b.score) {
                        return 1;
                    }
                    if (b.score > a.score) {
                        return -1;
                    }
                    return 0
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.score > b.score) {
                        return -1;
                    }
                    if (b.score > a.score) {
                        return 1;
                    }
                    return 0
                })

            return {
                ...state,
                recipes: sortScore
            }

        case 'POST_RECIPE':
            return {
                ...state,
            }

        case 'GET_NAME_RECIPES':
            return {
                ...state,
                recipes: action.payload
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }

        default: return state
    }
}


