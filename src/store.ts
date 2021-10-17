import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { hasOnlyExpressionInitializer } from 'typescript';
import rootReducer from './reducers';

const initialState = {};

const store = createStore(rootReducer, initialState,composeWithDevTools(applyMiddleware(thunk)));

export type RootStore = ReturnType<typeof rootReducer>

export default store;
