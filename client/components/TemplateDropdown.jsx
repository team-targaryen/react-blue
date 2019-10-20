import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
const TemplateDropdown = ({
  templates,
  setTemplatesForComponent,
  currentComponent,
  nameAndCodeLinkedToComponentId
}) => {
  const [isDefault, setIsDefault] = useState("");
  const [isCurrentId] = useState(currentComponent.componentId);

  if (
    nameAndCodeLinkedToComponentId &&
    nameAndCodeLinkedToComponentId[currentComponent.componentId] &&
    isDefault !==
    nameAndCodeLinkedToComponentId[currentComponent.componentId].name
  ) {
    let name =
      nameAndCodeLinkedToComponentId[currentComponent.componentId].name;
    setIsDefault(name);
  }

  useEffect(() => {
    return () => {
      setIsDefault("");
    };
  }, []);

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        {!isDefault ? "Default Template - Class Syntax" : isDefault}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {templates.length > 0
          ? templates.map((template, i) => {
            return (
              <Dropdown.Item
                key={`templateDropdown-${currentComponent.componentId}index:${i}`}
                onClick={e => {
                  e.preventDefault();
                  if (template.name !== isDefault) {
                    setTemplatesForComponent(currentComponent, template);
                    setIsDefault(template.name);
                  }
                }}
              >
                {template.name}
              </Dropdown.Item>
            );
          })
          : null}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default TemplateDropdown;

// useEffect(() => {
//   if (
//     nameAndCodeLinkedToComponentId &&
//     nameAndCodeLinkedToComponentId.has(currentComponent.componentId)
//   ) {
//     let name = nameAndCodeLinkedToComponentId.get(
//       currentComponent.componentId
//     ).name;
//     setIsDefault(name);
//   }
// }, []);
// useEffect(() => {
//   return () => {
//     setIsDefault("");
//   };
// }, []);
