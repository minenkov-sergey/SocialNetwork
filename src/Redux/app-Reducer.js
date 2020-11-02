import { getAuthDataTC } from "./auth-Reducer";


let initialState = {
    initialized: false
}


const appDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INITIALIZED': {
            return { 
                ...state,
                initialized:true
            }
        }
        default:
            return state;
    }
}

export const initialized = () => ({ type: 'SET_INITIALIZED'})


export const initializedTC = () => (dispatch) => {
    let promise1 = dispatch(getAuthDataTC());
    //let promise2 = dispatch(initialized1());
    //let promise3 = dispatch(initialized1());

    Promise.all([promise1]).then(() => {
        dispatch(initialized());

    }) 
}



export default appDataReducer;