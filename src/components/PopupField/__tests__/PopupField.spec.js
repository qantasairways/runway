import React from 'react';
import { mount } from 'enzyme';
import PopupField from '..';

import PinIcon from '../../../icons/PinIcon';

function openPopup(component) {
  component.instance().setState({ open: true });
}

describe('PopupField', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = mount(<PopupField />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    beforeAll(() => {
      component = mount(
        <PopupField
          closeAriaLabel="Close Aria Label"
          onClose={e => e}
          onBlur={e => e}
          className="class-name"
          fieldLabel="Field Label"
          values={[
            {
              large: 'Large value',
              small: 'small value'
            }
          ]}
          placeHolder="placeholder"
          icon={PinIcon}
        />
      );
      openPopup(component);
    });

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with one child element', () => {
    component = mount(
      <PopupField>
        <span>Child Element</span>
      </PopupField>
    );
    openPopup(component);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with one child function', () => {
    component = mount(
      <PopupField>
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
          closeAriaLabel="Close Aria Label"
          onClose={e => e}
          onBlur={e => e}
          className="class-name"
          fieldLabel="Field Label"
          largeValue="Large value"
          smallValue="small vlaue"
          placeHolder="placeholder"
          icon={<div />}
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
          closeAriaLabel="Close Aria Label"
          onClose={mockOnClose}
          onBlur={e => e}
          className="class-name"
          fieldLabel="Field Label"
          largeValue="Large value"
          smallValue="small vlaue"
          placeHolder="placeholder"
          icon={<div />}
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
          closeAriaLabel="Close Aria Label"
          onClose={e => e}
          onBlur={e => e}
          className="class-name"
          fieldLabel="Field Label"
          largeValue="Large value"
          smallValue="small vlaue"
          placeHolder="placeholder"
          icon={<div />}
        />
      );
      openPopup(component);
      jest.spyOn(component.instance(), 'closePopup');
    });

    afterEach(() => {
      component.instance().closePopup.mockReset();
    });

    it('calls closePopup() if the click was outside', () => {
      const componentInstance = component.instance();

      componentInstance.handleClickOutside({ target: document });
      expect(componentInstance.closePopup).toHaveBeenCalled();
    });

    it('does nothing if the click was inside', () => {
      const componentInstance = component.instance();

      componentInstance.handleClickOutside({
        target: componentInstance.wrapper
      });
      expect(componentInstance.closePopup).not.toHaveBeenCalled();
    });
  });

  describe('openPopup()', () => {
    beforeEach(() => {
      component = mount(
        <PopupField
          closeAriaLabel="Close Aria Label"
          onClose={e => e}
          onBlur={e => e}
          className="class-name"
          fieldLabel="Field Label"
          largeValue="Large value"
          smallValue="small vlaue"
          placeHolder="placeholder"
          icon={<div />}
        />
      );
    });

    it('opens the popup', () => {
      component.instance().openPopup();

      expect(component.state('open')).toBe(true);
    });
  });

  describe('closePopup()', () => {
    beforeEach(() => {
      component = mount(
        <PopupField
          closeAriaLabel="Close Aria Label"
          onClose={e => e}
          onBlur={e => e}
          className="class-name"
          fieldLabel="Field Label"
          largeValue="Large value"
          smallValue="small vlaue"
          placeHolder="placeholder"
          icon={<div />}
        />
      );
    });

    it('closes the popup', () => {
      const componentInstance = component.instance();

      componentInstance.setState({ open: true });
      componentInstance.closePopup();

      expect(component.state('open')).toBe(false);
    });
  });
});
