import React from 'react';
import { shallow } from 'enzyme';
import Dialog from '../components/Dialog';

jest.mock('shortid', () => ({ generate: () => 'mockId' }));

describe('Dialog', () => {
  let component;

  const requiredProps = {
    content: 'mock content',
    renderHeader: () => <div>mockHeader</div>,
    renderFooter: () => <div>mockHeader</div>,
    dialogAriaLabel: 'mock aria label',
    dialogStyles: {},
    transitionStyles: { entering: '', entered: '', exiting: '' }
  };

  it('renders correctly with defaults', () => {
    component = shallow(<Dialog {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    const additionalProps = {
      transitionState: 'mock transition state',
      contentPadding: 'mock content padding',
      lockBgScroll: true
    };
    component = shallow(<Dialog {...requiredProps} {...additionalProps} />);

    expect(component).toMatchSnapshot();
  });
});
