import * as types from '../constants/actionTypes';
import clone from 'clone';
function easterEgg() {
  const audio = new Audio(
    'https://iringtone.net/rington/file?id=8454&type=sound&name=mp3'
  );
  audio.play();

  const app = document.getElementById('app');
  app.classList.add('secret');

  for (let i = 0; i <= 1000; i += 1) {
    const particle = document.createElement('i');
    particle.classList.add('particle');
    app.appendChild(particle);
  }

  const colorGen = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  setInterval(() => {
    document.querySelector(
      '.navbar'
    ).style.backgroundColor = `${colorGen()}`;

    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].style.backgroundColor = `${colorGen()}`;
    }

    const navIcons = document.getElementsByClassName('fas');
    for (let i = 0; i < navIcons.length; i += 1) {
      navIcons[i].style.color = `${colorGen()}`;
    }

    const icons = document.getElementsByClassName('far');
    for (let i = 0; i < icons.length; i += 1) {
      icons[i].style.color = `${colorGen()}`;
    }

    const nodeBase = document.getElementsByClassName('nodeBase');
    for (let i = 0; i < nodeBase.length; i += 1) {
      nodeBase[i].style.fill = `${colorGen()}`;
    }

    const leafNodeBase = document.getElementsByClassName('leafNodeBase');
    for (let i = 0; i < leafNodeBase.length; i += 1) {
      leafNodeBase[i].style.fill = `${colorGen()}`;
    }
  }, 100);
}

function DoublyLinkedList(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
function deleteChildrenInNameAndCodeLinkedToComponentId(node, obj) {
  if (node instanceof Object) {
    delete obj[node]
    return obj;
  }
  node.forEach(childNode => {
    delete obj[childNode];
    if (childNode.children) {
      delete obj[childNode];
      deleteChildrenInNameAndCodeLinkedToComponentId(childNode.children, obj);
    }
  });
  return obj;
}
const findAndDeleteInCurrentComponent = (tree, currentComponent, parent) => {
  if (tree.componentId === parent.componentId) {
    for (let i = 0; i < tree.children.length; i++) {
      if (tree.children[i].componentId === currentComponent.componentId) {
        tree.children.splice(i, 1);
        parent.children = tree.children.slice();
        return;
      }
    }
  } else if (tree.children) {
    tree.children.forEach(child => {
      return findAndDeleteInCurrentComponent(child, currentComponent, parent);
    });
  }
};
function sendToLocalStorage(nameAndCodeLinkedToComponentId, data, currentComponent, history, lastId) {
  if (nameAndCodeLinkedToComponentId) {
    localStorage.setObj('nameAndCodeLinkedToComponentId', nameAndCodeLinkedToComponentId);
  }
  if (data) {
    localStorage.setObj('data', data);
  }
  if (currentComponent) {
    localStorage.setObj('currentComponent', currentComponent);
  }
  if (history) {
    localStorage.setObj('history', history);
  }
  if (lastId) {
    localStorage.setObj('lastId', lastId);
  }
}
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj, getCircularReplacer()));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

const appComponent = {
  name: 'App',
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
  defaultNameCount: 0,
  templates: [],
  orientation: 'vertical',
  toggleFileTree: true
};

