import { combineReducers, createStore, applyMiddleware } from "redux"
import sidebarDataReducer from './sidebarData-Reducer'
import profilePageDataReducer from './profilePageData-Reducer'
import dialogsPageDataReducer from './dialogsPageData-Reducer'
import usersPageDataReducer from "./usersPageData-Reducer"
import newsPageDataReducer from './newsPageData-Reducer'
import authDataReducer from "./auth-Reducer"
import thunkMiddleWare from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appDataReducer from './app-Reducer'
import { composeWithDevTools } from 'redux-devtools-extension'


let rootReducer = combineReducers({
    sidebarData: sidebarDataReducer,
    profilePageData: profilePageDataReducer,
    dialogsPageData: dialogsPageDataReducer,
    usersPageData: usersPageDataReducer,
    newsPageData: newsPageDataReducer,
    authData: authDataReducer,
    form: formReducer,
    appData: appDataReducer
});

type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>


const store = createStore(rootReducer, composeWithDevTools( applyMiddleware(thunkMiddleWare)))


export default store