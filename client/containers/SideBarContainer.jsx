import React from "react";
import { connect } from "react-redux";
import {
  renameComponent,
  changeType,
  deleteComponent
} from "../actions/actions";
import { bindActionCreators } from "redux";

// import child components
import ComponentDetail from "../components/ComponentDetail.jsx";
import ChildrenListContainer from "./ChildrenListContainer.jsx";
import TemplatingArea from "../components/TemplatingArea.jsx";

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
      deleteComponent
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
      <ChildrenListContainer />
      <TemplatingArea />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarContainer);
