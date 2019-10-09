import * as types from '../constants/actionTypes';
import clone from 'clone';

const initialState = {
    // data -state is what is actually rendered as the tree
    //the dummyData -state is the dummy data for 'queueing' up the adding of MULTIPLE children to a parent node so that on the 'UPDATE' onClick it will update the this.state.data with the this.state.dummyData (seen in a function below)
    data: {
        // actual rendered data so that the tree renders 4 nodes, 2 levels deep
        name: 'Parent Node',
        id: 0,
        isContainer: true,

        children: [
          {
            name: 'login',
            id: 1,
            isContainer: true,
            children: [
              {
                name: 'button',
                id: 3,
                isContainer: false,
                children: []
              }
            ]
          },
          {
            name: 'sign up',
            id: 2,
            isContainer: false,
            children: []
          }
        ]
      },
    //dummy data : 4 nodes, 2 levels deep
    dummyData: {
        name: 'Parent Node',
        id: 0,
        isContainer: true,

        children: [
          {
            name: 'login',
            id: 1,
            isContainer: true,
            children: [
              {
                name: 'button',
                id: 3,
                isContainer: false,
                children: []
              }
            ]
          },
          {
            name: 'sign up',
            id: 2,
            isContainer: false,
            children: []
          }
        ]
    },
    translate: {x: null, y: null},
    history: null,
    lastId: 4,
    currentComponent: {name: 'Parent Node',
        id: 0,
        isContainer: true,

        children: [
          {
              name: 'login',
              id: 1,
              isContainer: true,
              children: [
                {
                    name: 'button',
                    id: 3,
                    isContainer: false,
                    children: []
                }
              ]
          },
          {
              name: 'sign up',
              id: 2,
              isContainer: false,
              children: [{name:'here in signUP', children: []}]
          }
        ]
    }
}

const mainReducer = (state=initialState, action) => {
    let isContainer, currentComponent, childId, children, lastId, inputName;
    switch(action.type) {
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

        case types.UPDATE_CHILDRENLIST:
            children = action.payload.children;
            lastId = action.payload.lastId;

            currentComponent = Object.assign(state.currentComponent, {children});
            // console.log('update children currentComponent: ', currentComponent);
            return {
                ...state,
                lastId,
                currentComponent
            }

        case types.SET_CURRENT_COMPONENT:
            currentComponent = action.payload.currentComponent;
            // console.log('currentComponent: ', currentComponent);
            return {
                ...state,
                currentComponent
            }

        case types.SET_TRANS_AND_HISTORY:
            const translate = action.payload.translate;
            // console.log('here in switch for set trans', translate)
            return {
                ...state,
                translate,
                history: action.payload.history
            }
        case types.GO_BACK_OR_FORWARD:
            return {
                ...state,
                data: action.payload.data,
                history: action.payload.backOrForward
            }
        // case types.CREATE_LINKED_NODE_FOR_BACK_AND_FORWARD:
        //     const isDummy = action.payload;
        //     //using ES6 arrow func to bind the context of 'this' so that the function createNode can call this.setState
        //     isDummy
        //         ? createNode(state.dummyData)
        //         : createNode(state.data);

        //     const createNode = data => {
        //         console.log("in create linked node for back")
        //         const newNode = new DoublyLinkedList(JSON.stringify(data));
        //         const copyOfHistory = clone(state.history);
        //         newNode.next = copyOfHistory;
        //         copyOfHistory.prev = newNode;
        //         return {
        //             ...state,
        //             history: newNode
        //         }
        //     };

        // for current component children list
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