import React from 'react';
import { mount } from 'enzyme';

import FocusLock from '..';

// JSDOM is not recreated after each test
// document.activeElement will never be reset to default (document.body)
beforeEach(() => {
  document.body.setAttribute('tabindex', '0');
  document.body.focus();
  document.body.removeAttribute('tabindex');
});

describe('FocusLock', () => {
  it('renders without errors if single child is provided', () => {
    expect(() =>
      mount(
        <FocusLock>
          <div />
        </FocusLock>
      )
    ).not.toThrow();
  });

  it('renders without errors if multiple children are provided', () => {
    expect(() =>
      mount(
        <FocusLock>
          <div />
          <span />
        </FocusLock>
      )
    ).not.toThrow();
  });

  it('renders non-focusable children without any errors', () => {
    const wrapper = mount(
      <FocusLock>
        <div>Child without focusable elements</div>
      </FocusLock>
    );
    expect(wrapper.contains('Child without focusable elements')).toBe(true);

    expect(document.activeElement).toEqual(document.body);
  });

  it('adds focusin listener on document and removes it on unmount', () => {
    const addListener = jest.spyOn(document, 'addEventListener');
    const removeListener = jest.spyOn(document, 'removeEventListener');
    const wrapper = mount(
      <FocusLock>
        <div />
      </FocusLock>
    );
    expect(addListener).toHaveBeenCalledWith('focusin', expect.any(Function));

    wrapper.unmount();

    expect(removeListener).toHaveBeenCalledWith(
      'focusin',
      expect.any(Function)
    );
  });

  it('renders and focuses first focusable child by default', () => {
    const documentListener = jest.spyOn(document, 'addEventListener');
    const wrapper = mount(
      <FocusLock>
        <input type="text" defaultValue="Focus Field" />
        <button type="button">Should not focus me</button>
      </FocusLock>
    );

    expect(documentListener).toHaveBeenCalled();
    expect(document.activeElement).toEqual(wrapper.find('input').getDOMNode());
  });

  it('keeps focus inside', () => {
    const wrapper = mount(
      <FocusLock>
        <button type="button">Focus Me</button>
      </FocusLock>
    );

    const button = wrapper.find('button').getDOMNode();

    expect(document.activeElement).toEqual(button);

    document.dispatchEvent(new Event('focusin'));

    expect(document.activeElement).toEqual(button);
  });

  it('returns focus on unmount by default', () => {
    const previousFocus = document.activeElement;

    const wrapper = mount(
      <FocusLock>
        <a href="//qantas.com">Link</a>
      </FocusLock>
    );

    expect(document.activeElement).toEqual(wrapper.find('a').getDOMNode());

    wrapper.unmount();

    expect(document.activeElement).toEqual(previousFocus);
  });

  describe('isActive prop', () => {
    it('if ACTIVE it should focus first focusable child', () => {
      const documentListener = jest.spyOn(document, 'addEventListener');
      const wrapper = mount(
        <FocusLock active>
          <input type="text" defaultValue="Focus Field" />
        </FocusLock>
      );

      expect(documentListener).toHaveBeenCalled();
      expect(document.activeElement).toEqual(
        wrapper.find('input').getDOMNode()
      );
    });

    it('if INACTIVE it should NOT change focused element', () => {
      const documentListener = jest.spyOn(document, 'addEventListener');

      const wrapper = mount(
        <FocusLock active={false}>
          <input type="text" defaultValue="Focus Field" />
        </FocusLock>
      );

      expect(documentListener).toHaveBeenCalled();

      expect(document.activeElement).not.toEqual(
        wrapper.find('input').getDOMNode()
      );

      expect(document.activeElement).toEqual(document.body);
    });
  });
});
