import React, { Component } from 'react';
import PropTypes from 'prop-types';

import noop from '../../utils/noop';
import { mq, layout, fontFamily } from '../../theme/airways';

import ButtonWithDialog, {
  transitionStylesSlideUp,
  dialogStylesFullScreen,
  ButtonContent
} from '../../shared/ButtonWithDialog';
import Header from './components/Header';
import Footer from './components/Footer';
import { withMediaQueryDetector } from '../MediaQueryDetector';

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

  renderFooter = ({ closeDialog }) => {
    const {
      closeAriaLabel,
      footerLabelsPrimary,
      footerLabelPrimaryAriaTitle,
      footerActionText,
      onFooterAction,
      preFooter
    } = this.props;

    return (
      <Footer
        primaryLabels={footerLabelsPrimary}
        primaryLabelAriaTitle={footerLabelPrimaryAriaTitle}
        actionText={footerActionText}
        onAction={() => onFooterAction(closeDialog)}
        closeAriaLabel={closeAriaLabel}
        preFooter={preFooter}
      />
    );
  };

  hasDialogDimensions = () => {
    const { dialogDimensions } = this.props;
    return (
      dialogDimensions && dialogDimensions.height && dialogDimensions.width
    );
  };

  getDialogStyles = () => {
    const { dialogDimensions } = this.props;
    return {
      fontFamily: fontFamily.body,
      ...dialogStylesFullScreen,
      ...(this.hasDialogDimensions() && {
        [mq.medium]: {
          position: 'absolute',
          height: 'auto',
          minHeight: dialogDimensions.height,
          width: dialogDimensions.width
        }
      })
    };
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
      Icon,
      iconLabelButtonValue,
      disableHeader,
      disableFooter,
      matchesQuery: isAtLeastTablet
    } = this.props;
    return (
      <ButtonWithDialog
        contentPadding={layout.gutter}
        lockBgScroll={!isAtLeastTablet}
        onBlur={onBlur}
        onClose={onClose}
        buttonLabel={buttonLabel}
        placeHolder={placeHolder}
        closeAriaLabel={closeAriaLabel}
        dialogAriaLabel={dialogAriaLabel}
        Icon={Icon}
        renderHeader={disableHeader ? noop : this.renderHeader}
        renderFooter={disableFooter ? noop : this.renderFooter}
        renderButtonValue={this.renderButtonValue}
        iconLabelButtonValue={iconLabelButtonValue}
        dialogStyles={this.getDialogStyles()}
        hasDialogDimensions={this.hasDialogDimensions()}
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
  /** Custom dimensions to apply to dialog when viewing on a non-mobile device */
  dialogDimensions: PropTypes.shape({
    height: PropTypes.string,
    width: PropTypes.string
  }),
  /** Placeholder to be displayed if no large or small values are provided */
  placeHolder: PropTypes.string,
  /** Icon displayed in the field button */
  Icon: PropTypes.func,
  /** Label displayed in the dialog header */
  headerLabel: PropTypes.string,
  /** Icon displayed in the dialog header */
  HeaderIcon: PropTypes.func,
  /** Custom Label and Icon for the field button. When provided, this signals to
   * PopupField to render special icon/label pairing layout for the button */
  iconLabelButtonValue: PropTypes.shape({
    icon: PropTypes.any,
    label: PropTypes.string
  }),
  /* Disables rendering dialog header */
  disableHeader: PropTypes.bool,
  /* Disables rendering dialog header */
  disableFooter: PropTypes.bool,
  /* Strings rendered to individual lines alongside the footerAction button */
  footerLabelsPrimary: PropTypes.arrayOf(PropTypes.string),
  /* Title attribute passed to footer primaryLabels container */
  footerLabelPrimaryAriaTitle: PropTypes.string,
  /* Text that appears inside footerAction button */
  footerActionText: PropTypes.string,
  /* Triggered on clicking footerAction button */
  onFooterAction: PropTypes.func,
  /* Custom content that renders just above footer */
  preFooter: PropTypes.node,
  /* Flag intended to indicate if is on desktop device */
  matchesQuery: PropTypes.bool.isRequired
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
  HeaderIcon: null,
  dialogDimensions: null,
  iconLabelButtonValue: null,
  disableHeader: false,
  disableFooter: true,
  footerLabelsPrimary: [],
  footerLabelPrimaryAriaTitle: null,
  footerActionText: null,
  onFooterAction: () => {},
  preFooter: null
};

export default withMediaQueryDetector(PopupField, mq.medium);
