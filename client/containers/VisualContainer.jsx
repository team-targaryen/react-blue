import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import Tree from "react-d3-tree";
import clone from "clone";
import { bindActionCreators } from "redux";
import {
  setCurrentComponent,
  setTransAndHistory,
  undo,
  redo,
  updateStateWithLocalStorage
  // setZoom
} from "../actions/actions";
import hotkeys from "hotkeys-js";

function DoublyLinkedList(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

function getRidOfStupidChildren(data) {
  if (!data.children) {
    return;
  }
  if (data.children && !data.children.length) {
    data._children = null;
    return;
  }
  data.children.forEach(node => {
    getRidOfStupidChildren(node);
  });
}

const mapStateToProps = store => ({
  state: store.main,
  data: store.main.data,
  translate: store.main.translate,
  currentComponent: store.main.currentComponent,
  orientation: store.main.orientation
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentComponent,
      setTransAndHistory,
      undo,
      redo,
      updateStateWithLocalStorage
      // setZoom
    },
    dispatch
  );

class VisualContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: this.props.translate,
      intervalId: 0
    };

    // this.setZoom = this.setZoom.bind(this);
  }
  // let intervalId = 0;
  componentDidMount() {
    const data = localStorage.getObj("data");
    if (data) {
      const nameAndCodeLinkedToComponentId = localStorage.getObj(
        "nameAndCodeLinkedToComponentId"
      );
      const currentComponent = localStorage.getObj("currentComponent");
      const lastId = localStorage.getObj("lastId");
      const history = localStorage.getObj('history')
      this.props.updateStateWithLocalStorage(
        data,
        currentComponent,
        nameAndCodeLinkedToComponentId,
        lastId,
        history
      );
    }
    const initialHistory = new DoublyLinkedList(clone(this.props.state));
    // translate sets the state of centering the tree on mount
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.props.setTransAndHistory(
      {
        x: dimensions.width / 2,
        y: dimensions.height / 6
      },
      initialHistory
    );
  }

  // setZoom(currentComponent) {
  //   let x = this.props.translate.x
  //   let y = this.props.translate.y
  //   this.setState({translate:{x: x + currentComponent.x, y: y +currentComponent.y}});
  //   console.log(this.props.translate);
  //   console.log(currentComponent);
  // }
  render() {
    const undoFunc = this.props.undo;
    const redoFunc = this.props.redo;
    hotkeys("ctrl+z, ctrl+shift+z", function (event, handler) {
      event.preventDefault();
      switch (handler.key) {
        case "ctrl+z":
          undoFunc();
          return;

        case "ctrl+shift+z":
          redoFunc();
          break;
      }
    });
    getRidOfStupidChildren(this.props.data);
    return (
      <div id="visual-container" ref={tc => (this.treeContainer = tc)}>
        <Tree
          data={this.props.data}
          translate={this.props.translate}
          orientation={this.props.orientation}
          collapsible={false}
          nodeSvgShape={{
            // for the circle
            // shape: "circle",
            // shapeProps: { r: "30" }

            // for the square shape
            shape: "rect",
            shapeProps: {
              width: 30,
              height: 30,
              x: -15,
              y: -15
            }

            // for the star shape
            // shape: "polygon",
            // shapeProps: {
            //   points: "0 -20, 5 0, 20 0, 10 10, 15 25, 0 15, -15 25, -10 10, -20 0, -5 0"
            // }
          }}
          textLayout={{
            textAnchor: "start",
            x: 0,
            y: -30
          }}
          onClick={currentComponent => {
            this.props.setCurrentComponent(currentComponent);
            // this.setZoom(currentComponent);
          }}
          transitionDuration={500}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualContainer);
