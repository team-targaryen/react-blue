import * as types from '../constants/actionTypes';
import clone from 'clone';

function DoublyLinkedList(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}

const initialState = {
  // data -state is what is actually rendered as the tree
  //the dummyData -state is the dummy data for 'queueing' up the adding of MULTIPLE children to a parent node so that on the 'UPDATE' onClick it will update the this.state.data with the this.state.dummyData (seen in a function below)
  data: {
    // actual rendered data so that the tree renders 4 nodes, 2 levels deep
    name: 'Parent Node',
    isContainer: true,
    id: 0,
    children: []
    },
  translate: {x: null, y: null},
  history: null,
  currentComponent: {
    name: 'Parent Node', 
    id: 0,
    isContainer: true,
    children: []
  },
  lastId: 0
}

const mainReducer = (state=initialState, action) => {
  let isContainer, currentComponent, childId, children, data, inputName, preHistory, history;
  switch(action.type) {

    /******************************* actions for side bar ************************************/

    case types.RENAME_COMPONENT: 
      inputName = action.payload.inputName;
      currentComponent = Object.assign(state.currentComponent, {name: inputName})
      // console.log('rename currentComponent: ', currentComponent);
      return {
          ...state,
          currentComponent
      }

    case types.CHANGE_TYPE:
      isContainer = action.payload.isContainer; 
      // document.getElementById("componentDetailContainerCheckbox").checked = isContainer;
      currentComponent = Object.assign(state.currentComponent, {isContainer});  
      // console.log('change type currentComponent: ', currentComponent);
      return {
          ...state,
          currentComponent
      }

    case types.DELETE_COMPONENT:


    case types.UPDATE_TREE:
      currentComponent = Object.assign(state.currentComponent);
      // check if current component has a name
      if(currentComponent.name === '') {
        currentComponent.name = 'DEFAULT_NAME';
      } 
      // check if any child has empty name, then change it to 'DEFAUL NAME'
      children = clone(currentComponent.children);
      for(let child of children) {
          if(child.name === '') {
              child.name = 'DEFAULT_NAME'
          }
      }

      console.log("state.data: ", state.data);
      data = clone(state.data);
      const findComponentAndUpdate = (tree, currentComponent) => {
        console.log('currentComponent in find: ', currentComponent.id);
        if (tree.id === currentComponent.id) {
          tree.name = currentComponent.name;
          tree.isContainer = currentComponent.isContainer;
          tree.children = clone(currentComponent.children);
          console.log("tree: ", tree);
          console.log("here in update");
          return tree;
        }
        return [...tree.children].find((child) => {
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
      console.log('data in update: ', data);     

      preHistory = clone(state.history);
      history = new DoublyLinkedList(JSON.stringify(data));
      preHistory.next = history;
      history.prev = preHistory;

      console.log('history: ', history);
      
      return {
          ...state,
          data,
          currentComponent,
          history
      }

  /******************************* actions for main container ************************************/

    case types.SET_CURRENT_COMPONENT:
      currentComponent = action.payload.currentComponent;
      console.log('currentComponent in set current: ', currentComponent);
      data = currentComponent;
      while(data.parent) {
        data = Object.assign(data.parent);
      }
      console.log('current data tree: ', data);
      return {
          ...state,
          data,
          currentComponent
      }

    case types.SET_TRANS_AND_HISTORY:
      const translate = action.payload.translate;
      history = action.payload.history;
      return {
          ...state,
          translate,
          history
      }

    case types.UN_DO:
      if(state.history.prev) {
        history = clone(state.history.prev);
        console.log('history in undo: ', history);
        data = JSON.parse(history.value);
        console.log('data in undo: ', data);
        return {
          ...state,
          data,
          history
        }
      } else {
        alert('No more previous');
        return {
          ...state
        }
      }

    case types.RE_DO:
      if(state.history.next) {
        history = clone(state.history.next);
        data = JSON.parse(history.value);
        return {
          ...state,
          data,
          history
        }  
      } else {
        alert('No more next');
        return {
          ...state
        }
      }


  /*********************** actions for current component children list ****************************/

    case types.RENAME_CHILD:
      inputName = action.payload.inputName;
      childId = action.payload.childId;
      children = clone(state.currentComponent.children);
      for(let child of children) {
          if(child.id === childId) {
              child.name = inputName
          }
      }

      currentComponent = Object.assign(state.currentComponent, {children});
      console.log('currentComponent in rename child: ', currentComponent);
      return {
          ...state,
          currentComponent
        }

    case types.CHANGE_CHILD_TYPE:
      isContainer = action.payload.isChecked;
      childId = action.payload.childId;
      children = clone(state.currentComponent.children);
      for(let child of children) {
          if(child.id === childId) {
              child.isContainer = isContainer; 
          }
      }

      currentComponent = Object.assign(state.currentComponent, {children});
      console.log('currentComponent in change child type: ', currentComponent);
      return {
          ...state,
          currentComponent
      }

    case types.ADD_CHILD:
      const name = action.payload.name;
      isContainer = action.payload.isContainer;
      const id = state.lastId + 1;
      const newChild = {
          name,
          id,
          isContainer,
          children: []
      }

      children = clone(state.currentComponent.children) || [];
      children.push(newChild);
      
      currentComponent = Object.assign(state.currentComponent, {children});
      console.log('currentComponent in add child: ', currentComponent);
      return {
          ...state,
          lastId: id,
          currentComponent
      }

    case types.DELETE_CHILD:
      childId = action.payload.childId;
      children = clone(state.currentComponent.children);
      for (let i = 0; i < children.length; i++){
          if (children[i].id === childId){
              children.splice(i, 1);
          }
      };
      
      currentComponent = Object.assign(state.currentComponent, {children});
      console.log('currentComponent in delete child: ', currentComponent);
      return {
          ...state,
          currentComponent
      }

    default:
      return state;
  }
}

export default mainReducer;