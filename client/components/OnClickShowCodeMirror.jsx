import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import CodeMirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/css/css');
require('codemirror/mode/htmlembedded/htmlembedded');
require('codemirror/mode/htmlmixed/htmlmixed');

const OnClickShowCodeMirror = ({ code, updateCode, index, deleteTemplate }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isSave, setIsSave] = useState(false);
  return isClicked ? (
    <div>
      <button
        onClick={() => {
          deleteTemplate(index);
        }}
      >
        delete
      </button>
      <button
        onClick={() => {
          setIsClicked(!isClicked);
          setIsSave(!isSave);
        }}
      >
        {isSave ? 'save' : 'edit'}
      </button>
      <div>
        <CodeMirror
          value={code}
          onChange={value => {
            updateCode(value, index);
          }}
          options={{
            lineNumbers: true
          }}
        />
      </div>
    </div>
  ) : (
    <div>
      <button
        onClick={() => {
          deleteTemplate(index);
        }}
      >
        delete
      </button>
      <button
        onClick={() => {
          setIsClicked(!isClicked);
          setIsSave(!isSave);
        }}
      >
        {isSave ? 'save' : 'edit'}
      </button>
    </div>
  );
};
export default OnClickShowCodeMirror;
