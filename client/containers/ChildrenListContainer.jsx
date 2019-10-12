import React, { useState } from "react";
import { connect } from "react-redux";
import {
  renameChild,
  changeChildType,
  addChild,
  deleteChild,
  setTemplatesForComponent
} from "../actions/actions";
import { bindActionCreators } from "redux";
import "bootstrap/dist/css/bootstrap.min.css";
import EachChild from "../components/EachChild.jsx";
import clone from "clone";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownTemplates from "../components/DropdownTemplates.jsx";

const mapStateToProps = store => ({
  state: store.main,
  currentComponent: store.main.currentComponent,
  templates: store.main.templates
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      renameChild,
      changeChildType,
      addChild,
      deleteChild,
      setTemplatesForComponent
    },
    dispatch
  );

const ChildrenListContainer = props => {
  return (
    <div className="childrenList">
      <h3>Children List</h3>
      <form
        onSubmit={e => {
          props.addChild(e);
        }}
      >
        <input
          type="text"
          id="addChildName"
          name="childName"
          placeholder="Enter Child's Name"
        />
        <input id="addChildContainerCheckbox" name="checkbox" type="checkbox" />
        <span className="containerLabel">Container</span>
        <button type="submit">+</button>
      </form>
      <DropdownTemplates
        templates={props.templates}
        setTemplatesForComponent={props.setTemplatesForComponent}
        currentComponent={props.currentComponent}
      />
      {props.currentComponent.children &&
        props.currentComponent.children.map((child, idx) => {
          return (
            <EachChild
              key={idx}
              name={child.name}
              childId={child.componentId}
              isContainer={child.isContainer}
              renameChild={props.renameChild}
              changeType={props.changeType}
              deleteChild={props.deleteChild}
              templates={props.templates}
              setTemplatesForComponent={props.setTemplatesForComponent}
              currentComponent={props.currentComponent}
            />
          );
        })}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildrenListContainer);
