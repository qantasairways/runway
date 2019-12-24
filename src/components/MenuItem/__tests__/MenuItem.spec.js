import React from 'react';
import { mount } from 'enzyme';

import { MenuItem } from '..';

jest.mock('shortid', () => ({ generate: () => 'mockId' }));

describe('MenuItem', () => {
  it('should match the snapshot when a simple textual child is given', () => {
    const component = mount(<MenuItem selected>Economy</MenuItem>);

    expect(component).toMatchSnapshot();
  });
});
