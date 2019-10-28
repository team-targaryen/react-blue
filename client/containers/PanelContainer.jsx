import React, { useState, useRef, useEffect } from 'react';
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
  useTemplates,
  setTimeoutId,
  showSubTree,
  addOrDeleteNewSubTree,
  deleteSubTreeDropdownItem
} from '../actions/actions';
import ComponentDetail from '../components/ComponentDetail.jsx';
import TemplatingArea from '../components/TemplatingArea.jsx';
import FileTree from '../components/FileTree.jsx';
import PanelNavIcons from '../components/PanelNavIcons.jsx';
import ChildrenList from '../components/ChildrenList.jsx';
import SubTree from '../components/SubTree.jsx';
const mapStateToProps = store => ({
  state: store.main,
  data: store.main.data,
  currentComponent: store.main.currentComponent,
  toggleFileTree: store.main.toggleFileTree,
  templates: store.main.templates,
  nameAndCodeLinkedToComponentId: store.main.nameAndCodeLinkedToComponentId,
  recentTimeoutId: store.main.recentTimeoutId,
  displaySubTreeDropDown: store.main.displaySubTreeDropDown,
  currentlyDisplayedSubTreeId: store.main.currentlyDisplayedSubTreeId,
  currentSubTreeDisplayToUser: store.main.currentSubTreeDisplayToUser
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
      useTemplates,
      setTimeoutId,
      showSubTree,
      addOrDeleteNewSubTree,
      deleteSubTreeDropdownItem
    },
    dispatch
  );
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (value instanceof Object && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj, getCircularReplacer()));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

function checkID_ClearAndSetTimeout(setTimeoutId, recentTimeoutId, state) {
  function setTimeoutAndSendToReducer(setTimeoutId, state) {
    const newSetTimeoutID = setTimeout(() => {
      localStorage.setObj('nameAndCodeLinkedToComponentId', state.nameAndCodeLinkedToComponentId);
      localStorage.setObj('data', state.data);
      localStorage.setObj('currentComponent', state.currentComponent);
      localStorage.setObj('displaySubTreeDropDown', state.displaySubTreeDropDown);
      state.history.next = null;
      state.history.prev = null;
      localStorage.setObj('history', state.history);
      localStorage.setObj('lastId', state.lastId);
      console.log('SUCCESS!!!!')
    }, 10000)
    setTimeoutId(newSetTimeoutID);
  }
  if (!recentTimeoutId) {
    return setTimeoutAndSendToReducer(setTimeoutId, state)
  }
  clearTimeout(recentTimeoutId);
  setTimeoutAndSendToReducer(setTimeoutId, state);
  return;
}
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
  nameAndCodeLinkedToComponentId,
  recentTimeoutId,
  setTimeoutId,
  state,
  displaySubTreeDropDown,
  showSubTree,
  currentlyDisplayedSubTreeId,
  currentSubTreeDisplayToUser,
  addOrDeleteNewSubTree,
  deleteSubTreeDropdownItem
}) => {
  return (
    <div
      key={`templateDropdown${currentComponent.componentId}`}
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
                state={state}
                recentTimeoutId={recentTimeoutId}
                setTimeoutId={setTimeoutId}
                checkID_ClearAndSetTimeout={checkID_ClearAndSetTimeout}
                displaySubTreeDropDown={displaySubTreeDropDown}
                showSubTree={showSubTree}
                currentlyDisplayedSubTreeId={currentlyDisplayedSubTreeId}
                addOrDeleteNewSubTree={addOrDeleteNewSubTree}
              />
              <ChildrenList
                addChild={addChild}
                currentComponent={currentComponent}
                renameChild={renameChild}
                changeChildType={changeChildType}
                deleteChild={deleteChild}
                templates={templates}
                setTemplatesForComponent={setTemplatesForComponent}
                state={state}
                nameAndCodeLinkedToComponentId={nameAndCodeLinkedToComponentId}
                recentTimeoutId={recentTimeoutId}
                setTimeoutId={setTimeoutId}
                checkID_ClearAndSetTimeout={checkID_ClearAndSetTimeout}
                displaySubTreeDropDown={displaySubTreeDropDown}
                showSubTree={showSubTree}
                currentlyDisplayedSubTreeId={currentlyDisplayedSubTreeId}
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
                currentComponent={currentComponent}
                currentSubTreeDisplayToUser={currentSubTreeDisplayToUser}
                setCurrentComponent={setCurrentComponent}
                toggleFileTree={toggleFileTree}
              />
              <TemplatingArea useTemplates={useTemplates} />
            </div>
          </Route>
          <Route path='/templates'>
            <TemplatingArea useTemplates={useTemplates} />
          </Route>
          <Route path='/subTree'>
            <SubTree
              displaySubTreeDropDown={displaySubTreeDropDown}
              setTimeoutId={setTimeoutId}
              recentTimeoutId={recentTimeoutId}
              state={state}
              checkID_ClearAndSetTimeout={checkID_ClearAndSetTimeout}
              showSubTree={showSubTree}
              deleteSubTreeDropdownItem={deleteSubTreeDropdownItem}
            />
          </Route>
        </Switch>
      </MemoryRouter>
    </div>
  );
};

export default React.memo(connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNavContainer));
