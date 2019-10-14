// Props of children list
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  renameChild,
  changeChildType,
  addChild,
  deleteChild
} from '../actions/actions';
import { bindActionCreators } from 'redux';

import EachChild from '../components/EachChild.jsx';

const mapStateToProps = store => ({
  state: store.main,
  currentComponent: store.main.currentComponent
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      renameChild,
      changeChildType,
      addChild,
      deleteChild
    },
    dispatch
  );

const ChildrenList = props => (
  <div id='children-list'>
    <h3>Children List</h3>
    <form onSubmit={props.addChild}>
      <input
        type='text'
        id='add-child-name'
        name='childName'
        placeholder="Enter Child's Name"
      />
      <div className='add-child-container'>
        <input
          id='add-child-container-checkbox'
          name='checkbox'
          type='checkbox'
        />
        <label
          className='container-label'
          htmlFor='add-child-container-checkbox'
        >
          Container
        </label>
      </div>
      <button type='submit'>+</button>
    </form>
    {props.currentComponent.children &&
      props.currentComponent.children.map((child, idx) =>
        childMaker(
          child,
          idx,
          props.renameChild,
          props.changeChildType,
          props.deleteChild
        )
      )}
  </div>
);

const childMaker = (child, idx, renameChild, changeType, deleteChild) => {
  return (
    <EachChild
      key={idx}
      name={child.name}
      childId={child.componentId}
      isContainer={child.isContainer}
      renameChild={renameChild}
      changeType={changeType}
      deleteChild={deleteChild}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildrenList);