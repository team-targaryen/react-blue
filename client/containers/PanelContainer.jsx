import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import {
  renameComponent,
  changeType,
  deleteComponent,
  setCurrentComponent
} from '../actions/actions';
import ComponentDetail from '../components/ComponentDetail.jsx';
import ChildrenListContainer from './ChildrenListContainer.jsx';
import TemplatingArea from '../components/TemplatingArea.jsx';
import FileTree from '../components/FileTree.jsx';
import SideNavIcons from '../components/SideNavIcons.jsx';

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

const SideNavContainer = props => {
  return (
    <div id='panel-container'>
      <div id='panel-top'>
        <ComponentDetail
          renameComponent={props.renameComponent}
          changeType={props.changeType}
          deleteComponent={props.deleteComponent}
          currentComponent={props.currentComponent}
        />
        <ChildrenListContainer />
      </div>
      <div id='divider'></div>
      <div id='panel-bottom'>
        <MemoryRouter>
          <SideNavIcons />
          <Switch>
            <Route path='/' exact render={() => <TemplatingArea />} />
            <Route
              path='/file-tree'
              render={() => (
                <FileTree
                  data={props.data}
                  setCurrentComponent={props.setCurrentComponent}
                />
              )}
            />
          </Switch>
        </MemoryRouter>
      </div>
    </div>
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNavContainer);
