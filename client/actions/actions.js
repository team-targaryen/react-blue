import * as types from "../constants/actionTypes";

export const renameComponent = (event, currentComponent) => (dispatch) => {
    event.preventDefault();
    const inputName = event.target.value;
    console.log(inputName);

    dispatch({
        type: types.RENAME_COMPONENT,
        payload: inputName
    });
};

export const changeType = (checked) => (dispatch) => {
    const isContainer = checked;
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

export const updateChildrenList = childrenList => (dispatch) => {
    dispatch({
        type: types.UPDATE_CHILDRENLIST,
        payload: childrenList
    })
}