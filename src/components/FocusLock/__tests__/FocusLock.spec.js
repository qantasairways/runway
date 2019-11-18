import React from 'react';
import { mount } from 'enzyme';

import FocusLock from '..';

describe('FocusLock', () => {
  it('renders errors if no children provided', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => mount(<FocusLock />)).toThrowErrorMatchingInlineSnapshot(
      `"React.Children.only expected to receive a single React element child."`
    );
    expect(consoleError).toHaveBeenCalled();
  });

  it('renders errors if multiple children are provided', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() =>
      mount(
        <FocusLock>
          <div />
          <span />
        </FocusLock>
      )
    ).toThrowErrorMatchingInlineSnapshot(
      `"React.Children.only expected to receive a single React element child."`
    );
    expect(consoleError).toHaveBeenCalled();
  });

  it('renders non-focusable children without any errors', () => {
    const documentListener = jest.spyOn(document, 'addEventListener');
    const wrapper = mount(
      <FocusLock>
        <div>Child without focusable elements</div>
      </FocusLock>
    );
    expect(wrapper.contains('Child without focusable elements')).toBe(true);
    expect(documentListener).toHaveBeenCalledTimes(0);
  });

  it('renders and focuses first focusable child', () => {
    const documentListener = jest.spyOn(document, 'addEventListener');
    const wrapper = mount(
      <FocusLock>
        <div>
          <input type="text" value="Focus Field" />
          <button type="button">Should not focus me</button>
        </div>
      </FocusLock>
    );
    expect(documentListener).toHaveBeenCalled();
    expect(document.activeElement).toEqual(wrapper.find('input').getDOMNode());
  });

  it('keeps focus inside', async () => {
    const wrapper = mount(
      <FocusLock>
        <div>
          <button type="button">Focus Me</button>
        </div>
      </FocusLock>
    );

    const button = wrapper.find('button').getDOMNode();

    expect(document.activeElement).toEqual(button);

    document.body.dispatchEvent(new Event('focusin'));

    expect(document.activeElement).toEqual(button);
  });

  it('returns focus on unmount', async () => {
    const previousFocus = document.activeElement;

    const wrapper = mount(
      <FocusLock>
        <nav>
          <a href="//qantas.com">Link</a>
        </nav>
      </FocusLock>
    );

    expect(document.activeElement).toEqual(wrapper.find('a').getDOMNode());

    wrapper.unmount();

    expect(document.activeElement).toEqual(previousFocus);
  });
});
