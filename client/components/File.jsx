import React from 'react';

const File = ({ file, name, setCurrentComponent }) => {
  return <li onClick={() => setCurrentComponent(file)}>{name}</li>;
};

export default File;
