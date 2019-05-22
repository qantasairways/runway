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
} from '../../theme/airways';
import Button from '../Button';

const wrapperStyle = {
  transform: 'translateY(100%)',
  transition: 'transform 300ms linear',
  width: '100%',
  position: 'relative',
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
  padding: layout.gutter,
  width: '100%',
  maxWidth: '1030px',
  margin: '0 auto'
};

const preFooterStyle = {
  transition: 'transform 300ms linear',
  display: 'flex',
  transform: 'translateY(0)',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: '0 -4px 6px 0 rgba(0, 0, 0, 0.08)',
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundColor: colours.white,
  [mq.medium]: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'baseline'
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
  lineHeight: '2',
  color: colours.darkerGrey,
  [mq.medium]: {
    marginRight: '5px'
  }
};

const bottomFooterStyle = {
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
  letterSpacing: '1.5px'
};

const Footer = ({
  summaryLabel,
  info,
  bottomFooterDisclaimer,
  preFooterDisclaimer,
  actionText,
  points,
  isCheapest,
  showPreFooter,
  showBottomFooter,
  onActionButtonClick
}) => (
  <Transition in={showBottomFooter} timeout={300}>
    {wrapperTransition => (
      <div
        css={{
          ...wrapperStyle,
          ...wrapperTransitionStyle[wrapperTransition]
        }}
      >
        <Transition in={info && showPreFooter} timeout={300}>
          {preFooterTransition => (
            <div
              css={{
                borderBottom:
                  showPreFooter && showBottomFooter
                    ? '1px solid #eeeeee'
                    : 'none',
                ...innerWrapperStyle,
                ...preFooterStyle,
                ...preFooterTransitionStyle[preFooterTransition]
              }}
            >
              <span css={preFooterTextStyle}>{info}</span>
              {preFooterDisclaimer && (
                <span css={topDisclaimerStyle()}>{preFooterDisclaimer}</span>
              )}
            </div>
          )}
        </Transition>
        <div
          css={{
            ...innerWrapperStyle,
            ...bottomFooterStyle
          }}
        >
          <div css={bottomFooterLeftCol}>
            {summaryLabel && (
              <span css={bottomFooterTextStyle}>
                {summaryLabel}
                <span
                  css={{
                    color: isCheapest ? '#009400' : colours.darkerGrey,
                    fontWeight: fontWeight.bold
                  }}
                >
                  {points}
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
      </div>
    )}
  </Transition>
);

Footer.propTypes = {
  isCheapest: PropTypes.bool,
  showPreFooter: PropTypes.bool,
  showBottomFooter: PropTypes.bool,
  summaryLabel: PropTypes.string,
  points: PropTypes.string,
  info: PropTypes.string,
  preFooterDisclaimer: PropTypes.string,
  bottomFooterDisclaimer: PropTypes.string,
  actionText: PropTypes.string.isRequired,
  onActionButtonClick: PropTypes.func.isRequired
};

Footer.defaultProps = {
  isCheapest: false,
  showPreFooter: true,
  showBottomFooter: true,
  summaryLabel: '',
  points: '',
  info: '',
  preFooterDisclaimer: '',
  bottomFooterDisclaimer: ''
};

export default Footer;
