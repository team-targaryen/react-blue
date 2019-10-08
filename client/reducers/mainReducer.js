import * as types from "../constants/actionTypes";
import clone from "clone";
const initialState = {
  // data -state is what is actually rendered as the tree
  //the dummyData -state is the dummy data for 'queueing' up the adding of MULTIPLE children to a parent node so that on the 'UPDATE' onClick it will update the this.state.data with the this.state.dummyData (seen in a function below)
  data: {
    // actual rendered data so that the tree renders 4 nodes, 2 levels deep
    name: "Parent Node",
    id: 0,
    isContainer: true,

    children: [
      {
        name: "login",
        id: 1,
        isContainer: true,
        children: [
          {
            name: "button",
            id: 3,
            isContainer: false,
            children: []
          }
        ]
      },
      {
        name: "sign up",
        id: 2,
        isContainer: false,
        children: []
      }
    ]
  },
  //dummy data : 4 nodes, 2 levels deep
  dummyData: {
    name: "Parent Node",
    id: 0,
    isContainer: true,

    children: [
      {
        name: "login",
        id: 1,
        isContainer: true,
        children: [
          {
            name: "button",
            id: 3,
            isContainer: false,
            children: []
          }
        ]
      },
      {
        name: "sign up",
        id: 2,
        isContainer: false,
        children: []
      }
    ]
  },
  translate: { x: null, y: null },
  history: null,
  lastId: 4,
  currentComponent: {
    name: "Parent Node",
    id: 0,
    isContainer: true,

    children: [
      {
        name: "login",
        id: 1,
        isContainer: true,
        children: [
          {
            name: "button",
            id: 3,
            isContainer: false,
            children: []
          }
        ]
      },
      {
        name: "sign up",
        id: 2,
        isContainer: false,
        children: [{ name: "here in signUP", children: [] }]
      }
    ]
  }
};

const mainReducer = (state = initialState, action) => {
  let currentComponent;
  switch (action.type) {
    case types.RENAME_COMPONENT:
      currentComponent = clone(state.data);
      const findNodeByNodeIDForRenameChild = (tree, childId, inputName) => {
        if (tree.id === childId) {
          console.log("trying to delete root node, not allowed");
          console.log(tree.name, inputName);
          tree.name = inputName;
          return;
        }
        return [...tree.children].find((node, i) => {
          if (node.id === childId) {
            node.name = inputName;
          } else if (node.children)
            return findNodeByNodeIDForRenameChild(node, childId, inputName);
        });
      };
      findNodeByNodeIDForRenameChild(
        currentComponent,
        action.payload.childId,
        action.payload.input
      );
      console.log(currentComponent);
      return {
        ...state,
        data: currentComponent
      };

    case types.CHANGE_TYPE:
      currentComponent = clone(state.data);
      const findNodeByNodeIDForChangingType = (tree, id, isContainer) => {
        if (tree.id === id) {
          tree.isContainer = isContainer;
          return;
        }
        return [...tree.children].find((node, i) => {
          if (node.id === id) {
            node.isContainer = isContainer;
          } else if (node.children)
            return findNodeByNodeIDForChangingType(node, id, isContainer);
        });
      };
      findNodeByNodeIDForChangingType(
        currentComponent,
        action.payload.id,
        action.payload.isChecked
      );

      return {
        ...state,
        data: currentComponent
      };

    case types.UPDATE_CHILDRENLIST:
      currentComponent = clone(state.data);
      const findNodeByNodeIDforUpdatingChildrenList = (tree, id, children) => {
        if (tree.id === id) {
          tree.children = children;
          console.log("here in update");
          return;
        }
        return [...tree.children].find((node, i) => {
          if (node.id === id) {
            node.children = children;
          } else if (node.children)
            return findNodeByNodeIDforUpdatingChildrenList(node, id, children);
        });
      };
      findNodeByNodeIDforUpdatingChildrenList(
        currentComponent,
        action.payload.id,
        action.payload.children
      );

      return {
        ...state,
        data: currentComponent
      };

    case types.SET_CURRENT_COMPONENT:
      currentComponent = action.payload;
      return {
        ...state,
        currentComponent
      };

    case types.SET_TRANS_AND_HISTORY:
      const translate = action.payload.translate;
      // console.log('here in switch for set trans', translate)
      return {
        ...state,
        translate,
        history: action.payload.history
      };
    case types.GO_BACK_OR_FORWARD:
      return {
        ...state,
        data: action.payload.dataParsedIntoObject,
        history: action.payload.history
      };

    case types.ADD_CHILD:
      currentComponent = clone(state.currentComponent);
      const findNodeByNodeIDForAddChild = (tree, lastId, newComponentNode) => {
        if (tree.id === lastId) {
          tree.children.push(newComponentNode);
          return;
        }
        return [...tree.children].find((node, i) => {
          if (node.id === lastId) {
            node.children.push(newComponentNode);
          } else if (node.children)
            return findNodeByNodeIDForAddChild(node, lastId, newComponentNode);
        });
      };
      findNodeByNodeIDForAddChild(
        currentComponent,
        action.payload.currentComponent.id,
        action.payload.newComponentNode
      );
      console.log(currentComponent);
      return {
        ...state,
        currentComponent: currentComponent,
        lastId: state.lastId + 1
      };

    case types.DELETE_CHILD:
      currentComponent = clone(state.currentComponent);
      const findNodeByNodeIDForDeleteChild = (tree, deleteId) => {
        if (tree.id === deleteId) {
          console.log("trying to delete root node, not allowed");
          return;
        }
        return [...tree.children].find((node, i) => {
          if (node.id === deleteId) {
            tree.children.splice(i, 1);
          } else if (node.children)
            return findNodeByNodeIDForDeleteChild(node, deleteId);
        });
      };
      findNodeByNodeIDForDeleteChild(currentComponent, action.payload.deleteId);
      return {
        ...state,
        currentComponent: currentComponent
      };

    default:
      return state;
  }
};

export default mainReducer;
