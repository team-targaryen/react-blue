import React, { useState, useEffect } from 'react';
import OnClickShowCodeMirror from './OnClickShowCodeMirror.jsx';
/**
 * Current component display: 
 *  name of component
 *  component or container(toggle button to change its attribute)
 *  delete current component (if this component is a parent component, show warning message)
 * _____________________________________________________________________________________________________________________
 * useEffect fn() : to make sure that the name of templates for each child were getting updated on clicks of the D3 tree
 */
const CreateCodeEditor = ({
  syntaxObject,
  index,
  deleteTemplate,
  updateCode
}) => {
  const [isName, setIsName] = useState(syntaxObject.name)
  useEffect(() => {
    if (syntaxObject.name !== isName) {
      setIsName(syntaxObject.name)
    }
  }, [syntaxObject.name])
  return (
    <div key={`showCodeMirror${index}`} className='template-item'>
      <input
        type='text'
        className='change-name'
        value={isName}
        disabled={true}
      />
      <OnClickShowCodeMirror
        code={syntaxObject.code}
        updateCode={updateCode}
        index={index}
        deleteTemplate={deleteTemplate}
      />
    </div>
  );
};
export default CreateCodeEditor;
