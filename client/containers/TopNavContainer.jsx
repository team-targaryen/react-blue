import React from 'react';
import { connect } from 'react-redux';
import JSZip from 'jszip';
import FileSave from 'file-saver';
import indexHTML from '../templates-exports/indexHTML.js';
import indexJS from '../templates-exports/indexJS.js';
import { bindActionCreators } from 'redux';
import { undo, redo } from '../actions/actions';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const mapStateToProps = store => ({
  data: store.main.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ undo, redo }, dispatch);

const exportZip = data => {
  const zip = new JSZip();
  const fileCounter = {};

  const connectFiles = currentComponent => {
    let imports;
    let childComponents;

    if (currentComponent.children) {
      imports = currentComponent.children
        .map(file => {
          if (file.isContainer) {
            return `import ${file.name} from './containers/${file.name}.jsx';\n`;
          } else {
            return `import ${file.name} from './components/${file.name}.jsx';\n`;
          }
        })
        .join('');
      childComponents = currentComponent.children
        .map(file => {
          return `\n<${file.name} />`;
        })
        .join('');
    }

    const template = `import React, { Component } from 'react';
${imports}
class ${currentComponent.name} extends Component {
  state = {  }
  render() { 
    return (
      <div>${childComponents}
      </div>
    );
  }
}
  
export default ${currentComponent.name};
`;

    fileCounter[currentComponent.name] =
      (fileCounter[currentComponent.name] || 0) + 1;

    if (currentComponent.depth === 0) {
      zip.file(`${currentComponent.name}.jsx`, `${template}`);
    } else {
      if (currentComponent.isContainer) {
        if (fileCounter[currentComponent.name] === 1) {
          zip.file(`containers/${currentComponent.name}.jsx`, `${template}`);
        } else {
          zip.file(
            `containers/${currentComponent.name} (${fileCounter[
              currentComponent.name
            ] - 1}).jsx`,
            `${template}`
          );
        }
      } else {
        if (fileCounter[currentComponent.name] === 1) {
          zip.file(`components/${currentComponent.name}.jsx`, `${template}`);
        } else {
          zip.file(
            `components/${currentComponent.name} (${fileCounter[
              currentComponent.name
            ] - 1}).jsx`,
            `${template}`
          );
        }
      }
    }

    if (currentComponent.children) {
      return currentComponent.children.forEach(child => {
        connectFiles(child);
      });
    }
  };

  connectFiles(data);

  zip.file('assets/index.html', indexHTML);
  zip.file('assets/styles/styles.css', '');
  zip.file('index.js', indexJS);

  zip.generateAsync({ type: 'blob' }).then(function(content) {
    saveAs(content, 'react-blue.zip');
  });
};

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
          <Nav.Link onClick={() => exportZip(props.data)}>Export</Nav.Link>
          <Nav.Link eventKey={2} href='#memes'>
            ExSomthing
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNavContainer);
