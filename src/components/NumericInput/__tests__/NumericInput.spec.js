import React from 'react';
import { shallow } from 'enzyme';
import NumericInput from '..';

describe('NumericInput', () => {
  it('renders correctly with defaults', () => {
    const component = shallow(<NumericInput />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    const additionalProps = {
      isInvalid: true,
      isInvalidMessage: 'mock message'
    };
    const component = shallow(<NumericInput {...additionalProps} />);
    expect(component).toMatchSnapshot();
  });
});
