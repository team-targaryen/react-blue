import React, { useState } from 'react';

const EachChild = ({
  initiailName,
  name,
  childId,
  isContainer,
  renameChild,
  changeType,
  deleteChild,
  state,
  recentTimeoutId,
  setTimeoutId,
  checkID_ClearAndSetTimeout
}) => (
    <div className='each-child'>
      {/*console.log('Inside of EachChild.jsx')*/}
      <input
        className='child-name'
        type='text'
        key={`initialName:${initiailName || name}`}
        defaultValue={initiailName || name}
        onBlur={() => {
          checkID_ClearAndSetTimeout(setTimeoutId, recentTimeoutId, state)
          renameChild(event, childId)}}
      ></input>
      <div>
        <input
          className='container-checkbox'
          type='checkbox'
          checked={isContainer}
          onChange={() => {
            checkID_ClearAndSetTimeout(setTimeoutId, recentTimeoutId, state)
            changeType(event, childId)}}
        />
        <span className='container-label'>Container</span>
      </div>
      <button className='delete-child' onClick={() => {
        checkID_ClearAndSetTimeout(setTimeoutId, recentTimeoutId, state)
        deleteChild(childId)}}>
        <i className='far fa-minus-square'></i>
      </button>
    </div>
  );

export default EachChild;
