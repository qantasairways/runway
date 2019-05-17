import React from 'react';
import { shallow } from 'enzyme';
import InfoSection from '..';

describe('InfoSection', () => {
  it('renders correctly with props', () => {
    const requiredProps = {
      content: 'mock content',
      height: '100px',
      width: '200px'
    };
    const component = shallow(<InfoSection {...requiredProps} />);
    expect(component).toMatchSnapshot();
  });
});
