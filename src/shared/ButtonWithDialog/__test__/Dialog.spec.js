import React from 'react';
import { shallow } from 'enzyme';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock';
import Dialog from '../components/Dialog';

jest.mock('shortid', () => ({ generate: () => 'mockId' }));
jest.mock('body-scroll-lock', () => ({
  disableBodyScroll: jest.fn(),
  enableBodyScroll: jest.fn(),
  clearAllBodyScrollLocks: jest.fn()
}));

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

  afterEach(() => {
    disableBodyScroll.mockReset();
    enableBodyScroll.mockReset();
    clearAllBodyScrollLocks.mockReset();
  });

  it('renders correctly with defaults', () => {
    component = shallow(<Dialog {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    const additionalProps = {
      transitionState: 'mock transition state',
      contentPadding: 'mock content padding',
      shouldLockBgScroll: true
    };
    component = shallow(<Dialog {...requiredProps} {...additionalProps} />);

    expect(component).toMatchSnapshot();
  });

  // componentDidUpdate(props) {
  //   if (!!props.shouldLockBgScroll && !this.props.shouldLockBgScroll) {
  //     this.unlockBgScroll();
  //     return;
  //   }

  //   if (!props.shouldLockBgScroll && !!this.props.shouldLockBgScroll) {
  //     this.lockBgScroll();
  //     return;
  //   }

  //   if (
  //     props.transitionState !== this.props.transitionState &&
  //     this.props.transitionState === 'entered' &&
  //     !!this.props.shouldLockBgScroll
  //   ) {
  //     this.lockBgScroll();
  //   }
  // }

  describe('componentDidUpdate', () => {
    it('clears body scroll lock when shouldLockBgScroll changes to false', () => {
      component = shallow(
        <Dialog
          {...requiredProps}
          shouldLockBgScroll={false}
          scrollTarget="scrollTarget1"
        />
      );
      component.instance().componentDidUpdate({ shouldLockBgScroll: true });
      expect(enableBodyScroll.mock.calls.length).toBe(1);
      expect(enableBodyScroll.mock.calls[0][0]).toBe('scrollTarget1');
      expect(clearAllBodyScrollLocks.mock.calls.length).toBe(1);
    });

    it('adds body scroll lock when shouldLockBgScroll changes to true', () => {
      component = shallow(<Dialog {...requiredProps} shouldLockBgScroll />);
      component.instance().componentDidUpdate({ shouldLockBgScroll: false });
      expect(disableBodyScroll.mock.calls.length).toBe(1);
    });

    it('adds body scroll lock when transitionState changes to "entered" and shouldLockBgScroll is true', () => {
      component = shallow(
        <Dialog
          {...requiredProps}
          shouldLockBgScroll
          transitionState="entered"
        />
      );
      component.instance().componentDidUpdate({
        shouldLockBgScroll: true,
        transitionState: 'entering'
      });
      expect(disableBodyScroll.mock.calls.length).toBe(1);
    });
  });

  describe('componentWillUnmount', () => {
    it('clears body scroll lock when shouldLockBgScroll is true', () => {
      component = shallow(
        <Dialog
          {...requiredProps}
          shouldLockBgScroll
          scrollTarget="scrollTarget2"
        />
      );
      component.instance().componentWillUnmount();

      expect(enableBodyScroll.mock.calls.length).toBe(1);
      expect(enableBodyScroll.mock.calls[0][0]).toBe('scrollTarget2');
      expect(clearAllBodyScrollLocks.mock.calls.length).toBe(1);
    });

    it('does nothing when shouldLockBgScroll is false', () => {
      component = shallow(
        <Dialog
          {...requiredProps}
          shouldLockBgScroll={false}
          scrollTarget="scrollTarget2"
        />
      );
      component.instance().componentWillUnmount();

      expect(enableBodyScroll.mock.calls.length).toBe(0);
      expect(clearAllBodyScrollLocks.mock.calls.length).toBe(0);
    });
  });

  describe('lockBgScroll', () => {
    it('calls disableBodyScroll', () => {
      component = shallow(
        <Dialog {...requiredProps} scrollTarget="scrollTarget3" />
      );
      component.instance().lockBgScroll();

      expect(disableBodyScroll.mock.calls.length).toBe(1);
      expect(disableBodyScroll.mock.calls[0][0]).toBe('scrollTarget3');
    });
  });

  describe('unlockBgScroll', () => {
    it('calls disableBodyScroll and clearAllBodyScrollLocks', () => {
      component = shallow(
        <Dialog {...requiredProps} scrollTarget="scrollTarget4" />
      );
      component.instance().unlockBgScroll();

      expect(enableBodyScroll.mock.calls.length).toBe(1);
      expect(enableBodyScroll.mock.calls[0][0]).toBe('scrollTarget4');
      expect(clearAllBodyScrollLocks.mock.calls.length).toBe(1);
    });
  });
});
