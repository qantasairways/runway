import React from 'react';
import { mount, shallow } from 'enzyme';
import ButtonWithDialog from '..';

function openDialog(component) {
  component.instance().setState({ open: true });
}

describe('ButtonWithDialog', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = shallow(
      <ButtonWithDialog
        renderButtonValue={() => <div>button content</div>}
        dialogStyles={{}}
        transitionStyles={{ entering: {}, entered: {}, exiting: {} }}
      >
        {'children'}
      </ButtonWithDialog>
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    beforeAll(() => {
      component = shallow(
        <ButtonWithDialog
          closeAriaLabel="Close Aria Label"
          dialogAriaLabel="Dialog Aria Label"
          onClose={e => e}
          onBlur={e => e}
          placeHolder="placeholder"
          renderButtonValue={() => <div>button value</div>}
          renderHeader={() => <div>header</div>}
          dialogStyles={{}}
          transitionStyles={{ entering: {}, entered: {}, exiting: {} }}
          contentPadding="1px"
        >
          {'children'}
        </ButtonWithDialog>
      );
      openDialog(component);
    });

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with one child element', () => {
    component = shallow(
      <ButtonWithDialog
        renderButtonValue={() => <div>button content</div>}
        dialogStyles={{}}
        transitionStyles={{ entering: {}, entered: {}, exiting: {} }}
      >
        <span>Child Element</span>
      </ButtonWithDialog>
    );
    openDialog(component);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with one child function', () => {
    component = mount(
      <ButtonWithDialog
        renderButtonValue={() => <div>button content</div>}
        dialogStyles={{}}
        transitionStyles={{ entering: {}, entered: {}, exiting: {} }}
      >
        {({ closeDialog }) => <button type="button" onClick={closeDialog} />}
      </ButtonWithDialog>
    );
    openDialog(component);

    expect(component).toMatchSnapshot();
  });

  describe('onEntered()', () => {
    beforeEach(() => {
      document.addEventListener = jest.fn();
      component = mount(
        <ButtonWithDialog
          dialogAriaLabel="Dialog Aria Label"
          onClose={e => e}
          onBlur={e => e}
          placeHolder="placeholder"
          renderButtonValue={() => <div>button value</div>}
          renderHeader={() => <div>header</div>}
          dialogStyles={{}}
          transitionStyles={{ entering: {}, entered: {}, exiting: {} }}
          contentPadding="1px"
        >
          {({ setScrollTargetRef }) => (
            <div ref={setScrollTargetRef}>
              <button type="button" />
            </div>
          )}
        </ButtonWithDialog>
      );
      openDialog(component);
      component.instance().onEntered();
      jest.useFakeTimers();
    });

    afterEach(() => {
      document.addEventListener.mockReset();
    });

    it('adds click/keydown/focusin event listener', () => {
      const addEventListenerCalls = document.addEventListener.mock.calls;

      expect(addEventListenerCalls.length).toBe(3);

      expect(addEventListenerCalls[0][0]).toBe('focusin');

      expect(addEventListenerCalls[1][0]).toBe('click');
      expect(addEventListenerCalls[1][1]).toBe(
        component.instance().handleClickOutside
      );

      expect(addEventListenerCalls[2][0]).toBe('keydown');
      expect(addEventListenerCalls[2][1]).toBe(
        component.instance().handleEscKey
      );
    });
  });

  describe('onExited()', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
      document.removeEventListener = jest.fn();
      component = mount(
        <ButtonWithDialog
          closeAriaLabel="Close Aria Label"
          dialogAriaLabel="Dialog Aria Label"
          onClose={mockOnClose}
          onBlur={e => e}
          placeHolder="placeholder"
          renderButtonValue={() => <div>button value</div>}
          renderHeader={() => <div>header</div>}
          dialogStyles={{}}
          transitionStyles={{ entering: {}, entered: {}, exiting: {} }}
          contentPadding="1px"
        >
          {'children'}
        </ButtonWithDialog>
      );
      component.instance().onExited();
    });

    afterEach(() => {
      document.removeEventListener.mockReset();
      mockOnClose.mockReset();
    });

    it('removes click/keydown event listener', () => {
      const removeEventListenerCalls = document.removeEventListener.mock.calls;

      expect(removeEventListenerCalls.length).toBe(2);

      expect(removeEventListenerCalls[0][0]).toBe('click');
      expect(removeEventListenerCalls[0][1]).toBe(
        component.instance().handleClickOutside
      );

      expect(removeEventListenerCalls[1][0]).toBe('keydown');
      expect(removeEventListenerCalls[1][1]).toBe(
        component.instance().handleEscKey
      );
    });

    it('calls this.props.onClose()', () => {
      expect(mockOnClose.mock.calls.length).toBe(1);
    });
  });

  describe('handleClickOutside()', () => {
    beforeEach(() => {
      component = mount(
        <ButtonWithDialog
          closeAriaLabel="Close Aria Label"
          dialogAriaLabel="Dialog Aria Label"
          onClose={e => e}
          onBlur={e => e}
          placeHolder="placeholder"
          renderButtonValue={() => <div>button value</div>}
          renderHeader={() => <div>header</div>}
          dialogStyles={{}}
          transitionStyles={{ entering: {}, entered: {}, exiting: {} }}
          contentPadding="1px"
        >
          {'children'}
        </ButtonWithDialog>
      );
      openDialog(component);
      jest.spyOn(component.instance(), 'closeDialog');
    });

    afterEach(() => {
      component.instance().closeDialog.mockReset();
    });

    it('calls closeDialog() if the click was outside', () => {
      const componentInstance = component.instance();

      componentInstance.handleClickOutside({ target: document });
      expect(componentInstance.closeDialog).toHaveBeenCalled();
    });

    it('does nothing if the click was inside', () => {
      const componentInstance = component.instance();

      componentInstance.handleClickOutside({
        target: componentInstance.wrapper
      });
      expect(componentInstance.closeDialog).not.toHaveBeenCalled();
    });
  });

  describe('openDialog()', () => {
    beforeEach(() => {
      component = mount(
        <ButtonWithDialog
          closeAriaLabel="Close Aria Label"
          dialogAriaLabel="Dialog Aria Label"
          onClose={e => e}
          onBlur={e => e}
          placeHolder="placeholder"
          renderButtonValue={() => <div>button value</div>}
          renderHeader={() => <div>header</div>}
          dialogStyles={{}}
          transitionStyles={{ entering: {}, entered: {}, exiting: {} }}
          contentPadding="1px"
        >
          {'children'}
        </ButtonWithDialog>
      );
    });

    it('opens the popup', () => {
      component.instance().openDialog();

      expect(component.state('open')).toBe(true);
    });
  });

  describe('closeDialog()', () => {
    beforeEach(() => {
      component = mount(
        <ButtonWithDialog
          closeAriaLabel="Close Aria Label"
          dialogAriaLabel="Dialog Aria Label"
          onClose={e => e}
          onBlur={e => e}
          placeHolder="placeholder"
          renderButtonValue={() => <div>button value</div>}
          renderHeader={() => <div>header</div>}
          dialogStyles={{}}
          transitionStyles={{ entering: {}, entered: {}, exiting: {} }}
          contentPadding="1px"
        >
          {'children'}
        </ButtonWithDialog>
      );
    });

    it('closes the popup', () => {
      const componentInstance = component.instance();

      componentInstance.setState({ open: true });
      componentInstance.closeDialog();

      expect(component.state('open')).toBe(false);
    });
  });
});
