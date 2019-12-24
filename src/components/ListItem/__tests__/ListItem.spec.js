import React from 'react';
import { shallow } from 'enzyme';
import { ListItem } from '..';

describe('ListItem', () => {
  it('should match the snapshot when a simple textual child is given', () => {
    const component = shallow(<ListItem>Economy</ListItem>);

    expect(component).toMatchSnapshot();
  });
});
