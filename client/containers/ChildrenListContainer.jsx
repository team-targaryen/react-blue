import React from "react";
import { connect } from "react-redux";
import {
  renameChild,
  changeChildType,
  addChild,
  deleteChild,
  updateTree,
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
      updateTree,
      setTemplatesForComponent
    },
    dispatch
  );

const ChildrenListContainer = props => {
  return (
    <div className="childrenList">
      <h3>Children List</h3>
      <form onSubmit={props.addChild}>
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
      />
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

      <button onClick={props.updateTree}>Update Tree</button>
    </div>
  );
};

const childMaker = (child, idx, renameChild, changeType, deleteChild) => {
  return (
    <EachChild
      key={idx}
      name={child.name}
      childId={child.id}
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
)(ChildrenListContainer);
