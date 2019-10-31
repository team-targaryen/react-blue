import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import indexHTML from './frontEndTemplates/indexHTML.js';
import indexJS from './frontEndTemplates/indexJS.js';
import server from './fullStackTemplates/server.js';
import packageJSON from './fullStackTemplates/packageJSON.js';
import webpack from './fullStackTemplates/webpack.config.js';
import readmeMD from './fullStackTemplates/readmeMD.js';

function connectFiles(currentComponent, code, fileObject) {
  let childComponents, imports;
  if (currentComponent.children) {
    imports = currentComponent.children
      .map(child => {
        if (child.isContainer) {
          return `import ${child.name} from './containers/${child.name}.jsx';\n`;
        } else {
          return `import ${child.name} from './components/${child.name}.jsx';\n`;
        }
      })
      .join('');
    childComponents = currentComponent.children.map(child => {
      return `\t<${child.name} />\n\t\t`;;
    })
      .join('');
  } else if (!currentComponent.children) {
    imports = "";
  }
  if (childComponents) {
    code = code.replace('DONOTDELETETHISSTRING', childComponents)
  } else {
    code = code.replace('DONOTDELETETHISSTRING', '')
  }
  if (currentComponent.isContainer) {
    fileObject.container[currentComponent.name] = imports.concat(
      code.replace('Template_Class', currentComponent.name)
    );
  } else {
    fileObject.component[currentComponent.name] = imports.concat(
      code.replace('Template_Class', currentComponent.name)
    );
  }
  return fileObject;
}

export default (data, nameAndCodeLinkedToComponentId) => {
  const zip = new JSZip();
  let fileCounter = {
    container: {},
    component: {}
  };
  function recursivelyCreateTemplates(data, nameAndCode, fileCounter) {
    for (let id in nameAndCode) {
      if (JSON.stringify(data.componentId) === id) {
        let newFileCounter = connectFiles(
          data,
          nameAndCode[id].code,
          fileCounter
        );
        fileCounter = newFileCounter;
      }
    }
    if (data.children) {
      data.children.forEach(child => {
        recursivelyCreateTemplates(child, nameAndCode, fileCounter);
      });
    } else return;
  }
  recursivelyCreateTemplates(data, nameAndCodeLinkedToComponentId, fileCounter);
  const containerObject = fileCounter.container;
  const componentObject = fileCounter.component;
  for (let container in containerObject) {
    zip.file(`containers/${container}.jsx`, containerObject[container]);
  }
  for (let component in componentObject) {
    zip.file(`components/${component}.jsx`, componentObject[component]);
  }
  zip.file('assets/index.html', indexHTML);
  zip.file('assets/styles/styles.css', '');
  zip.file('index.js', indexJS);
  zip.file('server/server.js', server);
  zip.file('package.json', packageJSON);
  zip.file('webpack.config.js', webpack);
  zip.file('server/readmeMD.js', readmeMD);

  zip.generateAsync({ type: 'blob' })
    .then(function (content) {

      saveAs(content, 'react-blue.zip');
    });
};
