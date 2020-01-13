import React from 'react';
import { mount } from 'enzyme';

import { List } from '..';

jest.mock('../../ListItem', () => () => <li>Test</li>);

describe('List', () => {
  it('should match the snapshot when no children are given', () => {
    const component = mount(<List />);

    expect(component).toMatchSnapshot();
  });
});
