import React from 'react';
import { mount } from 'enzyme';
import NumericInput from '..';

jest.mock('../../../icons/PlusIcon', () => () => <span>Mock Plus Icon</span>);
jest.mock('../../../icons/MinusIcon', () => () => <span>Mock Minus Icon</span>);

describe('NumericInput', () => {
  it('renders correctly with defaults', () => {
    const component = mount(<NumericInput />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    const additionalProps = {
      isInvalid: true,
      isInvalidMessage: 'mock message',
      isTabletAndUp: false
    };
    const component = mount(<NumericInput {...additionalProps} />);
    expect(component).toMatchSnapshot();
  });
});
