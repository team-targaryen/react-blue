import * as types from '../constants/actionTypes';

const appComponent = {
    name: "App",
    id: 0,
    isComponent: true,
    childrenList: [],
}

const initialState = {
    componentList: {0: appComponent},
    lastId: 0,
    currentComponentId: 0
}

const mainReducer = (state=initialState, action) => {

    switch(action.type) {
        case types.RENAME_COMPONENT: 
            const name = action.payload.name;
            const id = action.payload.id;
            let componentList = Object.assign(state.componentList);

            componentList[id].name = name;
            console.log('componentList[id].name: ', componentList[id].name);

            return {
                ...state,
                componentList
            }

        case types.CHANGE_TYPE:

        case types.DELETE_COMPONENT:

        case types.UPDATE_CHILDRENLIST:

        default:
            return state;
    }
}

export default mainReducer;