import React, { useState, useEffect } from "react";

import clone from "clone";
import {
  InitialHookSyntax,
  InitialClassSyntax
} from "../templates-code/templates";
import CreateCodeEditor from "./CreateCodeEditor.jsx";

Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

function CustomTemplate(name, isHook) {
  (this.name = name
    ? name
    : isHook
      ? "DEFAULT_HOOK_TEMPLATE"
      : "DEFAULT_CLASS_TEMPLATE"),
    (this.code = isHook
      ? new InitialHookSyntax(name).code
      : new InitialClassSyntax(name).code);
}

const initialHookSyntax = new InitialHookSyntax();
const initialClassSyntax = new InitialClassSyntax();

const TemplatingArea = ({ useTemplates }) => {
  const [isInitialSyntax, setIsInitialSyntax] = useState([
    initialClassSyntax,
    initialHookSyntax
  ]);

  // const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    let data = getItemFromLocalStorage();
    console.log('here in use effect', data)
    setItemForLocalStorage(data);
  }, []);

  const setItemForLocalStorage = data => {
    data = data !== null && data.length > 0 ? data : [initialClassSyntax, initialHookSyntax];
    localStorage.setObj("storage", data);
    useTemplates(data);
  };

  const getItemFromLocalStorage = reset => {
    const resetData = [initialClassSyntax, initialHookSyntax];
    if (reset !== "reset") {
      const data = localStorage.getObj("storage");
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
    console.log(index)
    let cloneOfIsInitialSyntax = clone(isInitialSyntax);
    cloneOfIsInitialSyntax.splice(index, 1);
    setIsInitialSyntax(cloneOfIsInitialSyntax);
    setItemForLocalStorage(cloneOfIsInitialSyntax);
    useTemplates(cloneOfIsInitialSyntax)
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
    <div id="code-editor">
      {isInitialSyntax.map((syntaxObject, index) => {
        return (
          <CreateCodeEditor
            key={`createCodeEditor-${index}`}
            syntaxObject={syntaxObject}
            index={index}
            deleteTemplate={deleteTemplate}
            updateCode={updateCode}
          />
        );
      })}
      <form
        onSubmit={e => {
          e.preventDefault();
          const templateName = document.getElementById("addTemplateName");
          const isClass = document.getElementById("isHook");
          let nameVal;
          if (templateName.value === "") {
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
          templateName.value = "";
          isClass.checked = !isClass.checked
            ? isClass.checked
            : !isClass.checked;
        }}
      >
        <input
          type="text"
          id="addTemplateName"
          placeholder="Enter Template Name"
        />
        {"React Hooks"}
        <input id="isHook" name="checkbox" type="checkbox" />
        <button type="submit">+</button>
      </form>

      <button
        onClick={() => {
          getItemFromLocalStorage("reset");
        }}
      >
        Reset Templates
      </button>
    </div>
  );
};

export default TemplatingArea;
