/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock';
import FocusLock from '../../../components/FocusLock';

class Dialog extends Component {
  targetElement = null;

  componentDidUpdate(props) {
    if (!!props.shouldLockBgScroll && !this.props.shouldLockBgScroll) {
      this.unlockBgScroll();
      return;
    }

    if (!props.shouldLockBgScroll && !!this.props.shouldLockBgScroll) {
      this.lockBgScroll();
      return;
    }

    if (
      props.transitionState !== this.props.transitionState &&
      this.props.transitionState === 'entered' &&
      !!this.props.shouldLockBgScroll
    ) {
      this.lockBgScroll();
    }
  }

  componentWillUnmount() {
    const { shouldLockBgScroll } = this.props;
    if (shouldLockBgScroll) {
      this.unlockBgScroll();
    }
  }

  lockBgScroll = () => {
    const { scrollTarget } = this.props;
    disableBodyScroll(scrollTarget);
  };

  unlockBgScroll = () => {
    const { scrollTarget } = this.props;
    enableBodyScroll(scrollTarget);
    clearAllBodyScrollLocks();
  };

  render = () => {
    const {
      dialogAriaLabel,
      dialogStyles,
      transitionStyles,
      transitionState,
      content,
      renderHeader,
      renderFooter
    } = this.props;

    return (
      <FocusLock>
        <div
          aria-label={dialogAriaLabel}
          role="dialog"
          css={{
            ...dialogStyles,
            ...transitionStyles[transitionState]
          }}
        >
          {renderHeader()}
          {content}
          {renderFooter()}
        </div>
      </FocusLock>
    );
  };
}

Dialog.propTypes = {
  dialogAriaLabel: PropTypes.string.isRequired,
  dialogStyles: PropTypes.shape().isRequired,
  transitionStyles: PropTypes.shape({
    entering: PropTypes.shape.isRequired,
    entered: PropTypes.shape.isRequired,
    exiting: PropTypes.shape.isRequired
  }).isRequired,
  transitionState: PropTypes.string,
  content: PropTypes.node.isRequired,
  renderHeader: PropTypes.func.isRequired,
  renderFooter: PropTypes.func.isRequired,
  shouldLockBgScroll: PropTypes.bool,
  scrollTarget: PropTypes.instanceOf(Element)
};

Dialog.defaultProps = {
  transitionState: null,
  shouldLockBgScroll: false,
  scrollTarget: null
};

export default Dialog;
