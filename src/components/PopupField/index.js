import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

import noop from '../../utils/noop';
import { layout } from '../../theme/airways';

import Button, { ButtonContent } from './components/Button';
import Header from './components/Header';

const transitionStyles = {
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

class PopupField extends Component {
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
      this.closePopup();
    }
  };

  openPopup = () => {
    this.setState({
      open: true
    });
  };

  closePopup = () => {
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

  render() {
    const {
      children,
      onBlur,
      largeButtonValue,
      smallButtonValue,
      buttonLabel,
      closeAriaLabel,
      dialogAriaLabel,
      placeHolder,
      Icon,
      headerLabel,
      HeaderIcon
    } = this.props;

    const { open } = this.state;

    const content =
      typeof children === 'function'
        ? children({
            closePopup: this.closePopup,
            setFocusElementRef: this.setFocusElementRef
          })
        : children;

    return (
      <div
        ref={el => {
          this.wrapper = el;
        }}
      >
        <Button
          onClick={this.openPopup}
          onBlur={onBlur}
          largeButtonValue={largeButtonValue}
          smallButtonValue={smallButtonValue}
          setButtonRef={this.setButtonRef}
          open={open}
          buttonLabel={buttonLabel}
          placeHolder={placeHolder}
          Icon={Icon}
        />
        <Transition
          in={open}
          onExited={this.onExited}
          onEntered={this.onEntered}
          timeout={300}
          unmountOnExit
        >
          {state => (
            <div
              css={{
                label: 'runway-popup-field__dialog',
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
                flexDirection: 'column',
                ...transitionStyles[state]
              }}
              role="dialog"
              aria-label={dialogAriaLabel}
            >
              <Header
                setFocusElementRef={this.setFocusElementRef}
                closePopup={this.closePopup}
                headerLabel={headerLabel}
                HeaderIcon={HeaderIcon}
                closeAriaLabel={closeAriaLabel}
              />
              <div
                css={{ overflow: 'auto', padding: `0 0 0 ${layout.gutter}` }}
              >
                {content}
              </div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

PopupField.propTypes = {
  /** Children will be rendered as the content of the dialog */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /** Triggered when the dialog closes */
  onClose: PropTypes.func,
  /** Triggered on the blur event of the field button */
  onBlur: PropTypes.func,
  /** Large font size value of the field button */
  largeButtonValue: PropTypes.string,
  /** Small font size value of the field button */
  smallButtonValue: PropTypes.string,
  /** Label for the field  */
  buttonLabel: PropTypes.string,
  /** Aria label for the close button of the dialog */
  closeAriaLabel: PropTypes.string,
  /** Aria label for the dialog once opened */
  dialogAriaLabel: PropTypes.string,
  /** Placeholder to be displayed if no large or small values are provided */
  placeHolder: PropTypes.string,
  /** Icon displayed in the field button */
  Icon: PropTypes.func,
  /** Label displayed in the dialog header */
  headerLabel: PropTypes.string,
  /** Icon displayed in the dialog header */
  HeaderIcon: PropTypes.func
};

PopupField.defaultProps = {
  children: null,
  onClose: noop,
  onBlur: noop,
  largeButtonValue: '',
  smallButtonValue: '',
  buttonLabel: null,
  closeAriaLabel: 'Close dialog',
  dialogAriaLabel: '',
  placeHolder: '',
  Icon: null,
  headerLabel: '',
  HeaderIcon: null
};

export { ButtonContent };

export default PopupField;
