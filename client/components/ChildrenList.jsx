import React, { Component } from "react";
import clone from "clone";

import EachChild from "./EachChild.jsx";

class ChildrenList extends Component {
  constructor(props) {
    super(props);
    this.changeType = this.changeType.bind(this);
    this.addChildOrDelete = this.addChildOrDelete.bind(this);
  }
  changeType(event, childId) {
    let clonedChildrenList = clone(this.state.tempChildrenList);
    for (let child of childrenList) {
      if (child.id === childId) {
        child.isContainer = event.target.checked;
      }
    }
  }

  addChildOrDelete(boolean, event, currentComponent) {
    if (boolean) {
      const addChildName = document.getElementById("addChildName");
      const name = addChildName.value || "DEFAULT NAME";
      document.getElementById("addChildName").value = "";
      const id = this.props.lastId + 1;
      console.log("id");
      const addChildContainerForCheckBox = document.getElementById(
        "addChildContainerCheckbox"
      );
      const isContainer = addChildContainerForCheckBox.checked;
      document.getElementById("addChildContainerCheckbox").checked = false;
      const newChild = {
        name,
        id,
        isContainer,
        children: []
      };
      this.props.addChild(id, currentComponent, newChild);
    } else {
      this.props.deleteChild(currentComponent.id);
    }
  }

  render() {
    let displayChildrenInDropDown = [];
    if (this.props.currentComponent.children) {
      displayChildrenInDropDown = this.props.currentComponent.children.map(
        (child, idx) => {
          return ChildMaker(
            child,
            idx,
            this.props.renameComponent,
            this.props.changeType,
            this.props.deleteChild
          );
        }
      );
    }
    return (
      <div className="childrenList">
        <h3>Children List</h3>
        <form onSubmit={this.addChild}>
          <input
            type="text"
            id="addChildName"
            name="childName"
            placeholder="Enter Child's Name"
          />
          <input
            id="addChildContainerCheckbox"
            name="checkbox"
            type="checkbox"
          />
          <span className="containerLabel">Container</span>
          <button
            onClick={event => {
              event.preventDefault();
              console.log("here in clicked");
              this.addChildOrDelete(true, event, this.props.currentComponent);
            }}
          >
            +
          </button>
        </form>
        {displayChildrenInDropDown}
        <button
          onClick={() => {
            console.log(
              "here in onclick for update children",
              this.props.currentComponent.children,
              this.props.currentComponent.id
            );

            this.props.updateChildrenList(
              this.props.currentComponent.children,
              this.props.currentComponent.id
            );
          }}
        >
          Update Children
        </button>
      </div>
    );
  }
}

const ChildMaker = (child, idx, renameComponent, changeType, deleteChild) => {
  return (
    <EachChild
      key={`${idx}`}
      child={child}
      renameComponent={renameComponent}
      changeType={changeType}
      deleteChild={deleteChild}
    />
  );
};

export default ChildrenList;
