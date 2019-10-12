import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";

const DropdownTemplates = ({
  templates,
  setTemplatesForComponent,
  currentComponent,
  childId
}) => {
  const [isDefault, setIsDefault] = useState("React Class Syntax - DEFAULT");
  const displayTemplates = templates.map((el, index) => {
    return (
      <Dropdown.Item
        onClick={() => {
          setIsDefault(el.name);
          setTemplatesForComponent(
            currentComponent,
            index,
            !childId ? 0 : childId
          );
        }}
      >
        {el.name}
      </Dropdown.Item>
    );
  });
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {isDefault}
      </Dropdown.Toggle>
      <Dropdown.Menu>{displayTemplates}</Dropdown.Menu>
    </Dropdown>
  );
};
export default DropdownTemplates;
