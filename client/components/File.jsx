import React from 'react';

const File = ({ data, file, name, setCurrentComponent }) => {
  return <li onClick={() => setCurrentComponent(file, data)}>{name}</li>;
};

export default File;
