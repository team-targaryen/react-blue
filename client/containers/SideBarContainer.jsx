import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  renameComponent,
  changeType,
  deleteComponent,
  setCurrentComponent
} from '../actions/actions';

// import child components
import ComponentDetail from '../components/ComponentDetail.jsx';
import ChildrenListContainer from './ChildrenListContainer.jsx';
import FileTree from '../components/FileTree.jsx';

const mapStateToProps = store => ({
  data: store.main.data,
  currentComponent: store.main.currentComponent
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      renameComponent,
      changeType,
      deleteComponent,
      setCurrentComponent
    },
    dispatch
  );

const SideBarContainer = props => {
  // console.log('currentComponent: ', props.currentComponent);
  return (
    <div className='SideBarContainer' id='sidebar-container'>
      <ComponentDetail
        renameComponent={props.renameComponent}
        changeType={props.changeType}
        deleteComponent={props.deleteComponent}
        currentComponent={props.currentComponent}
      />
      <ChildrenListContainer />
      <FileTree
        data={props.data}
        setCurrentComponent={props.setCurrentComponent}
      />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarContainer);
