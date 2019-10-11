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

const containerStyles = {
  width: '100%',
  height: '100vh',
  backgroundColor: 'lightBlue'
};

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

class MainDisplayContainer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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

  render() {
    return (
      <div id='main-display-container'>
        <div>
          <button
            style={{
              width: '100px',
              height: '45px',
              backgroundColor: 'pink'
            }}
            onClick={this.props.undo}
          >
            Undo
          </button>
          <button
            style={{
              width: '100px',
              height: '45px',
              backgroundColor: 'pink'
            }}
            onClick={this.props.redo}
          >
            Redo
          </button>
        </div>

        <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
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
              console.log('currentComponent: ', currentComponent);
              this.props.setCurrentComponent(currentComponent);
            }}
            transitionDuration={500}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainDisplayContainer);
