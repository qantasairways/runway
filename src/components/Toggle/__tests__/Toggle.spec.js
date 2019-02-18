import React from 'react';
import { mount } from 'enzyme';
import Toggle from '..';

import { KEY_CODE_SPACE } from '../../../constants/keyCodes';

describe('Typeahead', () => {
  let component;
  let handleToggleSpy;
  const label = 'Toggle:';
  const ariaLabel = 'Press space to toggle';
  const id = 'toggle1';

  it('renders correctly with defaults', () => {
    component = mount(<Toggle label={label} ariaLabel={ariaLabel} id={id} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with defaultChecked prop', () => {
    component = mount(
      <Toggle label={label} ariaLabel={ariaLabel} id={id} defaultChecked />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when controlled `checked` prop updates', () => {
    component = mount(
      <Toggle label={label} ariaLabel={ariaLabel} id={id} defaultChecked />
    );
    component.setProps({ checked: true });

    expect(component).toMatchSnapshot();
  });

  describe('getDerivedStateFromProps()', () => {
    const state = {
      checked: false
    };

    it('returns null when component is uncontrolled', () => {
      expect(Toggle.getDerivedStateFromProps({ checked: undefined })).toBe(
        null
      );
    });

    it('returns null when component is controlled and the `checked` prop equals the `checked` state', () => {
      expect(Toggle.getDerivedStateFromProps({ checked: false }, state)).toBe(
        null
      );
    });

    it('returns the `checked` prop when component is controlled and the `checked` prop does not equal the `checked` state', () => {
      expect(Toggle.getDerivedStateFromProps({ checked: true }, state)).toEqual(
        {
          checked: true
        }
      );
    });
  });

  describe('handleClick()', () => {
    beforeEach(() => {
      component = mount(<Toggle label={label} ariaLabel={ariaLabel} id={id} />);
      handleToggleSpy = jest.spyOn(component.instance(), 'handleToggle');
      component.instance().handleClick();
    });

    afterEach(() => {
      handleToggleSpy.mockReset();
    });

    it('calls handleToggle', () => {
      expect(handleToggleSpy).toHaveBeenCalled();
    });
  });

  describe('handleKeyDown()', () => {
    beforeEach(() => {
      component = mount(<Toggle label={label} ariaLabel={ariaLabel} id={id} />);
      handleToggleSpy = jest.spyOn(component.instance(), 'handleToggle');
    });

    afterEach(() => {
      handleToggleSpy.mockReset();
    });

    it('does nothing when keyCode is not space', () => {
      component.instance().handleKeyDown({
        keyCode: 27
      });
      expect(handleToggleSpy.mock.calls.length).toBe(0);
    });

    it('calls handleToggle when keyCode is space', () => {
      component.instance().handleKeyDown({
        keyCode: KEY_CODE_SPACE
      });
      expect(handleToggleSpy.mock.calls.length).toBe(1);
    });
  });

  describe('handleToggle()', () => {
    const mockOnChange = jest.fn();

    describe('component is uncontrolled', () => {
      beforeAll(() => {
        component = mount(
          <Toggle
            label={label}
            ariaLabel={ariaLabel}
            id={id}
            onChange={mockOnChange}
          />
        );
        component.instance().handleToggle();
      });

      afterAll(() => {
        mockOnChange.mockReset();
      });

      it('renders correctly', () => {
        expect(component).toMatchSnapshot();
      });

      it('updates the state', () => {
        expect(component.state().checked).toBe(true);
      });

      it('calls `this.props.onChange', () => {
        expect(mockOnChange.mock.calls.length).toBe(1);
      });
    });

    describe('component is controlled', () => {
      beforeAll(() => {
        component = mount(
          <Toggle
            label={label}
            ariaLabel={ariaLabel}
            id={id}
            onChange={mockOnChange}
            defaultChecked
          />
        );
        component.setProps({ checked: true });
        component.instance().handleToggle();
      });

      afterAll(() => {
        mockOnChange.mockReset();
      });

      it('renders correctly', () => {
        expect(component).toMatchSnapshot();
      });

      it('does not update the state', () => {
        expect(component.state().checked).toBe(true);
      });

      it('calls `this.props.onChange', () => {
        expect(mockOnChange.mock.calls.length).toBe(1);
      });
    });
  });
});
