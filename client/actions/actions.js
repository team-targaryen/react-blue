import * as types from "../constants/actionTypes";

export const renameComponent = (childId, input) => dispatch => {
  // e.preventDefault();
  // const inputName = e.target.value;

  // console.log(inputName);
  dispatch({
    type: types.RENAME_COMPONENT,
    payload: { childId, input }
  });
};

export const changeType = (isChecked, id) => dispatch => {
  dispatch({
    type: types.CHANGE_TYPE,
    payload: { isChecked, id }
  });
};

export const deleteComponent = componentId => dispatch => {
  dispatch({
    type: types.DELETE_COMPONENT,
    payload: componentId
  });
};

export const updateChildrenList = (children, id) => dispatch => {
  dispatch({
    type: types.UPDATE_CHILDRENLIST,
    payload: {
      children,
      id
    }
  });
};

export const goBackOrForward = (dataParsedIntoObject, history) => dispatch => {
  dispatch({
    type: types.GO_BACK_OR_FORWARD,
    payload: {
      dataParsedIntoObject,
      history
    }
  });
};

export const setCurrentComponent = currentComponent => dispatch => {
  dispatch({
    type: types.SET_CURRENT_COMPONENT,
    payload: currentComponent
  });
};

export const setTranslateAndHistory = (translate, history) => dispatch => {
  dispatch({
    type: types.SET_TRANS_AND_HISTORY,
    payload: {
      translate,
      history
    }
  });
};
export const addChild = (
  lastId,
  currentComponent,
  newComponentNode
) => dispatch => {
  dispatch({
    type: types.ADD_CHILD,
    payload: {
      lastId,
      currentComponent,
      newComponentNode
    }
  });
};
export const deleteChild = deleteId => dispatch => {
  dispatch({
    type: types.DELETE_CHILD,
    payload: {
      deleteId
    }
  });
};
