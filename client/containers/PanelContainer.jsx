import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MemoryRouter, Link, Switch, Route } from 'react-router-dom';
import {
  renameComponent,
  changeType,
  deleteComponent,
  setCurrentComponent
} from '../actions/actions';
// import child components
import ComponentDetail from '../components/ComponentDetail.jsx';
import ChildrenListContainer from './ChildrenListContainer.jsx';
import TemplatingArea from '../components/TemplatingArea.jsx';
import FileTree from '../components/FileTree.jsx';
import SideNavContainer from './SideNavContainer.jsx';

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
  return (
    <MemoryRouter>
      <div className='SideBarContainer' id='sidebar-container'>
        <SideNavContainer />
        <Switch>
          <Route
            path='/component-detail'
            render={() => (
              <ComponentDetail
                renameComponent={props.renameComponent}
                changeType={props.changeType}
                deleteComponent={props.deleteComponent}
                currentComponent={props.currentComponent}
              />
            )}
          />
          <Route
            path='/children-list'
            render={() => <ChildrenListContainer />}
          />
          <Route path='/templates' render={() => <TemplatingArea />} />
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
      </div>
    </MemoryRouter>
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarContainer);
