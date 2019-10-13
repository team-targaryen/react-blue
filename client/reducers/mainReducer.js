import * as types from "../constants/actionTypes";
import clone from "clone";

function DoublyLinkedList(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}

const appComponent = {
  name: "App",
  depth: 0,
  id: 0,
  componentId: 0,
  isContainer: true,
  children: []
};

const initialState = {
  data: appComponent,
  translate: { x: 0, y: 0 },
  history: null,
  currentComponent: appComponent,
  lastId: 0,
  templates: []
};

const updateTree = (state, currentComponent, templateOption) => {
  // check if current component has a name
  if (currentComponent.name === "") {
    currentComponent.name = "DEFAULT_NAME";
  }
  // check if any child has empty name, then change it to 'DEFAUL NAME'
  let children = clone(currentComponent.children);
  if (children) {
    for (let child of children) {
      if (child.name === "") {
        child.name = "DEFAULT_NAME";
      }
    }
  } else {
    children = clone(currentComponent);
    children.name = currentComponent.name;
  }
  // console.log("state.data: ", state.data);
  const findComponentAndUpdate = (tree, currentComponent, templateOption) => {
    if (tree.componentId === currentComponent.componentId) {
      tree.name = currentComponent.name;
      tree.templateOption = templateOption;
      // console.log(tree.templateOption);
      tree.isContainer = currentComponent.isContainer;
      tree.children = clone(currentComponent.children);
      return;
    }
    if (tree.children) {
      tree.children.forEach(child => {
        findComponentAndUpdate(child, currentComponent);
      });
    }
    return;
  };

  let data = clone(state.data);
  findComponentAndUpdate(data, currentComponent);

  // cache into the history
  let preHistory = clone(state.history);
  let history = new DoublyLinkedList(
    clone({
      data,
      currentComponent
    })
  );
  preHistory.next = history;
  history.prev = preHistory;

  return {
    data,
    currentComponent,
    history
  };
};

const mainReducer = (state = initialState, action) => {
  let isContainer,
    currentComponent,
    childId,
    children,
    data,
    inputName,
    updatedState,
    history,
    templateOption;
  switch (action.type) {
    /******************************* actions for side bar ************************************/

    case types.RENAME_COMPONENT:
      inputName = action.payload.inputName;
      currentComponent = clone(state.currentComponent);
      currentComponent.name = inputName;
      updatedState = updateTree(state, currentComponent);

      return {
        ...state,
        ...updatedState
      };

    case types.CHANGE_TYPE:
      isContainer = action.payload.isContainer;
      currentComponent = clone(state.currentComponent);
      currentComponent.isContainer = isContainer;
      updatedState = updateTree(state, currentComponent);
      return {
        ...state,
        ...updatedState
      };

    case types.DELETE_COMPONENT:
      if (state.currentComponent.depth === 0) {
        alert("Error: can't delete root component.");
        return {
          ...state
        };
      }

      const findAndDelete = (tree, currentComponent) => {
        if (tree.componentId === currentComponent.componentId) {
          console.log("tree: ", tree);
          tree = undefined;
          console.log("state: ", state.data);
          return;
        }
        if (tree.children) {
          tree.children.forEach(child => {
            findAndDelete(child, currentComponent);
          });
        }
        return;
      };

      data = clone(state.data);
      findAndDelete(data, state.currentComponent);

      return {
        ...state,
        data,
        currentComponent: data
      };

    /******************************* actions for main container ************************************/

    case types.SET_CURRENT_COMPONENT:
      currentComponent = action.payload.currentComponent;
      data = action.payload.data;

      if (data) {
        return {
          ...state,
          data,
          currentComponent
        };
      } else {
        return {
          ...state,
          currentComponent
        };
      }

    case types.SET_TRANS_AND_HISTORY:
      const translate = action.payload.translate;
      history = action.payload.history;
      return {
        ...state,
        translate,
        history
      };

    case types.UN_DO:
      if (state.history.prev) {
        history = clone(state.history.prev);

        data = clone(history.value.data);
        currentComponent = clone(history.value.currentComponent);
        return {
          ...state,
          data,
          history,
          currentComponent
        };
      } else {
        alert("No previous action");
        return {
          ...state
        };
      }

    case types.RE_DO:
      if (state.history.next) {
        history = clone(state.history.next);
        data = clone(history.value.data);
        currentComponent = clone(history.value.currentComponent);
        return {
          ...state,
          data,
          history,
          currentComponent
        };
      } else {
        alert("No next action");
        return {
          ...state
        };
      }

    /*********************** actions for current component children list ****************************/

    case types.RENAME_CHILD:
      inputName = action.payload.inputName;
      childId = action.payload.childId;
      children = clone(state.currentComponent.children);
      for (let child of children) {
        if (child.componentId === childId) {
          child.name = inputName;
        }
      }
      currentComponent = clone(state.currentComponent);
      currentComponent.children = clone(children);
      updatedState = updateTree(state, currentComponent);

      return {
        ...state,
        ...updatedState
      };

    case types.CHANGE_CHILD_TYPE:
      isContainer = action.payload.isChecked;
      childId = action.payload.childId;
      children = clone(state.currentComponent.children);
      for (let child of children) {
        if (child.componentId === childId) {
          child.isContainer = isContainer;
        }
      }
      currentComponent = clone(state.currentComponent);
      currentComponent.children = clone(children);
      // console.log('currentComponent in change child type: ', currentComponent);

      updatedState = updateTree(state, currentComponent);

      return {
        ...state,
        ...updatedState
      };

    case types.ADD_CHILD:
      const name = action.payload.name;
      isContainer = action.payload.isContainer;
      const componentId = state.lastId + 1;
      const newChild = {
        name,
        componentId,
        isContainer,
        templateOption: state.templates[0],
        parent: state.currentComponent
      };

      children = state.currentComponent.children
        ? state.currentComponent.children.slice()
        : [];
      children.push(newChild);
      currentComponent = clone(state.currentComponent);
      currentComponent.children = children.slice();

      updatedState = updateTree(state, currentComponent);

      return {
        ...state,
        ...updatedState,
        lastId: componentId
      };

    case types.DELETE_CHILD:
      childId = action.payload.childId;
      currentComponent = clone(state.currentComponent);
      for (let i = 0; i < currentComponent.children.length; i++) {
        if (currentComponent.children[i].componentId === childId) {
          currentComponent.children.splice(i, 1);
        }
      }
      updatedState = updateTree(state, currentComponent);
      return {
        ...state,
        ...updatedState
      };

    case types.USE_TEMPLATES:
      return {
        ...state,
        templates: action.payload.templates
      };
    case types.SET_TEMPLATES_FOR_COMPONENT:
      templateOption = state.templates[action.payload.index].code;
      currentComponent = clone(action.payload.currentComponent);
      state = clone(state);
      childId = action.payload.childId;
      currentComponent.childId = childId;
      updatedState = updateTree(state, currentComponent, templateOption);
      if (!childId) {
        updatedState.currentComponent.templateOption = templateOption;
      }
      return {
        ...state,
        ...updatedState
      };

    default:
      return state;
  }
};

export default mainReducer;
