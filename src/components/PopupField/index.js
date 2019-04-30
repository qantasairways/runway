import React, { Component } from 'react';
import PropTypes from 'prop-types';

import noop from '../../utils/noop';

import ButtonWithDialog, {
  transitionStylesSlideUp,
  dialogStylesFullScreen,
  ButtonContent
} from '../../shared/ButtonWithDialog';

import Header from './components/Header';

class PopupField extends Component {
  renderButtonValue = () => {
    const { largeButtonValue, smallButtonValue } = this.props;

    return largeButtonValue || smallButtonValue ? (
      <ButtonContent
        largeButtonValue={largeButtonValue}
        smallButtonValue={smallButtonValue}
      />
    ) : null;
  };

  renderHeader = ({ closeDialog }) => {
    const { closeAriaLabel, headerLabel, HeaderIcon } = this.props;

    return (
      <Header
        closeDialog={closeDialog}
        headerLabel={headerLabel}
        HeaderIcon={HeaderIcon}
        closeAriaLabel={closeAriaLabel}
      />
    );
  };

  render() {
    const {
      children,
      onBlur,
      onClose,
      buttonLabel,
      closeAriaLabel,
      dialogAriaLabel,
      placeHolder,
      Icon
    } = this.props;

    return (
      <ButtonWithDialog
        onBlur={onBlur}
        onClose={onClose}
        buttonLabel={buttonLabel}
        placeHolder={placeHolder}
        closeAriaLabel={closeAriaLabel}
        dialogAriaLabel={dialogAriaLabel}
        Icon={Icon}
        renderHeader={this.renderHeader}
        renderButtonValue={this.renderButtonValue}
        dialogStyles={dialogStylesFullScreen}
        transitionStyles={transitionStylesSlideUp}
      >
        {children}
      </ButtonWithDialog>
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

export default PopupField;
