/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock';
import { generate } from 'shortid';

const dialogContentContainerStyles = ({ contentPadding }) => ({
  ...(contentPadding && { padding: contentPadding }),
  'overflow-y': 'auto',
  '-webkit-overflow-scrolling': 'touch',
  flex: 1
});

class Dialog extends Component {
  targetElement = null;

  dialogContentContainerId = generate();

  componentDidMount() {
    const { lockBgScroll } = this.props;

    if (lockBgScroll) {
      this.targetElement = document.getElementById(
        this.dialogContentContainerId
      );
      disableBodyScroll(this.targetElement);
    }
  }

  componentWillUnmount() {
    const { lockBgScroll } = this.props;
    if (lockBgScroll) {
      enableBodyScroll(this.targetElement);
      clearAllBodyScrollLocks();
    }
  }

  render = () => {
    const {
      dialogAriaLabel,
      dialogStyles,
      transitionStyles,
      transitionState,
      contentPadding,
      content,
      renderHeader,
      renderFooter
    } = this.props;
    return (
      <div
        aria-label={dialogAriaLabel}
        role="dialog"
        css={{
          ...dialogStyles,
          ...transitionStyles[transitionState]
        }}
      >
        {renderHeader()}
        <div
          id={this.dialogContentContainerId}
          css={dialogContentContainerStyles({ contentPadding })}
        >
          {content}
        </div>
        {renderFooter()}
      </div>
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
  contentPadding: PropTypes.string,
  content: PropTypes.node.isRequired,
  renderHeader: PropTypes.func.isRequired,
  renderFooter: PropTypes.func.isRequired,
  lockBgScroll: PropTypes.bool
};

Dialog.defaultProps = {
  transitionState: null,
  contentPadding: null,
  lockBgScroll: false
};

export default Dialog;
