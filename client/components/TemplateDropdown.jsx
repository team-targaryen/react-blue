import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";

/** 
 * changes in code templates for a component/container will cached in local state as well as redux state
 */
const TemplateDropdown = ({
  templates,
  setTemplatesForComponent,
  currentComponent,
  nameAndCodeLinkedToComponentId,
  state,
  recentTimeoutId,
  setTimeoutId,
  checkID_ClearAndSetTimeout
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
                    checkID_ClearAndSetTimeout(setTimeoutId, recentTimeoutId, state)
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
