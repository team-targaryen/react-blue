import * as types from "../constants/actionTypes";

export const renameComponent = (event) => (dispatch) => {
    event.preventDefault();
    const inputName = event.target.value;
    console.log(inputName);
    dispatch({
        type: types.RENAME_COMPONENT,
        payload: inputName
    });
};

export const changeType = (event) => (dispatch) => {
    const isContainer = event.target.checked;
    dispatch({
        type: types.CHANGE_TYPE,
        payload: isContainer
    });
};

export const deleteComponent = componentId => (dispatch) => {
    dispatch({
        type: types.DELETE_COMPONENT,
        payload: componentId
    });
};

export const updateChildrenList = (children, lastId) => (dispatch) => {
    for(let child of children) {
        if(!child.name) {
            child.name = "DEFAULT NAME";
        }
    }
    
    dispatch({
        type: types.UPDATE_CHILDRENLIST,
        payload: {
            children,
            lastId
        }
    })
}