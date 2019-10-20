import React, { useState } from 'react';

const EachChild = ({
  initiailName,
  name,
  childId,
  isContainer,
  renameChild,
  changeType,
  deleteChild
}) => (
    <div className='each-child'>
      {console.log('Inside of EachChild.jsx')}
      <input
        className='child-name'
        type='text'
        key={`initialName:${initiailName || name}`}
        defaultValue={initiailName || name}
        onBlur={() => renameChild(event, childId)}
      ></input>
      <div>
        <input
          className='container-checkbox'
          type='checkbox'
          checked={isContainer}
          onChange={() => changeType(event, childId)}
        />
        <span className='container-label'>Container</span>
      </div>
      <button className='delete-child' onClick={() => deleteChild(childId)}>
        <i className='far fa-minus-square'></i>
      </button>
    </div>
  );

export default EachChild;
