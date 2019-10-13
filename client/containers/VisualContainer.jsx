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
} from '../actions/actions';
import hotkeys from 'hotkeys-js';

const containerStyles = {
  width: '100%',
  height: '100vh',
  backgroundColor: 'lightBlue'
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

function DoublyLinkedList(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
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
    },
    dispatch
  );

class VisualContainer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const initialHistory = new DoublyLinkedList(clone(this.props.state));
    // translate sets the state of centering the tree on mount
    const dimensions = this.treeContainer.getBoundingClientRect();
    // this.props.setParentData();
    this.props.setTransAndHistory(
      {
        x: dimensions.width / 2,
        y: dimensions.height / 6
      },
      initialHistory
    );
  }

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
      <div
        id='visual-container'
        style={containerStyles}
        ref={tc => (this.treeContainer = tc)}
      >
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
