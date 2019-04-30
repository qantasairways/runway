import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import { colours, fontSize, layout } from '../../../theme/airways';

import PlaneIcon from '../../../icons/PlaneIcon';

const selectedStyles = {
  label: 'runway-calendar__day--highlighted',
  backgroundColor: colours.hightlightsLighter
};

const startEndStyles = {
  label: 'runway-calendar__day--selected',
  paddingTop: '36px',
  zIndex: 1,
  border: `2px solid ${colours.hightlightsLight}`,
  boxShadow: `0 0 0 1px ${colours.hightlightsLight}`
};

const disabledStyles = {
  label: 'runway-calendar__day--disabled',
  cursor: 'initial',
  color: colours.grey,
  background: 'none'
};

function dayStyles({ selected, disabled, outside, start, end }) {
  return css(
    {
      label: 'runway-calendar__day',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
      paddingTop: '38px',
      boxSizing: 'border-box',
      height: '94px',
      color: colours.darkerGrey,
      background: colours.white,
      boxShadow: '0 0 0 1px #eaeaea'
    },
    selected && !start && !end && selectedStyles,
    (start || end) && startEndStyles,
    (disabled || outside) && disabledStyles
  );
}

function dateStyles({ today }) {
  return css({
    label: 'runway-calendar__date',
    height: fontSize.body,
    padding: '0 4px',
    fontSize: fontSize.body,
    lineHeight: 1.1,
    borderRadius: layout.borderRadius,
    backgroundColor: today ? colours.hightlightsLight : 'initial'
  });
}

function selectionLabelStyles({ isStartDate }) {
  return css({
    display: 'flex',
    flexDirection: isStartDate ? 'row' : 'row-reverse',
    alignItems: 'center',
    position: 'absolute',
    left: isStartDate ? '-1px' : 'initial',
    right: isStartDate ? 'initial' : '-1px',
    top: '-3px',
    height: '14px',
    boxSizing: 'border-box',
    padding: isStartDate ? '3px 0 0 3px' : '3px 3px 0 0',
    fontSize: fontSize.small,
    fontWeight: 600,
    lineHeight: 1,
    background: colours.hightlightsLight,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: isStartDate ? '-5px' : 'initial',
      left: isStartDate ? 'initial' : '-5px',
      border: 'solid transparent',
      borderRight: isStartDate
        ? 'solid transparent'
        : `solid ${colours.hightlightsLight}`,
      borderLeft: isStartDate
        ? `solid ${colours.hightlightsLight}`
        : 'solid transparent',
      borderWidth: isStartDate ? '7px 0 7px 5px' : '7px 5px 7px 0'
    }
  });
}

export function SelectionLabel({ isStartDate, label, Icon }) {
  return label ? (
    <div css={selectionLabelStyles({ isStartDate })}>
      <span>{label}</span>
      {Icon && (
        <Icon
          className={css({
            marginBottom: '2px',
            fill: colours.darkerGrey,
            transform: isStartDate ? 'none' : 'scaleX(-1)'
          })}
          height="10"
          width="10"
        />
      )}
    </div>
  ) : null;
}

SelectionLabel.propTypes = {
  isStartDate: PropTypes.bool,
  label: PropTypes.string,
  Icon: PropTypes.func
};

SelectionLabel.defaultProps = {
  isStartDate: true,
  label: '',
  Icon: null
};

class Day extends Component {
  setFocusElementRef(el, modifiers) {
    const { setFocusElementRef } = this.props;

    if (el && el.parentElement && modifiers.focusElement) {
      setFocusElementRef(el.parentElement);
    }
  }

  render() {
    const {
      day,
      modifiers,
      startLabel,
      endLabel,
      startAriaLabel,
      endAriaLabel,
      Icon
    } = this.props;
    const date = day.getDate();
    const dayStartAriaLabel = modifiers.start ? startAriaLabel : '';
    const dayEndAriaLabel = modifiers.end ? endAriaLabel : '';

    return (
      <div
        css={dayStyles(modifiers)}
        ref={el => this.setFocusElementRef(el, modifiers)}
        aria-label={`${dayStartAriaLabel}, ${dayEndAriaLabel}`}
      >
        <div css={dateStyles(modifiers)}>{date}</div>
        {modifiers.start && (
          <SelectionLabel isStartDate label={startLabel} Icon={Icon} />
        )}
        {modifiers.end && (
          <SelectionLabel isStartDate={false} label={endLabel} Icon={Icon} />
        )}
      </div>
    );
  }
}

Day.propTypes = {
  setFocusElementRef: PropTypes.func.isRequired,
  day: PropTypes.instanceOf(Date).isRequired,
  modifiers: PropTypes.shape({
    start: PropTypes.bool,
    end: PropTypes.bool,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    outside: PropTypes.bool
  }).isRequired,
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  startAriaLabel: PropTypes.string,
  endAriaLabel: PropTypes.string,
  Icon: PropTypes.func
};

Day.defaultProps = {
  startLabel: '',
  endLabel: '',
  startAriaLabel: '',
  endAriaLabel: '',
  Icon: PlaneIcon
};

export default Day;
