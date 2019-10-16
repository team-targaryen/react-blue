import React from 'react';
import OnClickShowCodeMirror from './OnClickShowCodeMirror.jsx';

const CreateCodeEditor = ({
  syntaxObject,
  index,
  deleteTemplate,
  updateCode
}) => {
  return (
    <div key={`showCodeMirror${index}`} className='template-item'>
      <input
        onChange={e => {
          e.preventDefault();
          updateCode(syntaxObject, index, e.target.value);
        }}
        type='text'
        className='change-name'
        value={syntaxObject.name}
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
