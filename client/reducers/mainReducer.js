import * as types from '../constants/actionTypes';

const app = {
    name: "App",
    id: 0,
    isContainer: true,
    children: [login, button],
}

const login = {
    name: "login",
    id: 1,
    isContainer: true,
    children: [],
}

const button = {
    name: "button",
    id: 2,
    isContainer: false,
    children: [],
}

const initialState = {
    lastId: 3,
    currentComponent: {
        name: "App",
        id: 0,
        isContainer: false,
        children: [login, button]
    }
}

const mainReducer = (state=initialState, action) => {
    let currentComponent;
    switch(action.type) {
        case types.RENAME_COMPONENT: 
            const inputName = action.payload;
            currentComponent = Object.assign(state.currentComponent, {name: inputName})
            console.log('rename currentComponent: ', currentComponent);
            return {
                ...state,
                currentComponent
            }

        case types.CHANGE_TYPE:
            const isContainer = action.payload; 
            // document.getElementById("componentDetailContainerCheckbox").checked = isContainer;
            currentComponent = Object.assign(state.currentComponent, {isContainer});  
            console.log('change type currentComponent: ', currentComponent);
            return {
                ...state,
                currentComponent
            }

        case types.DELETE_COMPONENT:

        case types.UPDATE_CHILDRENLIST:
            const children = action.payload.children;
            const lastId = action.payload.lastId;

            currentComponent = Object.assign(state.currentComponent, {children});
            console.log('update children currentComponent: ', currentComponent);
            return {
                ...state,
                lastId,
                currentComponent
            }

        default:
            return state;
    }
}

export default mainReducer;