import React from 'react';

const File = ({ file, name, setCurrentComponent }) => {
  // console.log('Inside of File.jsx')
  return <li onClick={() => setCurrentComponent(file)}>{name}</li>;
};

export default File;
