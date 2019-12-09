import React from 'react';
import { mount } from 'enzyme';

import FocusLock from '..';

// JSOM is not recreated after each test
// document.activeElement will never be reset to default (document.body)
beforeEach(() => {
  document.body.setAttribute('tabindex', '0');
  document.body.focus();
  document.body.removeAttribute('tabindex');
});

describe('FocusLock', () => {
  it('renders errors if no children provided', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => mount(<FocusLock />)).toThrowErrorMatchingInlineSnapshot(
      `"React.Children.only expected to receive a single React element child."`
    );
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
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
    consoleError.mockReset();
  });

  it('renders non-focusable children without any errors', () => {
    const wrapper = mount(
      <FocusLock>
        <div>Child without focusable elements</div>
      </FocusLock>
    );
    expect(wrapper.contains('Child without focusable elements')).toBe(true);
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
        <div>
          <input type="text" defaultValue="Focus Field" />
          <button type="button">Should not focus me</button>
        </div>
      </FocusLock>
    );

    expect(documentListener).toHaveBeenCalled();
    expect(document.activeElement).toEqual(wrapper.find('input').getDOMNode());
  });

  it('keeps focus inside', () => {
    const wrapper = mount(
      <FocusLock>
        <div>
          <button type="button">Focus Me</button>
        </div>
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
        <nav>
          <a href="//qantas.com">Link</a>
        </nav>
      </FocusLock>
    );

    expect(document.activeElement).toEqual(wrapper.find('a').getDOMNode());

    wrapper.unmount();

    expect(document.activeElement).toEqual(previousFocus);
  });

  describe('isActive', () => {
    it('if ACTIVE it should focus first focusable child', () => {
      const documentListener = jest.spyOn(document, 'addEventListener');
      const wrapper = mount(
        <FocusLock active>
          <div>
            <input type="text" defaultValue="Focus Field" />
          </div>
        </FocusLock>
      );

      expect(documentListener).toHaveBeenCalled();
      expect(document.activeElement).toEqual(
        wrapper.find('input').getDOMNode()
      );
    });

    it('if INACTIVE it should NOT focus first focusable child', () => {
      const documentListener = jest.spyOn(document, 'addEventListener');

      const wrapper = mount(
        <FocusLock active={false}>
          <div>
            <input type="text" defaultValue="Focus Field" />
          </div>
        </FocusLock>
      );

      expect(documentListener).toHaveBeenCalled();

      expect(document.activeElement).not.toEqual(
        wrapper.find('input').getDOMNode()
      );

      expect(document.activeElement).toEqual(document.body);
    });
  });

  describe('getTabbables', () => {
    it('gets the correct tabbables on mount', () => {
      const wrapper = mount(
        <FocusLock>
          <nav>
            <a href="//qantas.com">Link</a>
            <button type="button">Focus</button>
          </nav>
        </FocusLock>
      );

      const [link, button] = wrapper.instance().getTabbables();

      expect(link).toEqual(wrapper.find('a').getDOMNode());
      expect(button).toEqual(wrapper.find('button').getDOMNode());
    });

    it('gets the correct tabbables on update', () => {
      // eslint-disable-next-line react/prefer-stateless-function
      class Wrapper extends React.Component {
        render() {
          return (
            <FocusLock>
              <nav>
                <a href="//qantas.com">Link</a>
                {/* eslint-disable-next-line react/prop-types */}
                {this.props.show && <button type="button">Focus</button>}
              </nav>
            </FocusLock>
          );
        }
      }
      const wrapper = mount(<Wrapper />);
      const { getTabbables } = wrapper.find(FocusLock).instance();

      let [link, button] = getTabbables();
      expect(link).toEqual(wrapper.find('a').getDOMNode());
      expect(button).toBe(undefined);

      wrapper.setProps({
        show: true
      });

      [link, button] = getTabbables();
      expect(link).toEqual(wrapper.find('a').getDOMNode());
      expect(button).toEqual(wrapper.find('button').getDOMNode());

      wrapper.setProps({
        show: false
      });

      [link, button] = getTabbables();
      expect(link).toEqual(wrapper.find('a').getDOMNode());
      expect(button).toBe(undefined);
    });
  });
});
