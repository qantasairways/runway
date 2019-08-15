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

const sharedFooterStyle = {
  boxShadow: '0 -4px 6px 0 rgba(0, 0, 0, 0.08)'
};

const preFooterStyle = {
  transition: 'transform 300ms linear',
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'translateY(0)',
  boxShadow: sharedFooterStyle.boxShadow,
  width: '100%',
  backgroundColor: colours.white
};

const preFooterTextContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  [mq.medium]: {
    display: 'block'
  }
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
  lineHeight: '1.29',
  color: colours.darkerGrey,
  [mq.medium]: {
    marginRight: '5px',
    fontSize: fontSize.label
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
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  [mq.small]: {
    paddingRight: layout.gutter
  }
};

const bottomFooterTextStyle = {
  label: 'runway-footer_summary-label',
  fontSize: fontSize.body,
  lineHeight: 1.56,
  [mq.medium]: {
    fontSize: fontSize.labelLarge
  }
};

const disclaimerStyle = {
  fontSize: '0.875rem',
  lineHeight: 1.29,
  color: colours.mediumDarkGrey
};

export function topDisclaimerStyle() {
  return css({
    label: 'runway-footer_disclaimer-label',
    ...disclaimerStyle,
    [mq.medium]: {
      fontSize: fontSize.label
    }
  });
}

export function bottonDisclaimerStyle() {
  return css({
    label: 'runway-footer_button_disclaimer-label',
    fontSize: fontSize.body,
    lineHeight: 1.29,
    color: colours.mediumDarkGrey,
    fontWeight: fontWeight.bold,
    [mq.medium]: {
      fontSize: fontSize.labelLarge
    }
  });
}

const actionButtonStyle = {
  letterSpacing: '1.5px',
  height: '48px',
  width: '100px',
  borderRadius: '4px',
  borderWidth: '0',
  padding: '2px 0 0 3px'
};

const Footer = ({
  bottomFootersummaryLabel,
  preFooterInfo,
  preFooterDisclaimer,
  actionText,
  showPreFooter,
  showBottomFooter,
  onActionButtonClick,
  endDateData,
  priceInPoints,
  pointsLabel
}) => {
  const shouldShowPreFooterContents = preFooterInfo;
  const shouldShowBottomFooterTextContents =
    showBottomFooter &&
    endDateData &&
    endDateData.price &&
    endDateData.price.value;

  const setPreFooterDisclaimer =
    preFooterDisclaimer &&
    priceInPoints &&
    (!endDateData ||
      (endDateData && endDateData.price && endDateData.price.isClassic));

  return (
    <Transition in={showBottomFooter} timeout={300}>
      {wrapperTransition => (
        <div
          css={{
            ...wrapperStyle,
            ...wrapperTransitionStyle[wrapperTransition],
            ...(!shouldShowPreFooterContents && {
              boxShadow: sharedFooterStyle.boxShadow
            })
          }}
        >
          {shouldShowPreFooterContents && (
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
                    css={{
                      ...innerWrapperStyle,
                      ...preFooterTextContainerStyle
                    }}
                  >
                    <span css={preFooterTextStyle}>{preFooterInfo}</span>
                    {setPreFooterDisclaimer ? (
                      <span css={topDisclaimerStyle()}>
                        {preFooterDisclaimer}
                      </span>
                    ) : null}
                  </div>
                </div>
              )}
            </Transition>
          )}
          {showBottomFooter && (
            <div
              css={{
                ...innerWrapperStyle,
                ...bottomFooterStyle
              }}
            >
              {shouldShowBottomFooterTextContents ? (
                <div css={bottomFooterLeftCol}>
                  {bottomFootersummaryLabel && (
                    <span css={bottomFooterTextStyle}>
                      {bottomFootersummaryLabel}

                      <span
                        css={{
                          color:
                            (!priceInPoints &&
                              endDateData &&
                              endDateData.price &&
                              endDateData.price.isLowestPrice) ||
                            (priceInPoints &&
                              endDateData &&
                              endDateData.price &&
                              endDateData.price.isLowestPoints)
                              ? '#009400'
                              : colours.darkerGrey,
                          fontWeight: fontWeight.bold,
                          margin: '0 5px'
                        }}
                      >
                        <span>
                          {endDateData && endDateData.price && priceInPoints
                            ? numberWithCommas(endDateData.price.points)
                            : endDateData.currencySymbol +
                              numberWithCommas(
                                fmtCurrency(endDateData.price.value)
                              )}
                        </span>
                        {endDateData && priceInPoints ? (
                          <span css={{ marginLeft: '5px' }}>{pointsLabel}</span>
                        ) : null}
                      </span>
                    </span>
                  )}

                  {endDateData &&
                  endDateData.price &&
                  priceInPoints &&
                  endDateData.price.isClassic ? (
                    <div css={bottonDisclaimerStyle()}>
                      <span>+ </span>
                      <span>{endDateData.currencySymbol}</span>
                      <span>{endDateData.price.taxValue}</span>
                      <span>^</span>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div css={bottomFooterLeftCol} />
              )}
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
};

Footer.propTypes = {
  showPreFooter: PropTypes.bool,
  showBottomFooter: PropTypes.bool,
  bottomFootersummaryLabel: PropTypes.string,
  preFooterInfo: PropTypes.string,
  preFooterDisclaimer: PropTypes.string,
  actionText: PropTypes.string.isRequired,
  onActionButtonClick: PropTypes.func.isRequired,
  endDateData: PropTypes.shape({
    price: PropTypes.shape({
      value: PropTypes.number,
      taxValue: PropTypes.number,
      points: PropTypes.number,
      isClassic: PropTypes.bool,
      isLowestPrice: PropTypes.bool,
      isLowestPoints: PropTypes.bool
    }),
    currencyCode: '',
    currencySymbol: ''
  }),
  priceInPoints: PropTypes.bool,
  pointsLabel: PropTypes.string
};

Footer.defaultProps = {
  showPreFooter: false,
  showBottomFooter: false,
  bottomFootersummaryLabel: '',
  preFooterInfo: '',
  preFooterDisclaimer: '',
  endDateData: null,
  priceInPoints: false,
  pointsLabel: ''
};

export default Footer;
