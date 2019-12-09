import React, { Component, Children } from 'react';
import { findDOMNode } from 'react-dom';
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
    this.tabbables = this.getTabbables();

    if (this.tabbables[0]) {
      this.tabbables[0].focus();
      document.addEventListener('focusin', this.onFocus);
    }
  }

  componentDidUpdate() {
    this.tabbables = this.getTabbables();
  }

  componentWillUnmount() {
    document.removeEventListener('focusin', this.onFocus);
    if (this.previousFocusEl) {
      this.previousFocusEl.focus();
    }
  }

  getTabbables = () =>
    Array.from(this.base.querySelectorAll(tabbableSelector)).filter(
      node =>
        !node.disabled &&
        node.tabIndex !== -1 &&
        node.offsetParent !== null &&
        window.getComputedStyle(node).visibility !== 'hidden'
    );

  onFocus = event => {
    if (!this.base.contains(event.target)) {
      // Focused element is _outside_ our component
      event.preventDefault();
      if (event.relatedTarget === this.tabbables[0]) {
        this.tabbables[this.tabbables.length - 1].focus();
      } else {
        this.tabbables[0].focus();
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
