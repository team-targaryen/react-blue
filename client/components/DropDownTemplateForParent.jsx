import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";

const DropDownTemplatesForParent = ({
  templates,
  setTemplatesForComponent,
  parentComponent
}) => {
  const [isDefault, setIsDefault] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const displayTemplates = templates.map((template, index) => {
    return (
      <Dropdown.Item
        onClick={e => {
          e.preventDefault();
          if (template.name !== isDefault) {
            setIsDefault(template.name);
            setIsChanged(true);
            setTemplatesForComponent(parentComponent, template);
          }
        }}
      >
        {template.name}
      </Dropdown.Item>
    );
  });
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {!isChanged ? templates[0].name : isDefault}
      </Dropdown.Toggle>
      <Dropdown.Menu>{displayTemplates}</Dropdown.Menu>
    </Dropdown>
  );
};
export default DropDownTemplatesForParent;
