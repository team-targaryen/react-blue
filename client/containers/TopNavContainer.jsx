import React from 'react';
import { connect } from 'react-redux';
import JSZip from 'jszip';
import FileSave from 'file-saver';
import { bindActionCreators } from 'redux';
import { undo, redo } from '../actions/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import exportZipFront from '../templates-exports/frontEndFiles.js';
import exportZipFull from '../templates-exports/fullStackFiles.js'


const mapStateToProps = store => ({
  data: store.main.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ undo, redo }, dispatch);

const TopNavContainer = props => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='primary' variant='dark'>
      <Navbar.Brand href='#home'>React-Blue</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <NavDropdown title='Edit' id='collasible-nav-dropdown'>
            <NavDropdown.Item onClick={props.undo}>
              Undo &nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: '11.6px' }}> Ctrl+Z</span>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={props.redo}>
              Redo &nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: '11.6px' }}> Ctrl+Shift+Z</span>
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title='View' id='collasible-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>Horizontal</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>Vertical</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title='Help' id='collasible-nav-dropdown'>
            <NavDropdown.Item href='##'>About</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              href='https://github.com/team-targaryan/react-blue'
              target='_blank'
            >
              {' '}
              GitHub{' '}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>


          <NavDropdown title='Export' id='collasible-nav-dropdown'>
            <NavDropdown.Item onClick={() => exportZipFront(props.data)}>Export FrontEnd</NavDropdown.Item>
            <NavDropdown.Item onClick={() => exportZipFull(props.data)}>Export FullStack</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link eventKey={2} href='#memes'>
            ExSomthing
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNavContainer);
