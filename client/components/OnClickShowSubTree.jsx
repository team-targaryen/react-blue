import React from 'react';

const OnClickShowSubTree = ({ id, name, showSubTree }) => {
  return (<button style={{ width: '100px', height: '25px' }} onClick={() => {
    showSubTree(+id)
  }}>{name} </button>);
}
export default OnClickShowSubTree;