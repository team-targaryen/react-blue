import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    renameComponent,
    changeType,
    deleteComponent,
    updateChildrenList
} from '../actions/actions';
import { bindActionCreators } from 'redux';

// import child components
import ComponentDetail from '../components/ComponentDetail.jsx';
import ChildrenList from '../components/ChildrenList.jsx';
// import FileStructure from '../components/FileStructure.jsx';

const mapStateToProps = (store) => ({
    state: store.main,
    componentList: store.main.componentList,
    currentComponent: store.main.currentComponent,
    lastId: store.main.lastId
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
    { 
    renameComponent,
    changeType,
    deleteComponent,
    updateChildrenList
    }, 
    dispatch);

const SideBarContainer = (props) => ( 
    <div className="SideBarContainer">
        <ComponentDetail 
            renameComponent={props.renameComponent}
            changeType={props.changeType}
            deleteComponent={props.deleteComponent}
            currentComponent={props.currentComponent}
        />
        <ChildrenList 
            updateChildrenList={props.updateChildrenList}
            currentComponent={props.currentComponent}
            lastId={props.lastId}
        />
    </div> 
);

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);

