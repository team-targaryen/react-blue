import * as types from "../constants/actionTypes";

export const renameComponent = (event, currentComponentId) => (dispatch) => {
    const inputName = event.target.value;

    const component = {
        id: currentComponentId,
        name: inputName || 'DEFAULT NAME'
    }

    dispatch({
        type: types.RENAME_COMPONENT,
        payload: component
    });
};

export const changeType = (isComponent) => (dispatch) => {

    dispatch({
        type: types.CHANGE_TYPE,
        payload: isComponent
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