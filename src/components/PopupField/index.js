import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

import noop from '../../utils/noop';

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
      renderButtonValue,
      buttonLabel,
      closeAriaLabel,
      dialogAriaLabel,
      placeHolder,
      Icon,
      headerLabel,
      headerHeight,
      HeaderIcon,
      renderHeaderChildren
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
          renderButtonValue={renderButtonValue}
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
                headerHeight={headerHeight}
                HeaderIcon={HeaderIcon}
                closeAriaLabel={closeAriaLabel}
                renderHeaderChildren={renderHeaderChildren}
              />
              <div css={{ overflow: 'auto' }}>{content}</div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

PopupField.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onClose: PropTypes.func,
  onBlur: PropTypes.func,
  renderButtonValue: PropTypes.func,
  largeButtonValue: PropTypes.string,
  smallButtonValue: PropTypes.string,
  buttonLabel: PropTypes.string,
  closeAriaLabel: PropTypes.string,
  dialogAriaLabel: PropTypes.string,
  placeHolder: PropTypes.string,
  Icon: PropTypes.func,
  headerLabel: PropTypes.string,
  headerHeight: PropTypes.number,
  HeaderIcon: PropTypes.func,
  renderHeaderChildren: PropTypes.func
};

PopupField.defaultProps = {
  children: null,
  onClose: noop,
  onBlur: noop,
  renderButtonValue: null,
  largeButtonValue: '',
  smallButtonValue: '',
  buttonLabel: null,
  closeAriaLabel: 'Close dialog',
  dialogAriaLabel: '',
  placeHolder: '',
  Icon: null,
  headerLabel: '',
  headerHeight: undefined,
  HeaderIcon: null,
  renderHeaderChildren: noop
};

export { ButtonContent };

export default PopupField;
