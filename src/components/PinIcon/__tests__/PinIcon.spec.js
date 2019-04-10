import React from 'react';
import { mount } from 'enzyme';
import PinIcon from '..';

describe('PinIcon', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = mount(<PinIcon color="hotpink" />);

    expect(component).toMatchSnapshot();
  });
});
