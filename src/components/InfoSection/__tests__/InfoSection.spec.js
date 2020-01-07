import React from 'react';
import { mount } from 'enzyme';
import InfoSection from '..';

jest.mock('../../../icons/InfoIcon', () => () => <span>Mock Info Icon</span>);

describe('InfoSection', () => {
  it('renders correctly with props', () => {
    const requiredProps = {
      content: 'mock content',
      height: '100px',
      width: '200px'
    };
    const component = mount(<InfoSection {...requiredProps} />);
    expect(component).toMatchSnapshot();
  });
});
