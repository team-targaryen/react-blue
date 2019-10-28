import React, {useMemo, useCallback} from 'react';
import File from './File.jsx';

const FileTree = ({ currentComponent, currentSubTreeDisplayToUser, setCurrentComponent, toggleFileTree }) => {
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
  filterFiles(currentSubTreeDisplayToUser);

  const getFileTree = () => {
    return toggleFileTree ? 'hidden' : '';
  };

return (
    <div id='file-tree' className={`${getFileTree()}`}>
      <ul>
        <li key='containerFiles' id='container-files'>
          <h3>Containers</h3>
          <ul>
            {containerFiles.map((file, index) => {
              return currentComponent.componentId === file.componentId ? 
              ( <div key={`currentComponentContainer${index}`} id='current-component-file-tree'>
                <File
                file={file}
                name={file.name}
                setCurrentComponent={setCurrentComponent}
              /></div>) : 
              (<File
                key={index}
                file={file}
                name={file.name}
                setCurrentComponent={setCurrentComponent}
              />)
            })}
          </ul>
        </li>
        <li key='componentFiles' id='component-files'>
          <h3>Components</h3>
          <ul>
            {componentFiles.map((file, index) => {
            return currentComponent.componentId === file.componentId ? 
              ( <div key={`currentComponentComponent${index}`} id='current-component-file-tree'>
                <File
                file={file}
                name={file.name}
                setCurrentComponent={setCurrentComponent}
              /></div>) : 
              (<File
                key={index}
                file={file}
                name={file.name}
                setCurrentComponent={setCurrentComponent}
              />)
            })}
          </ul>
        </li>
      </ul>
    </div>
  );

};

export default React.memo(FileTree);
