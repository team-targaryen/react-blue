import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TemplateArea from '../client/components/TemplatingArea';

configure({ adapter: new Adapter() });

describe('Template unit tests', () => {
  describe('TemplateArea', () => {
    let wrapper, headings;

    beforeAll(() => {
      wrapper = shallow(<TemplateArea />);
      headings = wrapper.find('h3');
    });

    it('Renders an Add Template feature', () => {
      expect(headings.at(0).text()).toMatch('Add Template');
      expect(headings.at(1).text()).toMatch('Template List');
    });
  });
});
