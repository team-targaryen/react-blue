import JSZip from 'jszip';
import indexHTML from './frontEndTemplates/indexHTML.js';
import indexJS from './frontEndTemplates/indexJS.js';
import server from './fullStackTemplates/server.js';
import jsonPackage from './fullStackTemplates/packagejson.js';
import webpack from './fullStackTemplates/webpack.config.js';

export default (data) => {
    const zip = new JSZip();
    const fileCounter = {};

    const connectFiles = currentComponent => {
        let imports;
        let childComponents;

        if (currentComponent.children) {
            imports = currentComponent.children
                .map(file => {
                    if (file.isContainer) {
                        return `import ${file.name} from './containers/${file.name}.jsx';\n`;
                    } else {
                        return `import ${file.name} from './components/${file.name}.jsx';\n`;
                    }
                })
                .join('');
            childComponents = currentComponent.children
                .map(file => {
                    return `\n<${file.name} />`;
                })
                .join('');
        }

        const template = `import React, { Component } from 'react';
${imports}
class ${currentComponent.name} extends Component {
  state = {  }
  render() { 
    return (
      <div>${childComponents}
      </div>
    );
  }
}
  
export default ${currentComponent.name};
`;

        fileCounter[currentComponent.name] =
            (fileCounter[currentComponent.name] || 0) + 1;

        if (currentComponent.depth === 0) {
            zip.file(`${currentComponent.name}.jsx`, `${template}`);
        } else {
            if (currentComponent.isContainer) {
                if (fileCounter[currentComponent.name] === 1) {
                    zip.file(`containers/${currentComponent.name}.jsx`, `${template}`);
                } else {
                    zip.file(
                        `containers/${currentComponent.name} (${fileCounter[
                        currentComponent.name
                        ] - 1}).jsx`,
                        `${template}`
                    );
                }
            } else {
                if (fileCounter[currentComponent.name] === 1) {
                    zip.file(`components/${currentComponent.name}.jsx`, `${template}`);
                } else {
                    zip.file(
                        `components/${currentComponent.name} (${fileCounter[
                        currentComponent.name
                        ] - 1}).jsx`,
                        `${template}`
                    );
                }
            }
        }

        if (currentComponent.children) {
            return currentComponent.children.forEach(child => {
                connectFiles(child);
            });
        }
    };

    connectFiles(data);

    zip.file('assets/index.html', indexHTML);
    zip.file('assets/styles/styles.css', '');
    zip.file('index.js', indexJS);
    zip.file('server/server.js', server);
    zip.file('packagejson.js', jsonPackage);
    zip.file('webpack.config.js', webpack);




    zip.generateAsync({ type: 'blob' }).then(function (content) {
        saveAs(content, 'react-blue.zip');
    });
};

