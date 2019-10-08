import React, { Component, useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import clone from 'clone';

class MainDisplayContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <CenteredTree />;
  }
}
const containerStyles = {
  width: '100%',
  height: '100vh',
  backgroundColor: 'lightBlue'
};

//constuctor function for creating a new node, we will primarily be focusing on the this.nodeID as this is the property we will be recursively looking for when we try to find the given node and mutate some data.
function NewComponentNode(id, name = 'Component') {
  this.nodeID = id; /*IMPORTANT*/
  this.name = `${name}, id: ${id}`;
  this.children = [];
}

//constuctor function for creating a history of back and forwards feature, the double linked list will have a prev and next so that we will theoretically never have to loop through the list as long as we insert nodes at the 'head' and make sure we cache the entire node (prev and next values as well) in order to traverse backwards or forwards in time
function DoublyLinkedList(val) {
  this.val = val;
  this.prev = null;
  this.next = null;
}

class CenteredTree extends React.PureComponent {
  constructor(props) {
    super(props);
    // data -state is what is actually rendered as the tree
    //the dummyData -state is the dummy data for 'queueing' up the adding of MULTIPLE children to a parent node so that on the 'UPDATE' onClick it will update the this.state.data with the this.state.dummyData (seen in a function below)
    this.state = {
      data: {
        // actual rendered data so that the tree renders 4 nodes, 2 levels deep
        name: 'Parent Node',
        nodeID: 0,
        children: [
          {
            name: 'child level 1',
            nodeID: 1,
            children: [
              {
                name: 'child level 2',
                nodeID: 3,
                children: []
              }
            ]
          },
          {
            name: 'child level 1',

            nodeID: 2,
            children: []
          }
        ]
      },
      //dummy data : 4 nodes, 2 levels deep
      dummyData: {
        name: 'Parent Node',
        nodeID: 0,
        children: [
          {
            name: 'child level 1',
            nodeID: 1,
            children: [
              {
                name: 'child level 2',
                nodeID: 3,
                children: []
              }
            ]
          },
          {
            name: 'child level 1',
            nodeID: 2,
            children: []
          }
        ]
      },
      history: null,
      uniqueID: 4
      // currentNode: null
    };
    //binding references of 'this' also when creating functions within the scope of a bound function they  be an ES6 arrow function or else they will not have reference to the lexical context in which they were created within
    this.addChildNode = this.addChildNode.bind(this);
    this.reRenderTreeWithDummyData = this.reRenderTreeWithDummyData.bind(this);
    this.deleteAnyNode = this.deleteAnyNode.bind(this);
    this.changeNameOfNode = this.changeNameOfNode.bind(this);
    this.createLinkedNodeForBackAndForwardFeature = this.createLinkedNodeForBackAndForwardFeature.bind(
      this
    );
    this.goBackOrForward = this.goBackOrForward.bind(this);
  }
  componentDidMount() {
    //when mounted create a copy of the state of data and instantiate a new linked list and set the state of history.
    const initialStateOf_Data_BeforeClientInteration = new DoublyLinkedList(
      JSON.stringify(this.state.data)
    );
    // translate sets the state of centering the tree on mount
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 6
      },
      history: initialStateOf_Data_BeforeClientInteration
    });
  }
  //everyTime a user interact and changes state of either data or dummyData we will create a clone of the state and cache it as this.val inside of the node and point the pointers correctly.
  // we want the most current state to  be at the front of the linked list and to go back we would go next.
  createLinkedNodeForBackAndForwardFeature(boolean) {
    //using ES6 arrow func to bind the context of 'this' so that the function createNode can call this.setState
    const createNode = data => {
      const newNode = new DoublyLinkedList(JSON.stringify(data));
      const copyOfHistory = clone(this.state.history);
      newNode.next = copyOfHistory;
      copyOfHistory.prev = newNode;
      this.setState({ history: newNode });
    };
    return boolean
      ? createNode(this.state.dummyData)
      : createNode(this.state.data);
  }
  //updates the state of the the data to trigger a re-render
  reRenderTreeWithDummyData() {
    this.setState({ data: this.state.dummyData });
  }
  // going either next/prev based off of the user input, it doesnt do anything if they try to go into a .next/.prev of NULL
  goBackOrForward(string) {
    const clonedHistory = clone(this.state.history);
    if (string === 'goBackward') {
      if (clonedHistory.next) {
        // const temp = clonedHistory.next;
        // temp.prev = clonedHistory;
        this.setState({
          data: JSON.parse(clonedHistory.next.val),
          history: clonedHistory.next
        });
      } else {
        alert('haha dumbass');
      }
    } else if (string === 'goForward') {
      if (clonedHistory.prev) {
        this.setState({
          data: JSON.parse(clonedHistory.prev.val),
          history: clonedHistory.prev
        });
      } else {
        alert('haha dumbass');
      }
    }
  }

  //traverses the tree and looks for the exact nodeID, once found, we will push a new Node with new values to its children array. (exit and set the state of dummyData) so that it can 'queue' up all the adding of children nodes
  addChildNode(node) {
    const clonedTree = clone(this.state.dummyData);
    const currentNodeID = node.nodeID;
    const addChildren = tree => {
      const tempNewNode = new NewComponentNode(this.state.uniqueID);
      tree.children.push(tempNewNode);
    };
    const findNodeByNodeID = (tree, target) => {
      if (tree.nodeID === target) {
        return addChildren(tree);
      }
      return [...tree.children].find(node => {
        if (node.nodeID === target) {
          return addChildren(node);
        } else if (node.children) return findNodeByNodeID(node, target);
      });
    };
    findNodeByNodeID(clonedTree, currentNodeID);
    //this is how we create the unique ID of the nodes, (very similar to postgresQL where the SERIAL PRIMARY KEY column auto increments even if the row is deleted)
    const increaseuniqueIDByOne = this.state.uniqueID + 1;

    //linked list for back and prev buttons
    this.createLinkedNodeForBackAndForwardFeature(true);
    this.setState({ dummyData: clonedTree, uniqueID: increaseuniqueIDByOne });
  }

  //using the same traversal algorithm to find the node and now SPLICE out the node (we encountered an issue when deleting the node and it was in the beginning of an array)=>
  // when we 'delete' an object inside of an array the object will be deleted however the space within the array will still remain: for example, in [obj1, obj2] if we delete obj1, the array will become [<empty>, obj2] and when we try to set the state with an empty value and index 0 it will crash the entire application
  deleteAnyNode(target) {
    const clonedTree = clone(this.state.data);

    const findNodeByNodeID = (tree, target) => {
      if (tree.nodeID === target) {
        alert('cant delete root node dumbass');
        return true;
      }
      return [...tree.children].find((node, i) => {
        if (node.nodeID === target) {
          tree.children.splice(i, 1);
          return true;
        } else if (node.children) return findNodeByNodeID(node, target);
        return false;
      });
    };
    const hasBeenDeleted = findNodeByNodeID(clonedTree, +target);
    if (hasBeenDeleted) {
      this.setState({ data: clonedTree });
      this.createLinkedNodeForBackAndForwardFeature(false);
    } else {
      console.log('haha dumbass');
    }
  }

  //same algorithm used to find node and now change the name of the node.
  changeNameOfNode(id, input) {
    const clonedTree = clone(this.state.data);
    const findNodeByNodeID = (tree, target, inputName) => {
      if (tree.nodeID === target) {
        tree.name = inputName;
        return true;
      }
      return [...tree.children].find(node => {
        if (node.nodeID === target) {
          node.name = inputName;
          return true;
        } else if (node.children)
          return findNodeByNodeID(node, target, inputName);
        return false;
      });
    };
    const hasBeenDeleted = findNodeByNodeID(clonedTree, +id, input);
    if (hasBeenDeleted) {
      this.setState({ data: clonedTree });
      this.createLinkedNodeForBackAndForwardFeature(false);
    } else {
      console.log('haha dumbass');
    }
  }

  render() {
    return (
      <div id='main-display-container'>
        <button
          style={{
            width: '100px',
            height: '45px',
            backgroundColor: 'cornSilk'
          }}
          onClick={this.reRenderTreeWithDummyData}
        >
          <h1>Update</h1>
        </button>
        <br />
        <div>
          <button
            style={{
              width: '100px',
              height: '45px',
              backgroundColor: 'pink'
            }}
            onClick={() => {
              this.goBackOrForward('goBackward');
            }}
          >
            Back
          </button>
          <button
            style={{
              width: '100px',
              height: '45px',
              backgroundColor: 'pink'
            }}
            onClick={() => {
              this.goBackOrForward('goForward');
            }}
          >
            Forward
          </button>
        </div>

        <h1>Delete Component by Id</h1>
        <form
          id='deleteForm'
          onSubmit={e => {
            e.preventDefault();
            const id = document.getElementById('delete-node');
            this.deleteAnyNode(id.value);
            id.value = '';
          }}
        >
          <input
            style={{
              width: '200px',
              height: '40px',
              backgroundColor: 'pink',
              color: 'black'
            }}
            id='delete-node'
            type='text'
            placeholder='delete a node by inputting an ID'
          />
          <input type='submit' value='deleteForm'></input>
        </form>
        <ChangeName changeNameOfNode={this.changeNameOfNode} />
        <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
          <Tree
            data={this.state.data}
            translate={this.state.translate}
            orientation={'vertical'}
            collapsible={false}
            nodeSvgShape={{
              shape: 'circle',
              shapeProps: { r: '30' }
            }}
            textLayout={{
              textAnchor: 'start',
              x: -30,
              y: -45
            }}
            onClick={nodeData => this.addChildNode(nodeData)}
            transitionDuration={500}
          />
        </div>
      </div>
    );
  }
}
const ChangeName = ({ changeNameOfNode }) => {
  return (
    <div>
      <h1>Edit name of component</h1>
      <form
        id='editName'
        onSubmit={e => {
          e.preventDefault();
          const id = document.getElementById('id');
          const input = document.getElementById('input-name');
          changeNameOfNode(id.value, input.value);
          id.value = '';
          input.value = '';
        }}
      >
        <input
          style={{ width: '200px', height: '40px' }}
          id='id'
          type='text'
          placeholder='id of the node'
        />
        <input
          style={{ width: '300px', height: '40px' }}
          id='input-name'
          type='text'
          placeholder='whats the name of the node, dumbass'
        />
        <input type='submit' value='editName'></input>
      </form>
    </div>
  );
};

export default MainDisplayContainer;
