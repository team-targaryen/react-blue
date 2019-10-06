import React from 'react';

function Edit({isEditOpen, toggleEdit}) {
  if (isEditOpen) {
    return (
      <>
      <button onClick={() => toggleEdit()} id="edit-btn">Edit</button>
      <div className="edit-dropdown-content">
        <a href="#">Action 1</a>
        <a href="#">Action 2</a>
        <a href="#">Action 3</a>
      </div>
      </>
    )
  }
  return (
    <button onClick={() => toggleEdit()} id="edit-btn">Edit</button>
  )
}

export default Edit;