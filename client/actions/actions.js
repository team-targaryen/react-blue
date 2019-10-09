import * as types from "../constants/actionTypes";

export const renameComponent = (event) => (dispatch) => {
    const inputName = event.target.value;

    dispatch({
        type: types.RENAME_COMPONENT,
        payload: {
            inputName
        }
    });
};

export const changeType = (event) => (dispatch) => {
    const isContainer = event.target.checked;
    dispatch({
        type: types.CHANGE_TYPE,
        payload: {
            isContainer
        }
    });
};

export const deleteComponent = (componentId) => (dispatch) => {
    dispatch({
        type: types.DELETE_COMPONENT,
        payload: {
            componentId
        }
    });
};

export const updateTree = () => (dispatch) => {
    dispatch({
        type: types.UPDATE_TREE,
        payload: null
    })
}

// for main container
export const setCurrentComponent = (currentComponent) => (dispatch) => {
    dispatch({
        type: types.SET_CURRENT_COMPONENT,
        payload: {
            currentComponent
        }
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

// for current component children list

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

export const changeChildType = (event, childId) => (dispatch) => {
    const isChecked = event.target.checked;
    dispatch({
        type: types.CHANGE_CHILD_TYPE,
        payload: {
            isChecked,
            childId
        }
    })
}

export const addChild = (event) => (dispatch) => {
    event.preventDefault();
    const name = event.target.childName.value || "DEFAULT_NAME";
    const isContainer = event.target.checkbox.checked;
    // reset the input fields
    document.getElementById("addChildName").value = '';
    document.getElementById("addChildContainerCheckbox").checked = false;
    
    dispatch({
        type: types.ADD_CHILD,
        payload: {
            name,
            isContainer
        }
    })

}

export const deleteChild = (childId) => (dispatch) => {
    dispatch({
        type: types.DELETE_CHILD,
        payload: {
            childId
        }
    })
}