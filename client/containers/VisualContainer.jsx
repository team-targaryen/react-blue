import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Tree from 'react-d3-tree';
import clone from 'clone';
import { bindActionCreators } from 'redux';
import {
  setCurrentComponent,
  setTransAndHistory,
  undo,
  redo
  // setZoom
} from '../actions/actions';
import hotkeys from 'hotkeys-js';

function DoublyLinkedList(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}

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
  translate: store.main.translate
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentComponent,
      setTransAndHistory,
      undo,
      redo
      // setZoom
    },
    dispatch
  );

class VisualContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.state = {
    //   translate: this.props.translate
    // };
    // this.setZoom = this.setZoom.bind(this);
  }

  componentDidMount() {
    const initialHistory = new DoublyLinkedList(clone(this.props.state));
    // translate sets the state of centering the tree on mount
    const dimensions = this.treeContainer.getBoundingClientRect();
    // console.log("here in component did mount", this.state.tree);
    // this.props.setParentData();
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
    hotkeys('ctrl+z, ctrl+shift+z', function(event, handler) {
      event.preventDefault();
      switch (handler.key) {
        case 'ctrl+z':
          undoFunc();
          return;

        case 'ctrl+shift+z':
          redoFunc();
          break;
      }
    });

    getRidOfStupidChildren(this.props.data);
    return (
      <div id='visual-container' ref={tc => (this.treeContainer = tc)}>
        <Tree
          data={this.props.data}
          translate={this.props.translate}
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
