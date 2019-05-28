import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { Transition } from 'react-transition-group';
import {
  colours,
  layout,
  fontSize,
  fontFamily,
  fontWeight,
  mq
} from '../../../theme/airways';
import Button from '../../Button';
import { numberWithCommas, fmtCurrency } from '../helpers';

const wrapperStyle = {
  transform: 'translateY(100%)',
  transition: 'transform 300ms linear',
  width: '100%',
  position: 'fixed',
  bottom: 0,
  backgroundColor: colours.white,
  fontFamily: fontFamily.main
};

const wrapperTransitionStyle = {
  entering: {
    transform: 'translateY(0)'
  },
  entered: {
    transform: 'translateY(0)'
  },
  exiting: {
    transform: 'translateY(100%)'
  },
  exited: { transform: 'translateY(100%)' }
};

const innerWrapperStyle = {
  padding: `7.5px ${layout.gutter}`,
  width: '100%',
  maxWidth: '1030px',
  margin: '0 auto'
};

const preFooterStyle = {
  transition: 'transform 300ms linear',
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'translateY(0)',
  boxShadow: '0 -4px 6px 0 rgba(0, 0, 0, 0.08)',
  width: '100%',
  backgroundColor: colours.white
};

const preFooterTextContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline'
};

const preFooterTransitionStyle = {
  entering: {
    transform: 'translateY(-100%)'
  },
  entered: {
    transform: 'translateY(-100%)'
  },
  exiting: {
    transform: 'translateY(0)'
  },
  exited: { transform: 'translateY(0)' }
};

const preFooterTextStyle = {
  label: 'runway-footer_info-label',
  fontSize: '0.875rem',
  lineHeight: '2',
  color: colours.darkerGrey,
  [mq.medium]: {
    marginRight: '5px'
  }
};

const bottomFooterStyle = {
  padding: layout.gutter,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative'
};

const bottomFooterLeftCol = {
  display: 'flex',
  flexDirection: 'column',
  [mq.small]: {
    paddingRight: layout.gutter
  },
  [mq.medium]: {
    flexDirection: 'row',
    alignItems: 'center'
  }
};

const bottomFooterTextStyle = {
  label: 'runway-footer_summary-label',
  fontSize: fontSize.body,
  lineHeight: 1.56,
  [mq.medium]: {
    marginRight: '5px'
  }
};

const disclaimerStyle = {
  fontSize: '0.875rem',
  lineHeight: 1.29,
  color: colours.darkGrey
};

export function topDisclaimerStyle() {
  return css({
    label: 'runway-footer_disclaimer-label',
    ...disclaimerStyle
  });
}

// Not sure if this is needed any more?? Disclaimer will always stay on top?
export function bottonDisclaimerStyle() {
  return css({
    label: 'runway-footer_button_disclaimer-label',
    ...disclaimerStyle,
    [mq.medium]: {
      fontSize: fontSize.body
    }
  });
}

const actionButtonStyle = {
  fontWeight: fontWeight.regular,
  letterSpacing: '1.5px',
  height: '48px',
  width: '100px',
  borderRadius: '4px',
  borderWidth: '0',
  padding: '0 0 0 1px'
};

const Footer = ({
  bottomFootersummaryLabel,
  preFooterInfo,
  bottomFooterDisclaimer,
  preFooterDisclaimer,
  actionText,
  showPreFooter,
  showBottomFooter,
  onActionButtonClick,
  endDateData
}) => (
  <Transition in={showBottomFooter} timeout={300}>
    {wrapperTransition => (
      <div
        css={{
          ...wrapperStyle,
          ...wrapperTransitionStyle[wrapperTransition]
        }}
      >
        <Transition in={preFooterInfo && showPreFooter} timeout={300}>
          {preFooterTransition => (
            <div
              css={{
                borderBottom:
                  showPreFooter && showBottomFooter
                    ? '1px solid #eeeeee'
                    : 'none',
                ...preFooterStyle,
                ...preFooterTransitionStyle[preFooterTransition]
              }}
            >
              <div
                css={{ ...innerWrapperStyle, ...preFooterTextContainerStyle }}
              >
                <span css={preFooterTextStyle}>{preFooterInfo}</span>
                {preFooterDisclaimer && (
                  <span css={topDisclaimerStyle()}>{preFooterDisclaimer}</span>
                )}
              </div>
            </div>
          )}
        </Transition>
        {showBottomFooter && (
          <div
            css={{
              ...innerWrapperStyle,
              ...bottomFooterStyle
            }}
          >
            <div css={bottomFooterLeftCol}>
              {bottomFootersummaryLabel && (
                <span css={bottomFooterTextStyle}>
                  {bottomFootersummaryLabel}
                  <span
                    css={{
                      color: endDateData.price.isLowestPrice
                        ? '#009400'
                        : colours.darkerGrey,
                      fontWeight: fontWeight.bold
                    }}
                  >
                    {endDateData &&
                      endDateData.currencySymbol +
                        numberWithCommas(fmtCurrency(endDateData.price.value))}
                  </span>
                </span>
              )}
              {bottomFooterDisclaimer && (
                <span css={bottonDisclaimerStyle()}>
                  {bottomFooterDisclaimer}
                </span>
              )}
            </div>
            <div>
              <Button
                label={actionText}
                cssOverrides={[actionButtonStyle]}
                onClick={onActionButtonClick}
              />
            </div>
          </div>
        )}
      </div>
    )}
  </Transition>
);

Footer.propTypes = {
  showPreFooter: PropTypes.bool,
  showBottomFooter: PropTypes.bool,
  bottomFootersummaryLabel: PropTypes.string,
  preFooterInfo: PropTypes.string,
  preFooterDisclaimer: PropTypes.string,
  bottomFooterDisclaimer: PropTypes.string,
  actionText: PropTypes.string.isRequired,
  onActionButtonClick: PropTypes.func.isRequired,
  endDateData: PropTypes.shape({
    price: PropTypes.shape({
      value: PropTypes.number,
      taxValue: PropTypes.number,
      points: PropTypes.number,
      isClassic: PropTypes.bool,
      isLowestPrice: PropTypes.bool
    }),
    currencyCode: '',
    currencySymbol: ''
  })
};

Footer.defaultProps = {
  showPreFooter: false,
  showBottomFooter: false,
  bottomFootersummaryLabel: '',
  preFooterInfo: '',
  preFooterDisclaimer: '',
  bottomFooterDisclaimer: '',
  endDateData: null
};

export default Footer;
