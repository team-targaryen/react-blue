import * as types from '../constants/actionTypes';
import clone from 'clone';

const initialState = {
    children: [],
    lastId: 0
}

const childrenListReducer = (state=initialState, action) => {
    let childId, children, lastId;
    switch(action.type) {
        case types.SET_CHILDREN: 
            children = action.payload.children;
            lastId = action.payload.lastId;
            return {
                ...state,
                children,
                lastId
            }

        case types.RENAME_CHILD:
            const inputName = action.payload.inputName;
            childId = action.payload.childId;
            children = clone(state.children);
            for(let child of children) {
                if(child.id === childId) {
                    child.name = inputName
                }
            }
            return {
                ...state,
                children
            }

        case types.CHANGE_CHILD_TYPE:
            const isChecked = action.payload.isChecked;
            childId = action.payload.childId;
            children = clone(state.children);
            for(let child of children) {
                if(child.id === childId) {
                    child.isContainer = isChecked; 
                }
            }
            return {
                ...state,
                children
            }

        case types.ADD_CHILD:
            const name = action.payload.name;
            const isContainer = action.payload.isContainer;
            const id = state.lastId + 1;
            const newChild = {
                name,
                id,
                isContainer,
                children: []
            }

            children = clone(state.children);
            children.push(newChild);
            return {
                children,
                lastId
            };

        case types.DELETE_CHILD:
            childId = action.payload.childId;
            children = clone(state.children);
            for (let i = 0; i < children.length; i++){
                if (children[i].id === childId){
                    children.splice(i, 1);
                }
            };
            return {
                ...state,
                children
            }

        default:
            return state;
    }
}

export default childrenListReducer;