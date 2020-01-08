import React from 'react';
import { mount } from 'enzyme';
import Footer from '../components/Footer';

jest.mock('shortid', () => ({ generate: () => 'mockId' }));

describe('Footer', () => {
  const requiredProps = {
    primaryLabels: ['mock label one', 'mock label two'],
    primaryLabelAriaTitle: 'mock primaryLabelAriaTitle',
    actionText: 'mock actionText',
    closeAriaLabel: 'mock closeAriaLabel'
  };

  it('renders correctly with defaults', () => {
    const component = mount(<Footer {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    const additionalProps = {
      onAction: () => {},
      preFooter: 'mock preFooter node'
    };
    const component = mount(<Footer {...requiredProps} {...additionalProps} />);

    expect(component).toMatchSnapshot();
  });
});