const updateTree = (state, currentComponent) => {
  let defaultNameCount;
  // check if current component has a name
  const data = clone(state.data);
  if (!currentComponent.name) {
    defaultNameCount = state.defaultNameCount + 1;
    currentComponent.name = `Component${defaultNameCount}`;
  }
  // check if any child has empty name, then change it to 'DEFAUL NAME'
  let children = currentComponent.children
  if (children) {
    for (let child of children) {
      if (child.name === '') {
        defaultNameCount = defaultNameCount
          ? defaultNameCount + 1
          : state.defaultNameCount + 1
      }
    }
  } else {
    children = currentComponent
    children.name = currentComponent.name;
  }
  (function findComponentAndUpdate(tree, currentComponent) {
    if (tree.componentId === currentComponent.componentId) {
      tree.name = currentComponent.name;
      tree.isContainer = currentComponent.isContainer;
      tree.children = currentComponent.children
      return;
    }
    if (tree.children) {
      tree.children.forEach(child => {
        return findComponentAndUpdate(child, currentComponent);
      });
    }
  }(data, currentComponent));
  const preHistory = clone(state.history);
  const history = new DoublyLinkedList(
    {
      data,
      currentComponent,
      nameAndCodeLinkedToComponentId: state.nameAndCodeLinkedToComponentId,
      lastId: state.lastId,
      defaultNameCount: state.defaultNameCount
    }
  );
  preHistory.next = history;
  history.prev = preHistory;
  return {
    data,
    currentComponent,
    history,
    defaultNameCount: defaultNameCount
      ? defaultNameCount
      : state.defaultNameCount
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
    lastId, defaultNameCount;
  console.log('maind reducer', state.defaultNameCount)
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
      //grabbing props from state to clone and mututate
      const parent = Object.assign({}, state.currentComponent.parent);
      data = clone(state.data);
      currentComponent = clone(state.currentComponent);
      nameAndCodeLinkedToComponentId = clone(state.nameAndCodeLinkedToComponentId);
      nameAndCodeLinkedToComponentId = deleteChildrenInNameAndCodeLinkedToComponentId(currentComponent, nameAndCodeLinkedToComponentId)
      findAndDeleteInCurrentComponent(data, currentComponent, parent);

      let preHistory = clone(state.history);
      history = new DoublyLinkedList(
        clone({
          data,
          currentComponent: parent,
          nameAndCodeLinkedToComponentId,
          lastId: state.lastId,
          defaultNameCount: state.defaultNameCount
        })
      );
      preHistory.next = history;
      history.prev = preHistory;
      sendToLocalStorage(nameAndCodeLinkedToComponentId, data, currentComponent, history, null);
      return {
        ...state,
        data,
        currentComponent: parent,
        nameAndCodeLinkedToComponentId,
        history
      };

    /******************************* actions for main container ************************************/

    case types.SET_CURRENT_COMPONENT:
      currentComponent = action.payload.currentComponent;
      return {
        ...state,
        currentComponent
      };

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
        sendToLocalStorage(nameAndCodeLinkedToComponentId, data, currentComponent, history, currentComponent.componentId);

        return {
          ...state,
          data,
          history,
          currentComponent,
          nameAndCodeLinkedToComponentId
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
        nameAndCodeLinkedToComponentId = clone(
          history.value.nameAndCodeLinkedToComponentId
        );
        sendToLocalStorage(nameAndCodeLinkedToComponentId, data, currentComponent, history, currentComponent.componentId);
        return {
          ...state,
          data,
          history,
          currentComponent,
          nameAndCodeLinkedToComponentId
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
      children = state.currentComponent.children.slice();
      for (let child of children) {
        if (child.componentId === childId) {
          child.name = inputName;
        }
      }

      currentComponent = clone(state.currentComponent);
      currentComponent.children = children;
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
      currentComponent.children = children;
      updatedState = updateTree(state, currentComponent);

      return {
        ...state,
        ...updatedState
      };

    case types.ADD_CHILD:
      let name, defaultNameCount;
      if (action.payload.name) {
        name = action.payload.name;
        if (name === 'Sandstorm') {
          easterEgg()
        }
      } else {
        defaultNameCount = state.defaultNameCount + 1;
        name = `Component${defaultNameCount}`;
      }

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
      console.log('add child', currentComponent)
      updatedState = updateTree(state, currentComponent);
      nameAndCodeLinkedToComponentId = clone(
        state.nameAndCodeLinkedToComponentId
      );
      nameAndCodeLinkedToComponentId[componentId] = state.templates[0];
      updatedState.history.value.nameAndCodeLinkedToComponentId[componentId] =
        state.templates[0];
      sendToLocalStorage(nameAndCodeLinkedToComponentId, updatedState.data, updatedState.currentComponent, state.history, componentId);
      return {
        ...state,
        ...updatedState,
        nameAndCodeLinkedToComponentId,
        lastId: componentId,
        defaultNameCount: defaultNameCount
          ? defaultNameCount
          : state.defaultNameCount
      };

    case types.DELETE_CHILD:
      childId = action.payload.childId;
      currentComponent = clone(state.currentComponent);

      for (let i = 0; i < currentComponent.children.length; i++) {
        if (currentComponent.children[i].componentId === childId) {
          const [tempNode] = currentComponent.children.splice(i, 1);
          nameAndCodeLinkedToComponentId = clone(
            state.nameAndCodeLinkedToComponentId
          );
          delete nameAndCodeLinkedToComponentId[childId];
          if (tempNode.children && tempNode.children.length > 0) {
            nameAndCodeLinkedToComponentId = deleteChildrenInNameAndCodeLinkedToComponentId(
              tempNode.children,
              nameAndCodeLinkedToComponentId
            );
          }
        }
      }

      updatedState = updateTree(state, currentComponent);
      sendToLocalStorage(nameAndCodeLinkedToComponentId, updatedState.data, updatedState.currentComponent, state.history, null)
      // localStorage.setObj('currentComponent', updatedState.currentComponent);
      // localStorage.setObj(
      //   'nameAndCodeLinkedToComponentId',
      //   nameAndCodeLinkedToComponentId
      // );
      // localStorage.setObj('data', updatedState.data);
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
      if (!nameAndCodeLinkedToComponentId['0']) {
        nameAndCodeLinkedToComponentId['0'] = templates[0];
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
        'nameAndCodeLinkedToComponentId',
        nameAndCodeLinkedToComponentId
      );
      return {
        ...state,
        history,
        nameAndCodeLinkedToComponentId
      };
    case types.ZOOM_BY_CHANGING_X_AND_Y:
      translate = Object.assign({}, state.translate);
      translate.x += action.payload.x;
      translate.y += action.payload.y;
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
      history = action.payload.history
      history.prev = null;
      defaultNameCount = lastId - 1;
      // console.log('udate state', history)
      return {
        ...state,
        data,
        currentComponent,
        nameAndCodeLinkedToComponentId,
        lastId,
        history,
        defaultNameCount
      };
    case types.RESET_ENTIRE_TREE:
      localStorage.clear();
      location.reload(true);
      return {
        ...state
      };

    // file tree toggle
    case types.SHOW_FILE_TREE:
      const newToggleFileTree = state.toggleFileTree;

      return {
        ...state,
        toggleFileTree: !newToggleFileTree
      };
    default:
      return state;
  }
};

export default mainReducer;
