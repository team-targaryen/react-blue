import * as types from '../constants/actionTypes';
import clone from 'clone';

function DoublyLinkedList(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}

const initialState = {
  data: {
    name: 'App',
    depth: 0,
    id: 0,
    componentId: 0,
    isContainer: true,
    children: []
  },
  translate: { x: 0, y: 0 },
  history: null,
  currentComponent: {
    name: 'App',
    depth: 0,
    id: 0,
    componentId: 0,
    isContainer: true,
    children: []
  },
  lastId: 0,
  template: []
  // undoHotKey: 'undo',
  // redoHotKey: 'redo'
};

const updateTree = (state, currentComponent) => {
  // check if current component has a name
  if (currentComponent.name === '') {
    currentComponent.name = 'DEFAULT_NAME';
  }
  // check if any child has empty name, then change it to 'DEFAUL NAME'
  let children = clone(currentComponent.children);
  if (children) {
    for (let child of children) {
      if (child.name === '') {
        child.name = 'DEFAULT_NAME';
      }
    }
  } else {
    children = clone(currentComponent);
    children.name = currentComponent.name;
  }
  // console.log("state.data: ", state.data);
  const findComponentAndUpdate = (tree, currentComponent) => {
    if (tree.componentId === currentComponent.componentId) {
      tree.name = currentComponent.name;
      tree.isContainer = currentComponent.isContainer;
      tree.children = clone(currentComponent.children);
      return tree;
    }
    return [...tree.children].find(child => {
      if (child.componentId === currentComponent.componentId) {
        child.name = currentComponent.name;
        child.isContainer = currentComponent.isContainer;
        child.children = clone(currentComponent.children);
        return child;
      } else if (child.children)
        return findComponentAndUpdate(child, currentComponent);
    });
  };
  let data = clone(state.data);
  findComponentAndUpdate(data, currentComponent);
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
    history,
    updatedState;
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
        data = currentComponent;
        while (data.parent) {
          data = clone(data.parent);
        }
        return {
          ...state,
          data,
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
        alert('No previous action');
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
        alert('No next action');
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
        parent: state.currentComponent
      };
      children = clone(state.currentComponent.children) || [];
      children.push(newChild);
      currentComponent = clone(state.currentComponent);
      currentComponent.children = clone(children);
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
        template: action.payload.templates
      };

    default:
      return state;
  }
};

export default mainReducer;
