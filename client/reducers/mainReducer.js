import * as types from '../constants/actionTypes';

const app = {
    name: "App",
    id: 0,
    index: 0,
    isContainer: true,
    children: [login, button],
}

const login = {
    name: "login",
    id: 1,
    index: 0,
    level: 1,
    isContainer: false,
    children: [],
}

const button = {
    name: "button",
    id: 2,
    index: 1,
    level: 1,
    isContainer: false,
    children: [],
}

const initialState = {
    componentList: { 0: app, 1: login, 2: button},
    lastId: 3,
    currentComponent: {
        name: "App",
        id: 0,
        isContainer: true,
        level: 0,
        index: 0,
        children: [login, button]
    }
}

const mainReducer = (state=initialState, action) => {
    let currentComponent;
    switch(action.type) {
        case types.RENAME_COMPONENT: 
            const inputName = action.payload;
            currentComponent = Object.assign(state.currentComponent, {name: inputName})
            return {
                ...state,
                currentComponent
            }

        case types.CHANGE_TYPE:
                console.log(action.payload);       

            const isContainer = action.payload; 
            currentComponent = Object.assign(state.currentComponent, {isContainer});  
            return {
                ...state,
                currentComponent
            }

        case types.DELETE_COMPONENT:

        case types.UPDATE_CHILDRENLIST:
            

        default:
            return state;
    }
}

export default mainReducer;