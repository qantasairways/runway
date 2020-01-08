import React from 'react';
import { mount } from 'enzyme';
import Toggle from '../index';

describe('Toggle', () => {
  describe('Uncontrolled', () => {
    it('should render correctly', () => {
      const toggle = mount(
        <Toggle
          id="mockId-1"
          label="mockLabel"
          className="mockContainerClassName"
        />
      );
      expect(toggle).toMatchSnapshot();
    });
  });

  describe('Controlled', () => {
    it('should render checked="true" correctly', () => {
      const toggle = mount(
        <Toggle
          id="mockId-2"
          checked
          label="mockLabel"
          className="mockContainerClassName"
        />
      );
      expect(toggle).toMatchSnapshot();
    });
    it('should render checked="false" correctly', () => {
      const toggle = mount(
        <Toggle
          id="mockId-3"
          checked={false}
          label="mockLabel"
          className="mockContainerClassName"
        />
      );
      expect(toggle).toMatchSnapshot();
    });
  });
});
