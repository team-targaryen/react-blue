import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// import toJson from "enzyme-to-json";

import EachChild from "../client/components/EachChild.jsx";
import ComponentDetail from "../client/components/ComponentDetail.jsx";
import TemplatingArea from "../client/components/TemplatingArea.jsx";
import App from "../client/App.jsx";
// import TemplateDropdown from "../client/components/TemplateDropdown.jsx";
import ChildrenList from "../client/components/ChildrenList.jsx";

import { render, cleanup, waitForElement } from "@testing-library/react"; // testing helpers
import userEvent from "@testing-library/user-event";
configure({ adapter: new Adapter() });

describe("React Blue unit tests", () => {
  describe("EachChild.jsx", () => {
    let wrapper, input;
    const renameMock = jest.fn();
    const changeMock = jest.fn();
    const deleteMock = jest.fn();

    let props = {
      name: "test",
      childId: 0,
      isContainer: true,
      renameChild: renameMock,
      changeType: changeMock,
      deleteChild: deleteMock
    };

    beforeAll(() => {
      wrapper = shallow(<EachChild {...props} />);
      input = wrapper.find("input");
    });

    it("Expect type to be text and defaultValue to be test", () => {
      expect(input.at(0).props().type).toBe("text");
      expect(input.at(0).props().defaultValue).toBe("test");
    });
    it("Expect checked to be true and type to be checkbox", () => {
      expect(input.at(1).props().checked).toBe(true);
      expect(input.at(1).props().type).toBe("checkbox");
    });
  });
  describe("ComponentDetail.jsx", () => {
    let wrapper, input;
    const renameMock = jest.fn();
    const changeMock = jest.fn();
    const deleteMock = jest.fn();
    const setTemplatesMock = jest.fn();
    const mockComponent = {
      name: "test",
      isContainer: true,
      depth: 0
    };
    let props = {
      renameComponent: renameMock,
      changeType: changeMock,
      deleteComponent: deleteMock,
      currentComponent: mockComponent,
      templates: "templateMock1",
      setTemplatesForComponent: setTemplatesMock,
      nameAndCodeLinkedToComponentId: { "0": "templateMock1" }
    };
    beforeAll(() => {
      wrapper = shallow(<ComponentDetail {...props} />);
      input = wrapper.find("input");
      console.log(input.debug())
    });
    it("Should show text of Current Component", () => {
      expect(
        wrapper.containsMatchingElement(<h2>Current Component</h2>)
      ).toBeTruthy();
    });
    it("Should have input ONE be type of text and defaultValue to test", () => {
      expect(input.at(0).props().type).toBe("text");
      expect(input.at(0).props().defaultValue).toBe("test");
    });
    it("Should have field TWO to have type of checkbox and checked to be true", () => {
      expect(input.at(1).props().type).toBe("checkbox");
      expect(input.at(1).props().checked).toBe(true);
    });
    it("Should have text of Container ", () => {
      expect(
        wrapper.containsMatchingElement(<label>Container</label>)
      ).toBeTruthy();
    });
    it("Should invoke delete function onclick", () => {
      wrapper.find("button").simulate("click");
      expect(deleteMock).toHaveBeenCalled;
    });
  });

});
describe("Integration testing", () => {
  let childrenList;
  const addMock = function () {
    return "added";
  };
  const renameMock = jest.fn();
  const changeMock = jest.fn();
  const deleteMock = jest.fn();
  const setTemplatesMock = jest.fn();
  const mockComponent = {
    name: "test",
    isContainer: true,
    depth: 0
  };
  let childrenListProps = {
    addChild: addMock,
    renameChild: renameMock,
    changeChildType: changeMock,
    deleteChild: deleteMock,
    currentComponent: mockComponent,
    templates: "templateMock1",
    setTemplatesForComponent: setTemplatesMock,
    nameAndCodeLinkedToComponentId: { "0": "templateMock1" }
  };

  beforeAll(() => {
    childrenList = mount(<ChildrenList {...childrenListProps} />);
  });
  afterAll(() => cleanup);
  describe("Adding nodes display correct length of childrenList", () => {
    expect(childrenList.find('.each-child-container"')).to.equal(undefined);
    childrenList.find("button").simulate("click");
    expect(childrenList.find('.each-child-container"')).toHaveLength(1);
  });
  describe("Showing correct number of children on d3 tree", () => { });
});
