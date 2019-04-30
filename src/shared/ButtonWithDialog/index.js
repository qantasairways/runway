import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

import noop from '../../utils/noop';
import { layout } from '../../theme/airways';

import Button, { ButtonContent } from './components/Button';

export const transitionStylesSlideUp = {
  entering: {
    top: '100%'
  },
  entered: {
    top: 0
  },
  exiting: {
    top: '100%'
  }
};

export const dialogStylesFullScreen = {
  label: 'runway__dialog',
  background: 'white',
  boxSizing: 'border-box',
  height: '100%',
  left: 0,
  position: 'fixed',
  overflow: 'auto',
  top: 0,
  transition: `top 300ms ease-in-out`,
  width: '100%',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column'
};

class ButtonWithDialog extends Component {
  state = {
    open: false
  };

  onEntered = () => {
    document.addEventListener('click', this.handleClickOutside);
    if (this.focusElement) {
      this.focusElement.focus();
    }
  };

  onExited = () => {
    document.removeEventListener('click', this.handleClickOutside);
    this.props.onClose();

    if (this.fieldButton) {
      this.fieldButton.focus();
    }
  };

  handleClickOutside = event => {
    if (this.wrapper && !this.wrapper.contains(event.target)) {
      this.closeDialog();
    }
  };

  openDialog = () => {
    this.setState({
      open: true
    });
  };

  closeDialog = () => {
    this.setState({
      open: false
    });
  };

  setFocusElementRef = el => {
    this.focusElement = el;
  };

  setButtonRef = el => {
    this.fieldButton = el;
  };

  renderHeader = () =>
    this.props.renderHeader({
      closeDialog: this.closeDialog,
      setFocusElementRef: this.focusElementRef
    });

  renderButton = () => {
    const { open } = this.state;
    const {
      children,
      dialogAriaLabel,
      renderHeader,
      ...buttonProps
    } = this.props;

    return (
      <Button
        onClick={this.openDialog}
        setButtonRef={this.setButtonRef}
        open={open}
        {...buttonProps}
      />
    );
  };

  render() {
    const {
      children,
      dialogAriaLabel,
      dialogStyles,
      transitionStyles,
      contentPadding
    } = this.props;

    const { open } = this.state;

    const content =
      typeof children === 'function'
        ? children({
            closeDialog: this.closeDialog,
            setFocusElementRef: this.setFocusElementRef
          })
        : children;

    return (
      <div
        ref={el => {
          this.wrapper = el;
        }}
      >
        {this.renderButton()}
        <Transition
          in={open}
          onExited={this.onExited}
          onEntered={this.onEntered}
          timeout={300}
          unmountOnExit
        >
          {state => (
            <div
              aria-label={dialogAriaLabel}
              role="dialog"
              css={{
                ...dialogStyles,
                ...transitionStyles[state]
              }}
            >
              {this.renderHeader()}
              <div css={{ overflow: 'auto', padding: contentPadding }}>
                {content}
              </div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

ButtonWithDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  renderButtonValue: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  onBlur: PropTypes.func,
  renderHeader: PropTypes.func,
  closeAriaLabel: PropTypes.string,
  dialogAriaLabel: PropTypes.string,
  dialogStyles: PropTypes.shape().isRequired,
  transitionStyles: PropTypes.shape({
    entering: PropTypes.shape.isRequired,
    entered: PropTypes.shape.isRequired,
    exiting: PropTypes.shape.isRequired
  }).isRequired,
  contentPadding: PropTypes.string
};

ButtonWithDialog.defaultProps = {
  children: null,
  onClose: noop,
  onBlur: noop,
  renderHeader: noop,
  closeAriaLabel: '',
  dialogAriaLabel: '',
  contentPadding: `0 ${layout.gutter}`
};

export { ButtonContent };

export default ButtonWithDialog;
