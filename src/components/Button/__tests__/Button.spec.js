import React from 'react';
import Button from '..';
import { shallow } from 'enzyme';

describe('Button', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Button debug="true" />);

    expect(component).toMatchSnapshot();
  });
});
