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

export const deleteComponent = (componentId) => (dispatch) => {
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

// for main container
export const setCurrentComponent = (currentComponent) => (dispatch) => {
    dispatch({
        type: types.SET_CURRENT_COMPONENT,
        payload: currentComponent
    })
}

export const setTransAndHistory = (translate, history) => (dispatch) => {
    dispatch({
        type: types.SET_TRANS_AND_HISTORY,
        payload: {
            translate,
            history,
        }
    })
}

// export const createLinkedNodeForBackAndForward = (isDummy) => (dispatch) => {
//     dispatch({
//         type: types.CREATE_LINKED_NODE_FOR_BACK_AND_FORWARD,
//         payload: isDummy
//     })
// }

// export const reRenderWithDummydata = () => (dispatch) => {
//     dispatch({
//         type: types.RE_RENDER_WITH_DUMMYDATA,
//         payload: null
//     })
// }

// export const goBackOrForward = (data, backOrForward) => (dispatch) => {
//     dispatch({
//         type: types.GO_BACK_OR_FORWARD,
//         payload: {
//             data,
//             backOrForward
//         }
//     })
// }

// for children list
export const renameChild = (event, childId) => (dispatch) => {
    const inputName = event.target.value;
    dispatch({
        type: types.RENAME_CHILD,
        payload: {
            inputName,
            childId
        }
    })
}