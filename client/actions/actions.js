import * as types from "../constants/actionTypes";

/******************************* actions for side bar ************************************/

export const renameComponent = event => dispatch => {
  let inputName = event.target.value;
  inputName = inputName.replace(/(\w)(\w*)/g, (g0, g1, g2) => {
    return g1.toUpperCase() + g2.toLowerCase();
  });
  inputName = inputName.replace(/\s/g, "");

  dispatch({
    type: types.RENAME_COMPONENT,
    payload: {
      inputName
    }
  });
};

export const changeType = event => dispatch => {
  const isContainer = event.target.checked;
  dispatch({
    type: types.CHANGE_TYPE,
    payload: {
      isContainer
    }
  });
};

export const deleteComponent = () => dispatch => {
  dispatch({
    type: types.DELETE_COMPONENT,
    payload: null
  });
};

/******************************* actions for main container ************************************/

export const setCurrentComponent = (currentComponent, data) => dispatch => {
  if (document.getElementById("componentNameInput")) {
    document.getElementById("componentNameInput").value = currentComponent.name;
  }
  console.log("currentComponent: ", currentComponent);
  dispatch({
    type: types.SET_CURRENT_COMPONENT,
    payload: {
      currentComponent,
      data
    }
  });
};

export const setTransAndHistory = (translate, history) => dispatch => {
  dispatch({
    type: types.SET_TRANS_AND_HISTORY,
    payload: {
      translate,
      history
    }
  });
};

export const undo = () => dispatch => {
  console.log("inside of undo");
  dispatch({
    type: types.UN_DO,
    payload: null
  });
};

export const redo = () => dispatch => {
  dispatch({
    type: types.RE_DO,
    payload: null
  });
};

/*********************** actions for current component children list ****************************/
export const renameChild = (event, childId) => dispatch => {
  const inputName = event.target.value.replace(/\s/g, "");
  dispatch({
    type: types.RENAME_CHILD,
    payload: {
      inputName,
      childId
    }
  });
};

export const changeChildType = (event, childId) => dispatch => {
  const isChecked = event.target.checked;
  dispatch({
    type: types.CHANGE_CHILD_TYPE,
    payload: {
      isChecked,
      childId
    }
  });
};

export const addChild = event => dispatch => {
  // console.log(event);
  event.preventDefault();
  let name = event.target.childName.value || "Component";
  name = name.replace(/(\w)(\w*)/g, (g0, g1, g2) => {
    return g1.toUpperCase() + g2.toLowerCase();
  });
  name = name.replace(/\s/g, "");
  const isContainer = event.target.checkbox.checked;
  document.getElementById("addChildName").value = "";
  document.getElementById("addChildContainerCheckbox").checked = false;

  dispatch({
    type: types.ADD_CHILD,
    payload: {
      name,
      isContainer
    }
  });
};

export const deleteChild = childId => dispatch => {
  dispatch({
    type: types.DELETE_CHILD,
    payload: {
      childId
    }
  });
};

// actions for taking the templates and sending it to the store
export const useTemplates = (templates, childrenString, isHook) => dispatch => {
  dispatch({
    type: types.USE_TEMPLATES,
    payload: { templates }
  });
};

export const setTemplatesForComponent = (
  currentComponent,
  index,
  childId
) => dispatch => {
  dispatch({
    type: types.SET_TEMPLATES_FOR_COMPONENT,
    payload: { currentComponent, index, childId }
  });
};
