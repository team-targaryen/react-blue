import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import {
  renameChild,
  changeChildType,
  addChild,
  deleteChild,
  renameComponent,
  changeType,
  deleteComponent,
  setCurrentComponent,
  showFileTree,
  setTemplatesForComponent,
  useTemplates
} from '../actions/actions';
import ComponentDetail from '../components/ComponentDetail.jsx';
import TemplatingArea from '../components/TemplatingArea.jsx';
import FileTree from '../components/FileTree.jsx';
import PanelNavIcons from '../components/PanelNavIcons.jsx';
import ChildrenList from '../components/ChildrenList.jsx';

const mapStateToProps = store => ({
  state: store.main,
  data: store.main.data,
  currentComponent: store.main.currentComponent,
  toggleFileTree: store.main.toggleFileTree,
  templates: store.main.templates,
  nameAndCodeLinkedToComponentId: store.main.nameAndCodeLinkedToComponentId
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      renameChild,
      changeChildType,
      addChild,
      deleteChild,
      renameComponent,
      changeType,
      deleteComponent,
      setCurrentComponent,
      showFileTree,
      setTemplatesForComponent,
      useTemplates
    },
    dispatch
  );

const SideNavContainer = ({
  data,
  currentComponent,
  templates,
  renameChild,
  changeChildType,
  addChild,
  deleteChild,
  renameComponent,
  changeType,
  showFileTree,
  toggleFileTree,
  deleteComponent,
  setCurrentComponent,
  setTemplatesForComponent,
  useTemplates,
  nameAndCodeLinkedToComponentId
}) => {
  console.log('Inside PanelContainer.jsx')
  return (
    <div
      key={`templateDropdown-${currentComponent.componentId}`}
      id='panel-container'
    >
      <MemoryRouter>
        <PanelNavIcons />
        <div className='divider-panel'></div>
        <Switch>
          <Route path='/' exact>
            <div id='component-detail'>
              <ComponentDetail
                renameComponent={renameComponent}
                changeType={changeType}
                deleteComponent={deleteComponent}
                currentComponent={currentComponent}
                templates={templates}
                setTemplatesForComponent={setTemplatesForComponent}
                nameAndCodeLinkedToComponentId={nameAndCodeLinkedToComponentId}
              />
              <ChildrenList
                addChild={addChild}
                currentComponent={currentComponent}
                renameChild={renameChild}
                changeChildType={changeChildType}
                deleteChild={deleteChild}
                templates={templates}
                setTemplatesForComponent={setTemplatesForComponent}
                nameAndCodeLinkedToComponentId={nameAndCodeLinkedToComponentId}
              />
              <div className='divider-panel'></div>
              <button
                id='toggle-file-tree'
                onClick={() => {
                  showFileTree();
                }}
              >
                Toggle File Tree
              </button>
              <FileTree
                data={data}
                setCurrentComponent={setCurrentComponent}
                toggleFileTree={toggleFileTree}
              />
              <TemplatingArea useTemplates={useTemplates} />
            </div>
          </Route>
          <Route path='/templates'>
            <TemplatingArea useTemplates={useTemplates} />
          </Route>
        </Switch>
      </MemoryRouter>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNavContainer);
