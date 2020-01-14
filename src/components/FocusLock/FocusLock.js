import React, { Component, Children } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

// Adapted from: https://github.com/davidtheclark/tabbable
const tabbableSelector = [
  'input:not([type="hidden"])',
  'button',
  'select',
  'a[href]',
  'textarea',
  '[tabindex="0"]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])'
].join(',');

class LockWrapper extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  componentDidMount() {
    this.previousFocusEl = document.activeElement;

    // Using findDOMNode as React doesn't support Fragment refs (yet?)
    // https://github.com/facebook/react/pull/13841#issuecomment-430066195
    // eslint-disable-next-line react/no-find-dom-node
    this.base = findDOMNode(this);

    // Tabbable visible elements
    const tabbables = Array.from(
      this.base.querySelectorAll(tabbableSelector)
    ).filter(
      node =>
        node.offsetParent !== null &&
        window.getComputedStyle(node).visibility !== 'hidden'
    );

    // eslint-disable-next-line prefer-destructuring
    this.firstFocusEl = tabbables[0];
    this.lastFocusEl = tabbables[tabbables.length - 1];

    if (this.firstFocusEl) {
      this.firstFocusEl.focus();
      this.currentFocusedEl = this.firstFocusEl;
      document.addEventListener('focusin', this.onFocus);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('focusin', this.onFocus);
    if (this.previousFocusEl) {
      this.previousFocusEl.focus();
    }
  }

  onFocus = event => {
    // Focused element is inside our component
    if (this.base.contains(event.target)) {
      this.currentFocusedEl = event.target;
    } else {
      // Focused element is _outside_ our component
      event.preventDefault();
      if (this.currentFocusedEl === this.lastFocusEl) {
        this.firstFocusEl.focus();
      } else if (this.currentFocusedEl === this.firstFocusEl) {
        this.lastFocusEl.focus();
      }
    }
  };

  render() {
    const { children } = this.props;
    // Only allow one single child
    return Children.only(children);
  }
}

export default function FocusLock({ active = true, children }) {
  if (active) {
    return <LockWrapper>{children}</LockWrapper>;
  }

  return children;
}

FocusLock.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.element.isRequired
};
