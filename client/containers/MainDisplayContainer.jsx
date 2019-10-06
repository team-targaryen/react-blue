import React, { Component } from "react";
import Tree from "react-d3-tree";
import clone from "clone";

class MainDisplayContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <CenteredTree />;
  }
}

const containerStyles = {
  width: "100%",
  height: "100vh",
  backgroundColor: "lightBlue"
};

function NewComponentNode(level, index, id, name = "Component", children = []) {
  this.level = level;
  this.index = index;
  this.nodeID = id;
  this.name = `${name} ${index},lev: ${level}`;
  this.children = children;
}
function DoublyLinkedList(val) {
  this.val = val;
  this.prev = null;
  this.next = null;
}

class CenteredTree extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "Parent Node",
        level: 0,
        index: 0,
        nodeID: 0,
        children: [
          {
            name: "child level 1",
            level: 1,
            index: 0,
            nodeID: 1,
            children: [
              {
                name: "child level 2",
                level: 2,
                index: 0,
                nodeID: 3,
                children: []
              }
            ]
          },
          {
            name: "child level 1",
            level: 1,
            index: 1,
            nodeID: 2,
            children: []
          }
        ]
      },
      datav2: {
        name: "Parent Node",
        level: 0,
        index: 0,
        nodeID: 0,
        children: [
          {
            name: "child level 1",
            level: 1,
            index: 0,
            nodeID: 1,
            children: [
              {
                name: "child level 2",
                level: 2,
                index: 0,
                nodeID: 3,
                children: []
              }
            ]
          },
          {
            name: "child level 1",
            level: 1,
            index: 1,
            nodeID: 2,
            children: []
          }
        ]
      },
      history: null,
      totalNodes: 4,
      currentNode: null
    };
    this.addChildNode = this.addChildNode.bind(this);
    this.updateTreeWithDummyDataV2 = this.updateTreeWithDummyDataV2.bind(this);
    this.deleteAnyNode = this.deleteAnyNode.bind(this);
    this.changeNameOfNode = this.changeNameOfNode.bind(this);
    this.createLinkedNode = this.createLinkedNode.bind(this);
    this.goBackOrForward = this.goBackOrForward.bind(this);
  }
  componentDidMount() {
    // this.setState({history: new DoublyLinkedList(this.state.data)})
    const dimensions = this.treeContainer.getBoundingClientRect();
    const hello = new DoublyLinkedList(JSON.stringify(this.state.data));
    console.log(hello);
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 6
      },
      history: hello
    });
  }
  createLinkedNode(boolean) {
    //instantiate a new node, and point the initial node.next to it
    const createNode = data => {
      const newNode = new DoublyLinkedList(JSON.stringify(data));
      const copyOfHistory = Object.assign({}, this.state.history);
      newNode.next = copyOfHistory;
      copyOfHistory.prev = newNode;
      console.log("copy of newNode", newNode);
      this.setState({ history: newNode });
    };
    return boolean
      ? createNode(this.state.datav2)
      : createNode(this.state.data);
  }
  updateTreeWithDummyDataV2() {
    this.setState({ data: this.state.datav2 });
  }
  goBackOrForward(string) {
    const clonedHistory = Object.assign({}, this.state.history);
    // console.log("here in gobackorforward", string, typeof string);
    if (string === "goBackward") {
      if (clonedHistory.next) {
        const temp = clonedHistory.next;
        temp.prev = clonedHistory;
        this.setState({
          data: JSON.parse(clonedHistory.next.val),
          history: temp
        });
      } else {
        return console.log("haha dumbass");
      }
    } else if (string === "goForward") {
      console.log(
        "clonedhistory:",
        clonedHistory,
        "prevL:",
        clonedHistory.prev
      );
      if (clonedHistory.prev) {
        this.setState({
          data: JSON.parse(clonedHistory.prev.val),
          history: clonedHistory.prev
        });
      }
    }
  }

  addChildNode(node) {
    const clonedTree = clone(this.state.datav2);
    const currentNodeID = node.nodeID;
    const addChildren = tree => {
      const newLevel = tree.level + 1;
      const newLength = tree.children.length;
      const tempNewNode = new NewComponentNode(
        newLevel,
        newLength,
        this.state.totalNodes
      );
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
    const increaseTotalNodesByOne = this.state.totalNodes + 1;

    //linked list for back and prev buttons
    this.createLinkedNode(true);
    this.setState({ datav2: clonedTree, totalNodes: increaseTotalNodesByOne });
  }

  deleteAnyNode(target) {
    const clonedTree = clone(this.state.data);

    const findNodeByNodeID = (tree, target) => {
      if (tree.nodeID === target) {
        alert("cant delete root node dumbass");
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
      this.createLinkedNode(false);
    } else {
      console.log("hasnt been found");
    }
  }

  changeNameOfNode(id, input) {
    const clonedTree = clone(this.state.data);

    const findNodeByNodeID = (tree, target, inputName) => {
      if (tree.nodeID === target) {
        tree.name = inputName;
        return true;
      }
      return [...tree.children].find((node, i) => {
        if (node.nodeID === target) {
          console.log(inputName);
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
      this.createLinkedNode(false);
    } else {
      console.log("hasnt been found");
    }
  }

  render() {
    return (
      <React.Fragment>
        <button
          style={{
            width: "100px",
            height: "45px",
            backgroundColor: "cornSilk"
          }}
          onClick={this.updateTreeWithDummyDataV2}
        >
          <h1>Update</h1>
        </button>
        <br />
        <div>
          <button
            style={{
              width: "100px",
              height: "45px",
              backgroundColor: "pink"
            }}
            onClick={() => {
              this.goBackOrForward("goBackward");
            }}
          >
            Back
          </button>
          <button
            style={{
              width: "100px",
              height: "45px",
              backgroundColor: "pink"
            }}
            onClick={() => {
              this.goBackOrForward("goForward");
            }}
          >
            Forward
          </button>
        </div>

        <h1>Delete Component by Id</h1>
        <form
          id="deleteForm"
          onSubmit={e => {
            e.preventDefault();
            const id = document.getElementById("delete-node");
            this.deleteAnyNode(id.value);
            id.value = "";
          }}
        >
          <input
            style={{
              width: "200px",
              height: "40px",
              backgroundColor: "pink",
              color: "black"
            }}
            id="delete-node"
            type="text"
            placeholder="delete a node by inputting an ID"
          />
          <input type="submit" value="deleteForm"></input>
        </form>
        <ChangeName changeNameOfNode={this.changeNameOfNode} />
        <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
          <Tree
            data={this.state.data}
            translate={this.state.translate}
            orientation={"vertical"}
            collapsible={false}
            onClick={nodeData => this.addChildNode(nodeData)}
            transitionDuration={0}
          />
        </div>
      </React.Fragment>
    );
  }
}
const ChangeName = ({ changeNameOfNode }) => {
  return (
    <React.Fragment>
      <h1>Edit name of component</h1>
      <form
        id="editName"
        onSubmit={e => {
          e.preventDefault();
          const id = document.getElementById("id");
          const input = document.getElementById("input-name");
          changeNameOfNode(id.value, input.value);
          id.value = "";
          input.value = "";
        }}
      >
        <input
          style={{ width: "200px", height: "40px" }}
          id="id"
          type="text"
          placeholder="id of the node"
        />
        <input
          style={{ width: "300px", height: "40px" }}
          id="input-name"
          type="text"
          placeholder="whats the name of the node, dumbass"
        />
        <input type="submit" value="editName"></input>
      </form>
    </React.Fragment>
  );
};

export default MainDisplayContainer;
