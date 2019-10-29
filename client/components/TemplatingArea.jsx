import React, { useState, useEffect } from 'react';

import clone from 'clone';
import {
  InitialHookSyntax,
  InitialClassSyntax
} from '../templates-code/templates';
import CreateCodeEditor from './CreateCodeEditor.jsx';

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
};

function CustomTemplate(name, isHook) {
  (this.name = name
    ? name
    : isHook
    ? 'DEFAULT_HOOK_TEMPLATE'
    : 'DEFAULT_CLASS_TEMPLATE'),
    (this.code = isHook
      ? new InitialHookSyntax(name).code
      : new InitialClassSyntax(name).code);
}

const initialHookSyntax = new InitialHookSyntax();
const initialClassSyntax = new InitialClassSyntax();

const TemplatingArea = ({ useTemplates }) => {
  // console.log('Inside of TemplatingArea.jsx')
  const [isInitialSyntax, setIsInitialSyntax] = useState([
    initialClassSyntax,
    initialHookSyntax
  ]);
  useEffect(() => {
    let data = getItemFromLocalStorage();
    setItemForLocalStorage(data);
  }, []);

  const setItemForLocalStorage = data => {
    data =
      data !== null && data.length > 0
        ? data
        : [initialClassSyntax, initialHookSyntax];
    localStorage.setObj('storage', data);
    useTemplates(data);
  };

  const getItemFromLocalStorage = reset => {
    const resetData = [initialClassSyntax, initialHookSyntax];
    if (reset !== 'reset') {
      const data = localStorage.getObj('storage');
      if (data) {
        setIsInitialSyntax(data);
        useTemplates(data);
      } else {
        setIsInitialSyntax(resetData);
        useTemplates(resetData);
      }
      return data;
    } else {
      setIsInitialSyntax(resetData);
      setItemForLocalStorage(resetData);
      useTemplates(resetData);
    }
  };

  const deleteTemplate = index => {
    let cloneOfIsInitialSyntax = clone(isInitialSyntax);
    cloneOfIsInitialSyntax.splice(index, 1);
    setIsInitialSyntax(cloneOfIsInitialSyntax);
    setItemForLocalStorage(cloneOfIsInitialSyntax);
    useTemplates(cloneOfIsInitialSyntax);
  };

  const updateCode = (newCode, index, name) => {
    const cloneOfInitialSyntax = clone(isInitialSyntax);
    for (let i = 0; i < cloneOfInitialSyntax.length; i += 1) {
      if (i === index) {
        if (!name) {
          cloneOfInitialSyntax[i].code = newCode;
        } else {
          cloneOfInitialSyntax[i].name = name;
        }
        break;
      }
    }
    setIsInitialSyntax(cloneOfInitialSyntax);
    setItemForLocalStorage(cloneOfInitialSyntax);
    return;
  };

  return (
    <div id='code-editor-container'>
      <h3>Add Template</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          const templateName = document.getElementById('add-template-name');
          const isClass = document.getElementById('is-hook');
          let nameVal;
          if (templateName.value === '') {
            nameVal = undefined;
          } else {
            nameVal = templateName.value;
          }
          const newCustomTemplate = new CustomTemplate(
            nameVal,
            isClass.checked
          );
          const clonedInitial = clone(isInitialSyntax);
          clonedInitial.push(newCustomTemplate);
          setIsInitialSyntax(clonedInitial);
          setItemForLocalStorage(clonedInitial);
          templateName.value = '';
          isClass.checked = !isClass.checked
            ? isClass.checked
            : !isClass.checked;
        }}
      >
        <input
          type='text'
          id='add-template-name'
          placeholder='Enter Template Name'
        />
        <div className='is-hook-container'>
          <input id='is-hook' name='checkbox' type='checkbox' />
          <label htmlFor='is-hook'>Hooks</label>
        </div>
        <button type='submit'>
          <i className='far fa-plus-square'></i>
        </button>
      </form>
      <div className='divider-panel'></div>
      <h3>Template List</h3>
      <div className='template-container'>
        {isInitialSyntax.map((syntaxObject, index) => {
          return (
            <CreateCodeEditor
              key={`createCodeEditor${index}`}
              syntaxObject={syntaxObject}
              index={index}
              deleteTemplate={deleteTemplate}
              updateCode={updateCode}
            />
          );
        })}
      </div>
      <div className='divider-panel'></div>
      <button
        id='reset-templates'
        onClick={() => {
          getItemFromLocalStorage('reset');
        }}
      >
        Reset Templates
      </button>
    </div>
  );
};

export default TemplatingArea;
