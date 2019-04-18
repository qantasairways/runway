import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Transition } from 'react-transition-group';
import ButtonContent from './components/ButtonContent';
import { fontWeight, colours, layout, fontFamily } from '../../theme/airways';

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

  render() {
    const {
      closeAriaLabel,
      children,
      className,
      onBlur,
      fieldLabel,
      placeHolder,
      largeValue,
      smallValue,
      icon
    } = this.props;

    const { open } = this.state;

    const content =
      typeof children === 'function'
        ? children({
            closePopup: this.closePopup
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

    const contentAriaLabel =
      largeValue || smallValue
        ? `${largeValue || ''} ${smallValue || ''}`
        : placeHolder;

    return (
      <div
        ref={el => {
          this.wrapper = el;
        }}
      >
        <button
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={`${fieldLabel}. ${contentAriaLabel}.`}
          className={className}
          onClick={this.openPopup}
          onBlur={onBlur}
          ref={el => {
            this.fieldButton = el;
          }}
          type="button"
          css={{
            border: 0,
            width: '100%',
            cursor: 'pointer',
            backgroundColor: colours.darkerGrey,
            padding: `0 ${layout.gutter}`,
            position: 'relative',
            fontFamily: fontFamily.body,
            fontWeight: fontWeight.bold
          }}
        >
          <ButtonContent
            fieldLabel={fieldLabel}
            placeHolder={placeHolder}
            largeValue={largeValue}
            smallValue={smallValue}
            icon={icon}
          />
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
            >
              <button
                aria-label={closeAriaLabel}
                onClick={this.closePopup}
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
  closeAriaLabel: PropTypes.string,
  onClose: PropTypes.func,
  onBlur: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  className: PropTypes.string,
  fieldLabel: PropTypes.string,
  largeValue: PropTypes.string,
  smallValue: PropTypes.string,
  placeHolder: PropTypes.string,
  icon: PropTypes.element
};

PopupField.defaultProps = {
  closeAriaLabel: 'Close dialog',
  onClose: () => {},
  onBlur: () => {},
  children: null,
  className: null,
  fieldLabel: null,
  largeValue: null,
  smallValue: null,
  placeHolder: '',
  icon: null
};

export default PopupField;
