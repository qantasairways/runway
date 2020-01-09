import React from 'react';
import { shallow } from 'enzyme';

import { ListItem } from '../../ListItem';
import { List } from '..';

jest.mock('../../ListItem', () => 'ListItem');

describe('List', () => {
  it('should match the snapshot when no children are given', () => {
    const component = shallow(<List />);

    expect(component).toMatchSnapshot();
  });

  it('should match the snapshot when an element is given as a child', () => {
    const component = shallow(
      <List>
        <ListItem>Perth</ListItem>
      </List>
    );

    expect(component).toMatchSnapshot();
  });
});
