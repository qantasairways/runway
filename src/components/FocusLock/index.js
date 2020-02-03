/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Adapted from: https://github.com/davidtheclark/tabbable
const tabbableSelector = [
  '[tabindex="0"]',
  'button',
  'select',
  'a[href]',
  'textarea',
  'audio[controls]',
  'video[controls]',
  'input:not([type="hidden"])',
  '[contenteditable]:not([contenteditable="false"])'
].join(',');

const getTabbables = el =>
  Array.from(el.querySelectorAll(tabbableSelector)).filter(
    node =>
      !node.disabled &&
      node.tabIndex !== -1 &&
      node.offsetParent !== null && // display: none;
      window.getComputedStyle(node).visibility !== 'hidden'
  );

export default function FocusLock(props) {
  const { active, returnFocus, as: Container, children, ...otherProps } = props;
  const previousFocusEl = useRef(document.activeElement);
  const containerRef = useRef();
  const topRef = useRef();
  const bottomRef = useRef();

  useLayoutEffect(() => {
    const onFocus = event => {
      if (
        active &&
        (!containerRef.current.contains(event.target) ||
          [topRef.current, bottomRef.current].includes(event.target))
      ) {
        const tabbables = getTabbables(containerRef.current);

        if (tabbables.length) {
          event.preventDefault();

          if (event.target === topRef.current) {
            tabbables[tabbables.length - 1].focus();
          } else {
            tabbables[0].focus();
          }
        }
      }
    };

    const tabbables = getTabbables(containerRef.current);
    if (active && tabbables[0]) {
      tabbables[0].focus();
    }

    document.addEventListener('focusin', onFocus);

    return () => {
      document.removeEventListener('focusin', onFocus);

      // Call previous element focus after removing focus listener to avoid conflicts
      if (active && returnFocus && previousFocusEl.current) {
        previousFocusEl.current.focus();
      }
    };
  }, [active]);

  return (
    <>
      <span tabIndex={0} ref={topRef} />
      <Container ref={containerRef} {...otherProps}>
        {children}
      </Container>
      <span tabIndex={0} ref={bottomRef} />
    </>
  );
}
FocusLock.propTypes = {
  /** Flag to set if the focus lock is active (default: true) */
  active: PropTypes.bool,
  /** Flag to set if the focus should return to previous element when lock is deactivated */
  returnFocus: PropTypes.bool,
  /** Change internal wrapper element */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

FocusLock.defaultProps = {
  active: true,
  returnFocus: true,
  as: 'div'
};
