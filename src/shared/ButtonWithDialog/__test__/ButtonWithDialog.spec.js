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
      />
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
          {({ setFocusElementRef }) => (
            <div>
              <button type="button" ref={setFocusElementRef} />
            </div>
          )}
        </ButtonWithDialog>
      );
      openDialog(component);
      jest.spyOn(component.instance().focusElement, 'focus');
      component.instance().onEntered();
    });

    afterEach(() => {
      document.addEventListener.mockReset();
      component.instance().focusElement.focus.mockReset();
    });

    it('adds click event listener', () => {
      const addEventListenerCalls = document.addEventListener.mock.calls;

      expect(addEventListenerCalls.length).toBe(1);
      expect(addEventListenerCalls[0][0]).toBe('click');
      expect(addEventListenerCalls[0][1]).toBe(
        component.instance().handleClickOutside
      );
    });

    it('focuses the element with ref this.focusElement', () => {
      expect(component.instance().focusElement.focus).toHaveBeenCalled();
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
        />
      );
      jest.spyOn(component.instance().fieldButton, 'focus');
      component.instance().onExited();
    });

    afterEach(() => {
      document.removeEventListener.mockReset();
      mockOnClose.mockReset();
      component.instance().fieldButton.focus.mockReset();
    });

    it('removes click event listener', () => {
      const removeEventListenerCalls = document.removeEventListener.mock.calls;

      expect(removeEventListenerCalls.length).toBe(1);
      expect(removeEventListenerCalls[0][0]).toBe('click');
      expect(removeEventListenerCalls[0][1]).toBe(
        component.instance().handleClickOutside
      );
    });

    it('calls this.props.onClose()', () => {
      expect(mockOnClose.mock.calls.length).toBe(1);
    });

    it('focuses the field button', () => {
      expect(component.instance().fieldButton.focus).toHaveBeenCalled();
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
        />
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
        />
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
        />
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
