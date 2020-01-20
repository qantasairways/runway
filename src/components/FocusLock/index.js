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
  const { active, returnFocus, as: Container, children } = props;
  const previousFocusEl = useRef(document.activeElement);
  const baseRef = useRef();

  useLayoutEffect(() => {
    const onFocus = event => {
      // Focused element is _outside_ our component
      if (active && !baseRef.current.contains(event.target)) {
        const tabbables = getTabbables(baseRef.current);

        if (tabbables.length) {
          event.preventDefault();
          if (event.relatedTarget === tabbables[0]) {
            tabbables[tabbables.length - 1].focus();
          } else {
            tabbables[0].focus();
          }
        }
      }
    };

    const [firstEl] = getTabbables(baseRef.current);
    if (active && firstEl) {
      firstEl.focus();
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

  return <Container ref={baseRef}>{children}</Container>;
}
FocusLock.propTypes = {
  /** Flag to set if the focus lock is active (default: true) */
  active: PropTypes.bool,
  /** Flag to set if the focus should return to previous element when lock is deactivated */
  returnFocus: PropTypes.bool,
  /** Change internal wrapper element */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.element.isRequired
};

FocusLock.defaultProps = {
  active: true,
  returnFocus: true,
  as: 'div'
};
