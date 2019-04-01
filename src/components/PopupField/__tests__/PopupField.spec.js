import React from 'react';
import { mount } from 'enzyme';
import PopupField from '..';

function openPopup(component) {
  component.instance().setState({ open: true });
}

describe('PopupField', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = mount(<PopupField buttonContent="Popup Field" />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    beforeAll(() => {
      component = mount(
        <PopupField
          buttonContent="Popup Field"
          openAriaLabel="Open Aria Label"
          closeAriaLabel="Close Aria Label"
          popupAriaLabel="Popup Aria Label"
          navigationAriaLabel="Tab to navigate"
          onClose={e => e}
        />
      );
      openPopup(component);
    });

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with jsx button content', () => {
    beforeAll(() => {
      const ButtonContent = <div>Button</div>;
      component = mount(
        <PopupField
          buttonContent={ButtonContent}
          openAriaLabel="Open Aria Label"
          closeAriaLabel="Close Aria Label"
          popupAriaLabel="Popup Aria Label"
          navigationAriaLabel="Tab to navigate"
          onClose={e => e}
        />
      );
      openPopup(component);
    });

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with one child element', () => {
    component = mount(
      <PopupField buttonContent="Popup Field">
        <span>Child Element</span>
      </PopupField>
    );
    openPopup(component);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with one child function', () => {
    component = mount(
      <PopupField buttonContent="Popup Field">
        {({ closePopup }) => <button type="button" onClick={closePopup} />}
      </PopupField>
    );
    component.instance().setState({ open: true });

    expect(component).toMatchSnapshot();
  });

  describe('onEntered()', () => {
    beforeEach(() => {
      document.addEventListener = jest.fn();
      component = mount(
        <PopupField
          buttonContent="Popup Field"
          openAriaLabel="Open Aria Label"
          closeAriaLabel="Close Aria Label"
          popupAriaLabel="Popup Aria Label"
          navigationAriaLabel="Tab to navigate"
          onClose={e => e}
        />
      );
      openPopup(component);
      jest.spyOn(component.instance().closeButton, 'focus');
      component.instance().onEntered();
    });

    afterEach(() => {
      document.addEventListener.mockReset();
      component.instance().closeButton.focus.mockReset();
    });

    it('adds click event listener', () => {
      const addEventListenerCalls = document.addEventListener.mock.calls;

      expect(addEventListenerCalls.length).toBe(1);
      expect(addEventListenerCalls[0][0]).toBe('click');
      expect(addEventListenerCalls[0][1]).toBe(
        component.instance().handleClickOutside
      );
    });

    it('focuses the close button', () => {
      expect(component.instance().closeButton.focus).toHaveBeenCalled();
    });
  });

  describe('onExited()', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
      document.removeEventListener = jest.fn();
      component = mount(
        <PopupField
          buttonContent="Popup Field"
          openAriaLabel="Open Aria Label"
          closeAriaLabel="Close Aria Label"
          popupAriaLabel="Popup Aria Label"
          navigationAriaLabel="Tab to navigate"
          onClose={mockOnClose}
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
        <PopupField
          buttonContent="Popup Field"
          openAriaLabel="Open Aria Label"
          closeAriaLabel="Close Aria Label"
          popupAriaLabel="Popup Aria Label"
          navigationAriaLabel="Tab to navigate"
          onClose={e => e}
        />
      );
      openPopup(component);
      jest.spyOn(component.instance(), 'togglePopup');
    });

    afterEach(() => {
      component.instance().togglePopup.mockReset();
    });

    it('calls togglePopup() if the click was outside', () => {
      const componentInstance = component.instance();

      componentInstance.handleClickOutside({ target: document });
      expect(componentInstance.togglePopup).toHaveBeenCalled();
    });

    it('does nothing if the click was inside', () => {
      const componentInstance = component.instance();

      componentInstance.handleClickOutside({
        target: componentInstance.wrapper
      });
      expect(componentInstance.togglePopup).not.toHaveBeenCalled();
    });
  });

  describe('togglePopup()', () => {
    beforeEach(() => {
      component = mount(
        <PopupField
          buttonContent="Popup Field"
          openAriaLabel="Open Aria Label"
          closeAriaLabel="Close Aria Label"
          popupAriaLabel="Popup Aria Label"
          navigationAriaLabel="Tab to navigate"
          onClose={e => e}
        />
      );
    });

    it('opens the popup', () => {
      component.instance().togglePopup();

      expect(component.state('open')).toBe(true);
    });

    it('closes the popup', () => {
      const componentInstance = component.instance();

      componentInstance.setState({ open: true });
      componentInstance.togglePopup();

      expect(component.state('open')).toBe(false);
    });
  });
});
