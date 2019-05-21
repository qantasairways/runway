import React from 'react';
import PropTypes from 'prop-types';
import { keyframes } from 'emotion';

import { colours, mq } from '../../../theme/airways';
import { CSS_PSEUDO_AFTER } from '../../../constants/css';
import { abbrNum, numberWithCommas } from '../helpers';

const priceFontStyles = {
  fontSize: '0.8125rem',
  fontWeight: 500,
  lineHeight: 1,
  [mq.medium]: {
    fontSize: '0.875rem'
  }
};

const loadingPrice = keyframes`
  from {
    background-position: -26px 0px
  }
  to {
    background-position:0
  }
`;

const outPrice = keyframes`
0% {
  opacity: 1;
  transform: translate3d(0,0,0);
}
100% {
  opacity: 0;
  transform: translate3d(4px,0,0);
}`;

const enterPrice = keyframes`
0% {
  opacity: 0;
  transform: translate3d(4px,0,0);
}
100% {
  opacity: 1;
  transform: translate3d(0,0,0);
}`;

function Price({
  isLoadingPrice,
  value,
  taxValue,
  currencySymbol,
  isLowestPrice,
  isDesktopDevice
}) {
  return (
    <div
      css={{
        marginTop: '3px',
        width: '100%',
        [mq.medium]: {
          marginTop: '7px'
        }
      }}
    >
      <div
        css={{
          ...priceFontStyles,
          position: 'absolute',
          left: '50%',
          width: '26px',
          marginLeft: '-13px',
          animation: !isLoadingPrice
            ? `${outPrice} 500ms linear forwards`
            : 'none',
          [CSS_PSEUDO_AFTER]: {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            top: '2px',
            height: '7px',
            margin: '0 auto',
            animation: `${loadingPrice} 2s linear infinite`,
            background:
              'linear-gradient(to right,rgba(0,0,0,0.06) 20%,rgba(0,0,0,0.01) 70%,rgba(0,0,0,0.05) 100%)',
            bottom: '1px',
            boxShadow: '0 0 1px rgba(0,0,0,0.12)',
            borderRadius: '4px'
          },
          [mq.medium]: {
            width: '30px',
            marginLeft: '-15px',
            [CSS_PSEUDO_AFTER]: {
              height: '10px'
            }
          }
        }}
      />
      {!isLoadingPrice && (
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            animation: `${enterPrice} 250ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
            [mq.medium]: {
              flexDirection: 'row',
              alignItems: 'center'
            }
          }}
        >
          <div
            css={{
              color: isLowestPrice ? '#008600' : colours.mediumDarkGrey,
              ...priceFontStyles
            }}
          >
            {currencySymbol}
            {isDesktopDevice ? numberWithCommas(value) : abbrNum(value)}
          </div>
          {taxValue && (
            <div
              css={{
                fontSize: '0.75rem',
                lineHeight: 1,
                color: colours.mediumDarkGrey,
                [mq.medium]: {
                  fontSize: '0.8125rem',
                  marginLeft: '2px'
                }
              }}
            >
              <span>+</span>
              <span>{currencySymbol}</span>
              <span>{taxValue}</span>
              <span> ^</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Price.propTypes = {
  isLoadingPrice: PropTypes.bool,
  value: PropTypes.number,
  taxValue: PropTypes.number,
  currencySymbol: PropTypes.string,
  isLowestPrice: PropTypes.bool,
  isDesktopDevice: PropTypes.bool
};

Price.defaultProps = {
  isLoadingPrice: false,
  value: null,
  taxValue: null,
  currencySymbol: '',
  isLowestPrice: false,
  isDesktopDevice: false
};

export default Price;
