import React from "react";

function Edit({ isEditOpen, toggleEdit }) {
  return isEditOpen ? (
    <React.Fragment>
      <button onClick={() => toggleEdit()} id="edit-btn">
        Edit
      </button>
      <div className="edit-dropdown-content">
        <a href="#">Action 1</a>
        <a href="#">Action 2</a>
        <a href="#">Action 3</a>
      </div>
    </React.Fragment>
  ) : (
    <button onClick={() => toggleEdit()} id="edit-btn">
      Edit
    </button>
  );
}

export default Edit;
