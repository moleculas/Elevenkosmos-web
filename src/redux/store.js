import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

//import {composeWithDevTools} from 'redux-devtools-extension';

import appReducer from './appDucks';

const rootReducer = combineReducers({ 
    variablesApp: appReducer,
})

export default function generateStore(){
    const store = createStore( rootReducer, applyMiddleware(thunk));    
    return store;
}