import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '../../ListItem';

describe('Select', () => {
  let component;

  it('should match the snapshot when a simple textual child is given', () => {
    component = shallow(<ListItem>Economy</ListItem>);
    expect(component).toMatchSnapshot();
  });

  it('should match the snapshot when an element is given as a child', () => {
    component = shallow(
      <ListItem>
        <button>Economy</button>
      </ListItem>
    );
    expect(component).toMatchSnapshot();
  });
});
