import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  undo,
  redo,
  changeDisplayHorizontalToVertical,
  resetEntireTree
} from '../actions/actions';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import exportZipFront from '../templates-exports/frontEndFiles.js';
import exportZipFull from '../templates-exports/fullStackFiles.js';

const mapStateToProps = store => ({
  data: store.main.data,
  history: store.main.history,
  nameAndCodeLinkedToComponentId: store.main.nameAndCodeLinkedToComponentId
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ 
    undo, 
    redo, 
    changeDisplayHorizontalToVertical, 
    resetEntireTree 
  },
  dispatch
);

const TopNavContainer = ({
  data,
  nameAndCodeLinkedToComponentId,
  history,
  undo,
  redo,
  changeDisplayHorizontalToVertical,
  resetEntireTree
}) => {
  let undoDisabled = () => false;
  let redoDisabled = () => false;
  if (history) {
    undoDisabled = () => {
      return history.prev ? false : true;
    }
    redoDisabled = () => {
      return history.next ? false : true;
    }
  }
  return (
    <Navbar collapseOnSelect expand='lg' variant='dark'>
      <Navbar.Brand href='#home'>React Blue</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <NavDropdown title='Edit' id='collasible-nav-dropdown'>
            <NavDropdown.Item className='keyboard-shortcut' onClick={undo} disabled={undoDisabled()}>
              <span>Undo</span>
              <span>Ctrl+Z</span>
            </NavDropdown.Item>
            <NavDropdown.Item className='keyboard-shortcut' onClick={redo} disabled={redoDisabled()}>
              <span>Redo</span>
              <span>Ctrl+Shift+Z</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              className='keyboard-shortcut'
              onClick={resetEntireTree}
            >
              Delete Tree
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='View' id='collasible-nav-dropdown'>
            <NavDropdown.Item
              onClick={() => {
                changeDisplayHorizontalToVertical('horizontal');
              }}
            >
              Horizontal
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                changeDisplayHorizontalToVertical('vertical');
              }}
            >
              Vertical
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Help' id='collasible-nav-dropdown'>
            <NavDropdown.Item href='##'>About</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              href='https://github.com/team-targaryan/react-blue'
              target='_blank'
            >
              GitHub
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <NavDropdown
            title='Export'
            id='collasible-nav-dropdown'
            className='export'
          >
            <NavDropdown.Item
              onClick={() =>
                exportZipFront(data, nameAndCodeLinkedToComponentId)
              }
            >
              Export FrontEnd
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                exportZipFull(data, nameAndCodeLinkedToComponentId)
              }}
            >
              Export FullStack
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNavContainer);
