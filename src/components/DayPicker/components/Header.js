import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import {
  colours,
  fontWeight,
  fontSize,
  mq,
  layout
} from '../../../theme/airways';

import Tabs from './Tabs';
import QantasLogo from '../../../icons/QantasLogo';
import CrossIcon from '../../../icons/CrossIcon';
import noop from '../../../utils/noop';

const ICON_SIZE = '32px';

const weekdayStyles = {
  width: '100%',
  height: '30px',
  fontSize: '0.875rem',
  lineHeight: '0.875rem',
  textAlign: 'center',
  boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 0 1px 0 rgba(0, 0, 0, 0.04)',
  [mq.medium]: {
    height: '40px'
  }
};

function orderLabels(firstDayOfWeek, dayLabels) {
  return dayLabels
    .slice(firstDayOfWeek)
    .concat(dayLabels.slice(0, firstDayOfWeek));
}

function Header({
  closeDialog,
  startDate,
  endDate,
  firstDayOfWeek,
  isSelectingStartDate,
  isDateRange,
  closeAriaLabel,
  headerLabel,
  dayLabels,
  startSelectedLabel,
  endSelectedLabel,
  startPlaceholder,
  endPlaceholder,
  rowStyles,
  Icon,
  onKeyDown,
  setFocusElementRef
}) {
  const orderedLabels = orderLabels(firstDayOfWeek, dayLabels);

  return (
    <div css={{ zIndex: 1 }}>
      <div
        css={{
          fontWeight: fontWeight.bold,
          background: colours.darkerGrey,
          color: colours.white
        }}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: layout.paddingContainerMaxWidth,
            margin: '0 auto',
            padding: `0 0 0 ${layout.gutter}`
          }}
        >
          <QantasLogo
            className={css({
              display: 'none',
              width: '126px',
              [mq.medium]: {
                display: 'block'
              }
            })}
          />
          <span
            css={{
              fontSize: fontSize.body,
              lineHeight: 0,
              [mq.medium]: {
                paddingRight: '71px',
                fontSize: fontSize.labelLarge
              }
            }}
          >
            {headerLabel}
          </span>
          <button
            aria-label={closeAriaLabel}
            onClick={closeDialog}
            onKeyDown={onKeyDown}
            ref={setFocusElementRef}
            type="button"
            css={{
              height: '48px',
              width: '48px',
              padding: 0,
              lineHeight: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              [mq.medium]: {
                height: '55px',
                width: '55px'
              }
            }}
          >
            <CrossIcon
              css={{ fill: 'white' }}
              height={ICON_SIZE}
              width={ICON_SIZE}
            />
          </button>
        </div>
      </div>
      <Tabs
        isSelectingStartDate={isSelectingStartDate}
        startPlaceholder={startPlaceholder}
        endPlaceholder={endPlaceholder}
        startSelectedLabel={startSelectedLabel}
        endSelectedLabel={endSelectedLabel}
        startDate={startDate && startDate.toDateString()}
        endDate={endDate && endDate.toDateString()}
        isDateRange={isDateRange}
        Icon={Icon}
      />
      <div
        css={{
          background: colours.disabledGrey
        }}
      >
        <div css={{ ...rowStyles, ...weekdayStyles }}>
          {orderedLabels.map(day => (
            <div
              key={day}
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: '-1px',
                  height: '15px',
                  borderLeft: '1px solid #eeeeee',
                  '&:last-child': {
                    borderLeft: 'none'
                  }
                },
                [mq.xLarge]: {
                  fontSize: fontSize.body
                }
              }}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  setFocusElementRef: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  isSelectingStartDate: PropTypes.bool,
  isDateRange: PropTypes.bool,
  firstDayOfWeek: PropTypes.number.isRequired,
  closeAriaLabel: PropTypes.string,
  headerLabel: PropTypes.string,
  startSelectedLabel: PropTypes.string,
  endSelectedLabel: PropTypes.string,
  startPlaceholder: PropTypes.string,
  endPlaceholder: PropTypes.string,
  dayLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowStyles: PropTypes.shape().isRequired,
  Icon: PropTypes.func
};

Header.defaultProps = {
  onKeyDown: noop,
  startDate: null,
  endDate: null,
  isSelectingStartDate: true,
  isDateRange: false,
  startSelectedLabel: '',
  endSelectedLabel: '',
  startPlaceholder: '',
  endPlaceholder: '',
  closeAriaLabel: '',
  headerLabel: '',
  Icon: null
};

export default Header;
