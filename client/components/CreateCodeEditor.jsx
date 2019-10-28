import React, { useState, useEffect } from 'react';
import OnClickShowCodeMirror from './OnClickShowCodeMirror.jsx';

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
