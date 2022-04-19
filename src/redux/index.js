import { actions } from "./actions";

const INITIAL_STATE = {
    productsCart: []
}

const reducer = (state = INITIAL_STATE, action) => {
		switch(action.type){

        case actions.setProductsCart:
            return{
                ...state,
                productsCart: action.payload
            }

        default:
            return state;
    }
}

export default reducer;