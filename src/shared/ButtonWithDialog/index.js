import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

import noop from '../../utils/noop';
import { layout, mq, fontFamily } from '../../theme/airways';

import Dialog from './components/Dialog';
import Button, { ButtonContent } from './components/Button';
import MediaQueryDetector from '../../components/MediaQueryDetector';

const getRootContainerStyles = hasDialogDimensions => ({
  label: 'runway-button-with-dialog__root-container',
  ...(hasDialogDimensions && {
    position: 'relative'
  })
});

function addQComZIndex(zIndex) {
  const main = document.querySelector('main');
  if (main) {
    main.style.zIndex = zIndex;
  }
}

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
  fontFamily: fontFamily.main,
  background: 'white',
  boxSizing: 'border-box',
  height: '100%',
  left: 0,
  position: 'fixed',
  overflow: 'auto',
  top: '100%',
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
    this.props.onOpen();
    addQComZIndex('initial');

    if (this.props.closeOnBlur) {
      document.addEventListener('click', this.handleClickOutside);
    }

    setTimeout(() => {
      if (this.focusElement) {
        this.focusElement.focus();
      }
    });
  };

  onExit = () => {
    this.props.onBeforeClose();
  };

  onExited = () => {
    this.props.onClose();
    addQComZIndex(null);

    if (this.props.closeOnBlur) {
      document.removeEventListener('click', this.handleClickOutside);
    }

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

  renderFooter = () =>
    this.props.renderFooter({
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

  collectRef = el => {
    this.wrapper = el;
  };

  render() {
    const {
      children,
      dialogAriaLabel,
      dialogStyles,
      transitionStyles,
      contentPadding,
      hasDialogDimensions
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
        css={getRootContainerStyles({ hasDialogDimensions })}
        ref={this.collectRef}
      >
        {this.renderButton()}
        <MediaQueryDetector query={mq.medium}>
          {atLeastTablet => {
            const isFullScreen = !hasDialogDimensions || !atLeastTablet;
            return (
              <Transition
                in={open}
                enter={isFullScreen}
                exit={isFullScreen}
                onExit={this.onExit}
                onExited={this.onExited}
                onEntered={this.onEntered}
                timeout={300}
                unmountOnExit
                mountOnEnter
              >
                {transitionState => (
                  <Dialog
                    lockBgScroll={isFullScreen}
                    renderHeader={isFullScreen ? this.renderHeader : noop}
                    renderFooter={this.renderFooter}
                    contentPadding={contentPadding}
                    transitionStyles={transitionStyles}
                    dialogStyles={dialogStyles}
                    dialogAriaLabel={dialogAriaLabel}
                    content={content}
                    transitionState={transitionState}
                  />
                )}
              </Transition>
            );
          }}
        </MediaQueryDetector>
      </div>
    );
  }
}

ButtonWithDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  renderButtonValue: PropTypes.func.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onBeforeClose: PropTypes.func,
  onBlur: PropTypes.func,
  closeOnBlur: PropTypes.bool,
  closeAriaLabel: PropTypes.string,
  dialogAriaLabel: PropTypes.string,
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
  dialogStyles: PropTypes.shape().isRequired,
  transitionStyles: PropTypes.shape({
    entering: PropTypes.shape.isRequired,
    entered: PropTypes.shape.isRequired,
    exiting: PropTypes.shape.isRequired
  }).isRequired,
  contentPadding: PropTypes.string,
  hasDialogDimensions: PropTypes.bool
};

ButtonWithDialog.defaultProps = {
  children: null,
  onClose: noop,
  onBeforeClose: noop,
  onOpen: noop,
  onBlur: noop,
  closeAriaLabel: '',
  closeOnBlur: true,
  renderHeader: noop,
  renderFooter: noop,
  dialogAriaLabel: '',
  contentPadding: `0 ${layout.gutter}`,
  hasDialogDimensions: false
};

export { ButtonContent };

export default ButtonWithDialog;
