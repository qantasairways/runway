import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from '..';

describe('MenuItem', () => {
  it('should match the snapshot when a simple textual child is given', () => {
    const component = shallow(<MenuItem>Economy</MenuItem>);

    expect(component).toMatchSnapshot();
  });
});
