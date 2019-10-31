import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import CodeMirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/css/css');
require('codemirror/mode/htmlembedded/htmlembedded');
require('codemirror/mode/htmlmixed/htmlmixed');
/**
 *  Template display: 
 *  changes are immediately updated to local state and updated to redux state as well
 */
const OnClickShowCodeMirror = ({ code, updateCode, index, deleteTemplate }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isSave, setIsSave] = useState(false);
  return isClicked ? (
    <React.Fragment>
      <button
        onClick={() => {
          setIsClicked(!isClicked);
          setIsSave(!isSave);
        }}
      >
        {isSave ? (
          <i className='fas fa-save'></i>
        ) : (
            <i className='fas fa-edit'></i>
          )}
      </button>
      {index > 1 ? (
        <button
          onClick={() => {
            deleteTemplate(index);
          }}
        >
          <i className='far fa-minus-square'></i>
        </button>
      ) : null}
      <CodeMirror
        value={code}
        onChange={value => {
          updateCode(value, index);
        }}
        options={{
          lineNumbers: true
        }}
      />
    </React.Fragment>
  ) : (
      <React.Fragment>
        <button
          onClick={() => {
            setIsClicked(!isClicked);
            setIsSave(!isSave);
          }}
        >
          {isSave ? (
            <i className='fas fa-save'></i>
          ) : (
              <i className='fas fa-edit'></i>
            )}
        </button>
        {index > 1 ? (
          <button
            onClick={() => {
              deleteTemplate(index);
            }}
          >
            <i className='far fa-minus-square'></i>
          </button>
        ) : null}
      </React.Fragment>
    );
};
export default OnClickShowCodeMirror;
