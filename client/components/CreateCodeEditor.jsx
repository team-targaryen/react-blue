import React, { useState } from 'react';
import OnClickShowCodeMirror from './OnClickShowCodeMirror.jsx';

const CreateCodeEditor = ({
  syntaxObject,
  index,
  deleteTemplate,
  updateCode
}) => {
  const [isName, setIsName] = useState(syntaxObject.name)
  if (syntaxObject.name !== isName) {
    setIsName(syntaxObject.name)
  }
  // console.log('Inside of CreatCodeEditor.jsx')
  return (
    <div key={`showCodeMirror${index}`} className='template-item'>
      <input
        onChange={e => {
          e.preventDefault();
          updateCode(syntaxObject, index, e.target.value);
        }}
        type='text'
        className='change-name'
        value={isName}
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
