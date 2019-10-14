import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
const TemplateDropdown = ({
  templates,
  setTemplatesForComponent,
  currentComponent,
  nameAndCodeLinkedToComponentId
}) => {
  const [isDefault, setIsDefault] = useState("");
  const [isCurrentId] = useState(currentComponent.componentId);
  // const [forceRerender, setForceRerender] = useState(true);
  if (
    nameAndCodeLinkedToComponentId &&
    nameAndCodeLinkedToComponentId.has(currentComponent.componentId) &&
    isDefault !==
      nameAndCodeLinkedToComponentId.get(currentComponent.componentId).name
  ) {
    let name = nameAndCodeLinkedToComponentId.get(currentComponent.componentId)
      .name;
    setIsDefault(name);
  }
  // useEffect(() => {
  //   if (
  //     currentComponent.componentId !== isCurrentId &&
  //     nameAndCodeLinkedToComponentId
  //   ) {
  //     return setIsDefault(
  //       nameAndCodeLinkedToComponentId.get(currentComponent.componentId).name
  //     );
  //   }
  // });

  useEffect(() => {
    return () => {
      setIsDefault("");
    };
  }, []);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {!isDefault ? "Default Template - Class Syntax" : isDefault}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {templates.length > 0
            ? templates.map(template => {
                return (
                  <Dropdown.Item
                    key={`templateDropdown-${currentComponent.componentId}`}
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
    </div>
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
