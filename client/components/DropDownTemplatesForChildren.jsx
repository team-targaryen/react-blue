import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";

const DropDownTemplatesForChildren = ({
  templates,
  setTemplatesForComponent,
  child
}) => {
  const [isDefault, setIsDefault] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const displayTemplates = templates.map(template => {
    return (
      <Dropdown.Item
        onClick={e => {
          e.preventDefault();
          if (template.name !== isDefault) {
            setIsDefault(template.name);

            setTemplatesForComponent(child, template);
            setIsChanged(true);
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
        {templates.length > 0
          ? templates[0].name
          : !isChanged
          ? isDefault
          : templates[0].name}
      </Dropdown.Toggle>
      <Dropdown.Menu>{displayTemplates}</Dropdown.Menu>
    </Dropdown>
  );
};
export default DropDownTemplatesForChildren;
