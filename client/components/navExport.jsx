import React from 'react';
import JSZip from 'jszip';
import FileSaver from 'file-saver'; 

// ///////// PLACEHOLDER UNTL MERGE ////////

// FYI - reference following files from preducks: LeftContainer, actions/components.ts
// const zip = new JSZip();
// // creates a file
// zip.file('Hello.txt', 'Hello World\n'); 
// zip.generateAsync({type: 'blob'}).then(function(content) {
//   // see FileSave
//   FileSaver.saveAs(blob, 'example2.zip')
//   saveAs(content, 'example.zip');
// });
/////////////////////////////////

function Export({handleExportClick}) {
  return (
    <button onClick={() => handleExportClick()} id="export-btn">Export Project</button>
  )
}

export default Export;

