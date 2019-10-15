import * as types from "../constants/actionTypes";
import clone from "clone";

function DoublyLinkedList(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj, getCircularReplacer()));
};
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
};

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
  nameAndCodeLinkedToComponentId: {},
  lastId: 0,
  templates: [],
  orientation: "vertical"
};
function resetTree(history) {
  let obj = {
    data: {
      name: "App",
      depth: 0,
      id: 0,
      componentId: 0,
      isContainer: true,
      children: []
    },
    translate: { x: 0, y: 0 },
    history: history,
    currentComponent: {
      name: "App",
      depth: 0,
      id: 0,
      componentId: 0,
      isContainer: true,
      children: []
    },
    nameAndCodeLinkedToComponentId: {},
    lastId: 0,
    templates: [],
    orientation: "vertical"
  };
  return obj;
}
const updateTree = (state, currentComponent) => {
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
  const findComponentAndUpdate = (tree, currentComponent) => {
    if (tree.componentId === currentComponent.componentId) {
      tree.name = currentComponent.name;
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

  const data = clone(state.data);
  findComponentAndUpdate(data, currentComponent);
  const nameAndCodeLinkedToComponentId = clone(
    state.nameAndCodeLinkedToComponentId
  );
  const preHistory = clone(state.history);
  const history = new DoublyLinkedList(
    clone({
      data,
      currentComponent,
      nameAndCodeLinkedToComponentId
    })
  );
  preHistory.next = history;
  history.prev = preHistory;
  //setting local storage each of these props
  localStorage.setObj("data", Object.assign({}, state.data));
  localStorage.setObj(
    "currentComponent",
    Object.assign({}, state.currentComponent)
  );

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
    nameAndCodeLinkedToComponentId,
    lastId;
  // console.log(state.data, state.currentComponent);
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
        let parent = clone(currentComponent.parent);
        // console.log('parent in find and delete: ', parent);

        if (tree.componentId === parent.componentId) {
          for (let i = 0; i < tree.children.length; i++) {
            if (tree.children[i].componentId === currentComponent.componentId) {
              tree.children.splice(i, 1);
              return;
            }
          }
        }
        if (tree.children) {
          tree.children.forEach(child => {
            return findAndDelete(child, currentComponent);
          });
        }
      };

      data = clone(state.data);
      currentComponent = clone(state.currentComponent.parent);
      findAndDelete(data, state.currentComponent);

      let preHistory = clone(state.history);
      history = new DoublyLinkedList(
        clone({
          data,
          currentComponent: data
        })
      );
      preHistory.next = history;
      history.prev = preHistory;

      document.getElementById("component-name-input").value = data.name;

      return {
        ...state,
        data,
        currentComponent: data,
        history
      };

    /******************************* actions for main container ************************************/

    case types.SET_CURRENT_COMPONENT:
      currentComponent = action.payload.currentComponent;
      // console.log('currentComponent: ', currentComponent);
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
        nameAndCodeLinkedToComponentId = clone(
          history.value.nameAndCodeLinkedToComponentId
        );
        return {
          ...state,
          data,
          history,
          currentComponent,
          nameAndCodeLinkedToComponentId
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
        nameAndCodeLinkedToComponentId = clone(
          history.value.nameAndCodeLinkedToComponentId
        );
        return {
          ...state,
          data,
          history,
          currentComponent,
          nameAndCodeLinkedToComponentId
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

      children = state.currentComponent.children
        ? state.currentComponent.children.slice()
        : [];
      children.push(newChild);
      currentComponent = clone(state.currentComponent);
      currentComponent.children = children.slice();

      updatedState = updateTree(state, currentComponent);
      nameAndCodeLinkedToComponentId = clone(
        state.nameAndCodeLinkedToComponentId
      );
      nameAndCodeLinkedToComponentId[componentId] = state.templates[0];
      updatedState.history.value.nameAndCodeLinkedToComponentId[componentId] =
        state.templates[0];
      localStorage.setObj("data", updatedState.data);
      localStorage.setObj("currentComponent", updatedState.currentComponent);
      localStorage.setObj("lastId", componentId);
      return {
        ...state,
        ...updatedState,
        nameAndCodeLinkedToComponentId,
        lastId: componentId
      };

    case types.DELETE_CHILD:
      childId = action.payload.childId;
      currentComponent = clone(state.currentComponent);
      function recursivelyDeleteChildren(node, obj) {
        node.forEach(childNode => {
          if (childNode.children) {
            delete obj[childNode[componentId]];
            recursivelyDeleteChildren(childNode.children, map);
          }
          delete obj[childNode[componentId]];
        });
        return map;
      }
      for (let i = 0; i < currentComponent.children.length; i++) {
        if (currentComponent.children[i].componentId === childId) {
          const [tempNode] = currentComponent.children.splice(i, 1);
          nameAndCodeLinkedToComponentId = clone(
            state.nameAndCodeLinkedToComponentId
          );
          delete nameAndCodeLinkedToComponentId[childId];
          if (tempNode.children && tempNode.children.length > 0) {
            nameAndCodeLinkedToComponentId = recursivelyDeleteChildren(
              tempNode.children,
              nameAndCodeLinkedToComponentId
            );
          }
        }
      }

      updatedState = updateTree(state, currentComponent);
      localStorage.setObj("currentComponent", updatedState.currentComponent);
      localStorage.setObj(
        "nameAndCodeLinkedToComponentId",
        nameAndCodeLinkedToComponentId
      );
      return {
        ...state,
        ...updatedState,
        nameAndCodeLinkedToComponentId
      };

    case types.USE_TEMPLATES:
      let templates = [...action.payload.templates];
      nameAndCodeLinkedToComponentId = clone(
        state.nameAndCodeLinkedToComponentId
      );
      if (!nameAndCodeLinkedToComponentId["0"]) {
        nameAndCodeLinkedToComponentId["0"] = templates[0];
      }
      return {
        ...state,
        nameAndCodeLinkedToComponentId,
        templates
      };
    case types.SET_TEMPLATES_FOR_COMPONENT:
      nameAndCodeLinkedToComponentId = clone(
        state.nameAndCodeLinkedToComponentId
      );
      nameAndCodeLinkedToComponentId[
        action.payload.currentComponent.componentId
      ] = action.payload.template;
      history = clone(state.history);
      history.value.nameAndCodeLinkedToComponentId[
        action.payload.currentComponent.componentId
      ] = action.payload.template;
      localStorage.setObj(
        "nameAndCodeLinkedToComponentId",
        nameAndCodeLinkedToComponentId
      );
      return {
        ...state,
        history,
        nameAndCodeLinkedToComponentId
      };
    case types.ZOOM_BY_CHANGING_X_AND_Y:
      // console.log(action.payload);
      translate = Object.assign({}, state.translate);
      translate.x += action.payload.x;
      translate.y += action.payload.y;
      // console.log(translate);
      return {
        ...state,
        translate
      };
    case types.CHANGE_DISPLAY_HORIZONTAL_OR_VERTICAL:
      return {
        ...state,
        orientation: action.payload
      };
    case types.UPDATE_STATE_WITH_LOCAL_STORAGE:
      data = action.payload.data;
      currentComponent = action.payload.currentComponent;
      nameAndCodeLinkedToComponentId =
        action.payload.nameAndCodeLinkedToComponentId;
      lastId = action.payload.lastId;
      return {
        ...state,
        data,
        currentComponent,
        nameAndCodeLinkedToComponentId,
        lastId
      };
    case types.RESET_ENTIRE_TREE:
      const resetState = resetTree(state.history);
      return {
        ...resetState
      };
    default:
      return state;
  }
};

export default mainReducer;
