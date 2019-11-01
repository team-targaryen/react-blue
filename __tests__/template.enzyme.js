import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TemplateArea from '../client/components/TemplatingArea';
import { useTemplates } from '../client/actions/actions';
import CreateCodeEditor from '../client/components/CreateCodeEditor';
configure({ adapter: new Adapter() });

describe('Template unit tests', () => {
    describe('TemplateArea', () => {
        let wrapper, headings;
        // functions inside the templateArea
        let deleteMock = jest.fn();

        // props inside the templateArea
        let props = {
            isInitialSyntax: ['template1', 'template2']
        };

        // shallow copy the TemplateArea with all props
        beforeAll(() => {
            wrapper = shallow(<TemplateArea {...props} />);
            headings = wrapper.find('h3');
            console.log(headings.debug());
        });
        it('Renders an Add Template feature', () => {
            expect(headings.at(0).text()).toMatch('Add Template');
            const isHook = wrapper.at(1).find('input[type="checkbox"]');
            // console.log(isHook.debug());
            // expect(isHook)
            //   .simulate('click')
            //   .toBe(true);
            // wrapper.find('input[type="checkbox"]').simulate('click');
            expect(isHook).toEqual(true);
            // wrapper.find('button[type="submit"]').simulate('click');
            // expect(props.isInitialSyntax.length).toBe(3);
        });

        it('Renders a Template List feature', () => {
            expect(wrapper.find('div[className=".template-container"]'));
        });

    });

    // pass <CreateCodeEditor /> component to shallow() method from Enzyme and store is in a wrapper variable. Then check that this component exists using a boolean assertion. 
    describe('CreateCodeEditor Component', () => {
        test("renders", () => {
            const wrapper1 = shallow(< CreateCodeEditor />);
            expect(wrapper1.exists()).toBe(true);
        });
    })
});