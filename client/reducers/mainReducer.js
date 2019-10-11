import * as types from '../constants/actionTypes';
import clone from 'clone';

function DoublyLinkedList(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}

const initialState = {
  data: {
    name: 'Parent Node',
    depth: 0,
    id: 0,
    isContainer: true,
    children: []
  },
  translate: { x: null, y: null },
  history: null,
  currentComponent: {
    name: 'Parent Node',
    depth: 0,
    id: 0,
    isContainer: true,
    children: []
  },
  lastId: 0
};

const mainReducer = (state = initialState, action) => {
  let isContainer,
    currentComponent,
    childId,
    children,
    data,
    inputName,
    preHistory,
    history;
  switch (action.type) {
    /******************************* actions for side bar ************************************/

    case types.RENAME_COMPONENT:
      inputName = action.payload.inputName;
      currentComponent = clone(state.currentComponent);
      currentComponent.name = inputName;
      return {
        ...state,
        currentComponent
      };

    case types.CHANGE_TYPE:
      isContainer = action.payload.isContainer;
      currentComponent = clone(state.currentComponent);
      currentComponent.isContainer = isContainer;
      return {
        ...state,
        currentComponent
      };

    case types.DELETE_COMPONENT:

    case types.UPDATE_TREE:
      currentComponent = clone(state.currentComponent);
      // check if current component has a name
      if (currentComponent.name === '') {
        currentComponent.name = 'DEFAULT_NAME';
      }
      // check if any child has empty name, then change it to 'DEFAUL NAME'
      children = clone(currentComponent.children);
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
      data = clone(state.data);
      const findComponentAndUpdate = (tree, currentComponent) => {
        if (tree.id === currentComponent.id) {
          tree.name = currentComponent.name;
          tree.isContainer = currentComponent.isContainer;
          tree.children = clone(currentComponent.children);
          return tree;
        }
        return [...tree.children].find(child => {
          if (child.id === currentComponent.id) {
            child.name = currentComponent.name;
            child.isContainer = currentComponent.isContainer;
            child.children = clone(currentComponent.children);
            return child;
          } else if (child.children)
            return findComponentAndUpdate(child, currentComponent);
        });
      };

      findComponentAndUpdate(data, currentComponent);
      // console.log('data in update: ', data);

      preHistory = clone(state.history);
      history = new DoublyLinkedList(
        clone({
          data,
          currentComponent
        })
      );
      preHistory.next = history;
      history.prev = preHistory;

      // console.log('history: ', history);

      return {
        ...state,
        data,
        currentComponent,
        history
      };

    /******************************* actions for main container ************************************/

    case types.SET_CURRENT_COMPONENT:
      currentComponent = action.payload.currentComponent;
      data = action.payload.data;

      if (data) {
        // console.log('currentComponent in set current: ', currentComponent);

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
        if (child.id === childId) {
          child.name = inputName;
        }
      }

      currentComponent = clone(state.currentComponent);
      currentComponent.children = clone(children);
      // console.log('currentComponent in rename child: ', currentComponent);
      return {
        ...state,
        currentComponent
      };

    case types.CHANGE_CHILD_TYPE:
      isContainer = action.payload.isChecked;
      childId = action.payload.childId;
      children = clone(state.currentComponent.children);
      for (let child of children) {
        if (child.id === childId) {
          child.isContainer = isContainer;
        }
      }

      currentComponent = clone(state.currentComponent);
      currentComponent.children = clone(children);
      // console.log('currentComponent in change child type: ', currentComponent);
      return {
        ...state,
        currentComponent
      };

    case types.ADD_CHILD:
      const name = action.payload.name;
      isContainer = action.payload.isContainer;
      const id = state.lastId + 1;
      const newChild = {
        name,
        id,
        isContainer,
        parent: state.currentComponent
      };

      children = clone(state.currentComponent.children) || [];
      children.push(newChild);

      currentComponent = clone(state.currentComponent);
      currentComponent.children = clone(children);
      // console.log('currentComponent in add child: ', currentComponent);
      return {
        ...state,
        lastId: id,
        currentComponent
      };

    case types.DELETE_CHILD:
      childId = action.payload.childId;
      children = clone(state.currentComponent.children);
      for (let i = 0; i < children.length; i++) {
        if (children[i].id === childId) {
          children.splice(i, 1);
        }
      }

      currentComponent = clone(state.currentComponent);
      currentComponent.children = clone(children);
      // console.log('currentComponent in delete child: ', currentComponent);
      return {
        ...state,
        currentComponent
      };

    default:
      return state;
  }
};

export default mainReducer;
