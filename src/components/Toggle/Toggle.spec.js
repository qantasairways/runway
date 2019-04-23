import React from 'react';
import { shallow } from 'enzyme';
import Toggle from './index';

describe('Toggle', () => {
  describe('Uncontrolled', () => {
    it('should render correctly', () => {
      const toggle = shallow(
        <Toggle
          id="mockId-1"
          onChange={() => {}}
          label="mockLabel"
          containerClassName="mockContainerClassName"
        />
      );
      expect(toggle).toMatchSnapshot();
    });
  });

  describe('Controlled', () => {
    it('should render checked="true" correctly', () => {
      const toggle = shallow(
        <Toggle
          id="mockId-2"
          onChange={() => {}}
          checked
          label="mockLabel"
          containerClassName="mockContainerClassName"
        />
      );
      expect(toggle).toMatchSnapshot();
    });
    it('should render checked="false" correctly', () => {
      const toggle = shallow(
        <Toggle
          id="mockId-3"
          onChange={() => {}}
          checked={false}
          label="mockLabel"
          containerClassName="mockContainerClassName"
        />
      );
      expect(toggle).toMatchSnapshot();
    });
  });
});
