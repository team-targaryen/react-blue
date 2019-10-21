import React from 'react';
import File from './File.jsx';

const FileTree = ({ data, setCurrentComponent, toggleFileTree }) => {
  console.log('Inside of FileTree.jsx')
  const containerFiles = [];
  const componentFiles = [];

  const filterFiles = currentComponent => {
    if (currentComponent.isContainer) {
      containerFiles.push(currentComponent);
    } else {
      componentFiles.push(currentComponent);
    }
    if (currentComponent.children) {
      return currentComponent.children.forEach(child => {
        filterFiles(child);
      });
    }
  };

  filterFiles(data);

  const getFileTree = () => {
    return toggleFileTree ? 'hidden' : '';
  };

  return (
    <div id='file-tree' className={`${getFileTree()}`}>
      <ul>
        <li key='container-files' id='container-files'>
          <h3>Containers</h3>
          <ul>
            {containerFiles.map((file, index) => (
              <File
                key={index}
                file={file}
                name={file.name}
                setCurrentComponent={setCurrentComponent}
              />
            ))}
          </ul>
        </li>
        <li key='component-files' id='component-files'>
          <h3>Components</h3>
          <ul>
            {componentFiles.map((file, index) => (
              <File
                key={index}
                data={data}
                file={file}
                name={file.name}
                setCurrentComponent={setCurrentComponent}
              />
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default FileTree;
