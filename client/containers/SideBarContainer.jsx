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
// import ChildrenList from '../components/ChildrenList.jsx';
// import FileStructure from '../components/FileStructure.jsx';

const mapStateToProps = (store) => ({
    componentList: store.main.componentList,
    currentComponentId: store.main.currentComponentId
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
    { 
    renameComponent,
    changeType,
    deleteComponent,
    updateChildrenList
    }, 
    dispatch);

const SideBarContainer = (props) => {
    
    return ( 
    <div className="SideBarContainer">
        <ComponentDetail 
            renameComponent={props.renameComponent}
            changeType={props.changeType}
            deleteComponent={props.deleteComponent}
            currentComponentId={props.currentComponentId}
            isComponent={props.componentList[props.currentComponentId].isComponent}
        />
        {/* <ChildrenList 
            updateChildrenList={props.updateChildrenList}
            componentList={props.componentList} 
        /> */}
    </div> 
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);

