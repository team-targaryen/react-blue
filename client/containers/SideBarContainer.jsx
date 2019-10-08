import React, { Component } from "react";
import { connect } from "react-redux";
import {
  renameComponent,
  changeType,
  deleteComponent,
  updateChildrenList,
  addChild,
  deleteChild
} from "../actions/actions";
import { bindActionCreators } from "redux";

// import child components
import ComponentDetail from "../components/ComponentDetail.jsx";
import ChildrenList from "../components/ChildrenList.jsx";
// import FileStructure from '../components/FileStructure.jsx';

const mapStateToProps = store => ({
  state: store.main,
  currentComponent: store.main.currentComponent,
  lastId: store.main.lastId
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      renameComponent,
      changeType,
      deleteComponent,
      updateChildrenList,
      addChild,
      deleteChild
    },
    dispatch
  );

const SideBarContainer = props => {
  // console.log("currentComponent: ", props.currentComponent)
  return (
    <div className="SideBarContainer" id="sidebar-container">
      <ComponentDetail
        renameComponent={props.renameComponent}
        changeType={props.changeType}
        deleteComponent={props.deleteComponent}
        currentComponent={props.currentComponent}
      />
      <ChildrenList
        renameComponent={props.renameComponent}
        updateChildrenList={props.updateChildrenList}
        currentComponent={props.currentComponent}
        lastId={props.lastId}
        addChild={props.addChild}
        deleteChild={props.deleteChild}
      />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarContainer);
