import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EachChild from "../client/components/EachChild.jsx";
import ComponentDetail from "../client/components/ComponentDetail.jsx";
import ChildrenList from "../client/components/ChildrenList.jsx";
import {
  initialStateMock
} from '../__mock__/stateMocks';
import { cleanup } from "@testing-library/react"; // testing helpers

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
    const checkID_ClearAndSetTimeout = jest.fn();
    const showSubTree = jest.fn();
    const addOrDeleteNewSubTree = jest.fn();
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
      nameAndCodeLinkedToComponentId: { "0": "templateMock1" },
      recentTimeoutId: 0,
      setTimeoutId: 1,
      checkID_ClearAndSetTimeout: checkID_ClearAndSetTimeout,
      showSubTree: showSubTree,
      currentlyDisplayedSubTreeId: 0,
      addOrDeleteNewSubTree: addOrDeleteNewSubTree,
      state: initialStateMock,
      displaySubTreeDropDown: { "0": "App" }
    };
    beforeAll(() => {
      wrapper = shallow(<ComponentDetail {...props} />);
      input = wrapper.find("input");
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
// describe("Integration testing", () => {
//   let childrenList, input;
//   const addMock = function () {
//     return "added";
//   };
//   const renameMock = jest.fn();
//   const changeMock = jest.fn();
//   const deleteMock = jest.fn();
//   const setTemplatesMock = jest.fn();
//   const checkID_ClearAndSetTimeoutMock = jest.fn();
//   const showSubTreeMock = jest.fn();
//   const currentComponentMock = {
//     name: "App",
//     depth: 0,
//     id: 0,
//     componentId: 0,
//     isContainer: true,
//     children: [{ name: 'children', componentId: '1', isContainer: false }]
//   }

//   let childrenListProps = {
//     addChild: addMock,
//     renameChild: renameMock,
//     changeChildType: changeMock,
//     deleteChild: deleteMock,
//     currentComponent: currentComponentMock,
//     templates: [{ name: "templateMock1", code: 'test code' }],
//     setTemplatesForComponent: setTemplatesMock,
//     nameAndCodeLinkedToComponentId: { "0": "templateMock1" },
//     state: initialStateMock,
//     recentTimeoutId: 0,
//     setTimeoutId: 1,
//     checkID_ClearAndSetTimeout: checkID_ClearAndSetTimeoutMock,
//     showSubTree: showSubTreeMock,
//     currentlyDisplayedSubTreeId: 0,
//   };

//   beforeAll(() => {
//     childrenList = mount(<ChildrenList {...childrenListProps} />);
//     input = childrenList.find('input');
//   });
//   afterAll(() => cleanup);
//   describe("Adding nodes display correct length of childrenList", () => {
//     expect(childrenList.exists()).to.be(true);
//     //   .to.be.equal('each-child-container');
//     // childrenList.find("button").simulate("click");
//     // expect(childrenList.find('.each-child-container')).toHaveLength(1);
//   });
//   describe("Showing correct number of children on d3 tree", () => { });
// });
