import React from 'react';
import Button from '..';
import { mount } from 'enzyme';

describe('Button', () => {
  it('should render correctly in "debug" mode', () => {
    const component = mount(<Button debug="true" />);

    expect(component).toMatchSnapshot();
  });
});
