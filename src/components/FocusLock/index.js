import { Component, Children } from 'react';
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

export default class LockWrapper extends Component {
  static propTypes = {
    /** Flag to set if the focus lock is active (default: true) */
    active: PropTypes.bool,
    /** Flag to set if the focus should return to previous element when lock is deactivated */
    returnFocus: PropTypes.bool,
    children: PropTypes.element.isRequired
  };

  static defaultProps = {
    active: true,
    returnFocus: true
  };

  componentDidMount() {
    this.previousFocusEl = document.activeElement;

    // Using findDOMNode as React doesn't support Fragment refs (yet?)
    // https://github.com/facebook/react/pull/13841#issuecomment-430066195
    // eslint-disable-next-line react/no-find-dom-node
    this.base = findDOMNode(this);

    // Get tabbable visible elements
    this.tabbables = this.getTabbables();

    if (this.props.active && this.tabbables[0]) {
      this.tabbables[0].focus();
    }

    document.addEventListener('focusin', this.onFocus);
  }

  componentDidUpdate(prevProps) {
    this.tabbables = this.getTabbables();

    if (!prevProps.active && this.props.active) {
      this.previousFocusEl = document.activeElement;
    }
  }

  componentWillUnmount() {
    const { active, returnFocus } = this.props;

    if (active && returnFocus && this.previousFocusEl) {
      this.previousFocusEl.focus();
    }

    document.removeEventListener('focusin', this.onFocus);
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
    if (this.props.active && !this.base.contains(event.target)) {
      // Focused element is _outside_ our component
      this.tabbables = this.getTabbables();

      if (this.tabbables.length) {
        event.preventDefault();

        if (event.relatedTarget === this.tabbables[0]) {
          this.tabbables[this.tabbables.length - 1].focus();
        } else {
          this.tabbables[0].focus();
        }
      }
    }
  };

  render() {
    // Only allow one single child
    return Children.only(this.props.children);
  }
}
