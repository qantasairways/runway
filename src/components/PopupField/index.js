import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Transition } from 'react-transition-group';

class PopupField extends Component {
  state = {
    open: false
  };

  onEntered = () => {
    document.addEventListener('click', this.handleClickOutside);
    this.closeButton.focus();
  };

  onExited = () => {
    document.removeEventListener('click', this.handleClickOutside);
    this.props.onClose();
    this.fieldButton.focus();
  };

  handleClickOutside = event => {
    if (this.wrapper && !this.wrapper.contains(event.target)) {
      this.togglePopup();
    }
  };

  togglePopup = () => {
    this.setState(({ open }) => ({
      open: !open
    }));
  };

  render() {
    const {
      openAriaLabel,
      closeAriaLabel,
      popupAriaLabel,
      navigationAriaLabel,
      children,
      onBlur,
      buttonContent
    } = this.props;

    const { open } = this.state;

    const content =
      typeof children === 'function'
        ? children({
            closePopup: this.togglePopup
          })
        : children;

    const transitionStyles = {
      entering: {
        transform: 'translateY(100vh)'
      },
      entered: {
        transform: 'translateY(0vh)'
      },
      exiting: {
        transform: 'translateY(100vh)'
      }
    };

    return (
      <div
        ref={el => {
          this.wrapper = el;
        }}
      >
        <button
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={`${open ? closeAriaLabel : openAriaLabel}`}
          onClick={this.togglePopup}
          onBlur={onBlur}
          ref={el => {
            this.fieldButton = el;
          }}
          type="button"
        >
          {buttonContent}
        </button>
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
                background: 'white',
                boxSizing: 'border-box',
                height: '100%',
                left: 0,
                padding: '15px',
                position: 'fixed',
                top: 0,
                transform: 'translateY(0vh)',
                transition: `transform 300ms ease-in-out`,
                width: '100%',
                zIndex: 1000,
                ...transitionStyles[state]
              }}
              role="dialog"
              aria-label={popupAriaLabel}
            >
              <button
                aria-label={`${closeAriaLabel}. ${navigationAriaLabel}`}
                onClick={this.togglePopup}
                type="button"
                ref={el => {
                  this.closeButton = el;
                }}
              >
                {'<'}
              </button>
              <div>{content}</div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

PopupField.propTypes = {
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  openAriaLabel: PropTypes.string,
  closeAriaLabel: PropTypes.string,
  popupAriaLabel: PropTypes.string,
  navigationAriaLabel: PropTypes.string,
  onClose: PropTypes.func,
  onBlur: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

PopupField.defaultProps = {
  openAriaLabel: 'Open dialog',
  closeAriaLabel: 'Close dialog',
  popupAriaLabel: 'Dialog is open',
  navigationAriaLabel: 'Tab to navigate',
  onClose: () => {},
  onBlur: () => {},
  children: null
};

export default PopupField;
