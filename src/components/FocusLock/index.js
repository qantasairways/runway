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

    const tabbables = [...this.base.querySelectorAll(tabbableSelector)];

    // First tabbable element that is visible
    this.firstFocusEl = tabbables.find(
      node =>
        node.offsetParent !== null &&
        window.getComputedStyle(node).visibility !== 'hidden'
    );

    if (this.firstFocusEl) {
      this.firstFocusEl.focus();
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
    if (!this.base.contains(event.target) && this.firstFocusEl) {
      event.preventDefault();
      this.firstFocusEl.focus();
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
