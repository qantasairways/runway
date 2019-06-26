/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import InputNumber from 'rc-input-number';

import PlusIcon from '../../icons/PlusIcon';
import MinusIcon from '../../icons/MinusIcon';

import { colours, highlightInvalidField } from '../../theme/airways';
import { toCx, forAll } from '../../utils/css';

const SELECTORS = {
  RCI: {
    ROOT: {
      CORE: '.rc-input-number',
      FOCUSED: '.rc-input-number-focused',
      DISABLED: '.rc-input-number-disabled'
    },
    CONTROLS: {
      WRAPPER: 'rc-input-number-handler-wrap',
      UP: {
        CORE: '.rc-input-number-handler-up',
        DISABLED: '.rc-input-number-handler-up-disabled',
        ICON: '.runway-numeric-input__increment_icon'
      },
      DOWN: {
        CORE: '.rc-input-number-handler-down',
        DISABLED: '.rc-input-number-handler-down-disabled',
        ICON: '.runway-numeric-input__decrement_icon'
      },
      UP_AND_DOWN: {
        CORE: '.rc-input-number-handler',
        ACTIVE: '.rc-input-number-handler-active'
      }
    },
    INPUT: {
      WRAPPER: '.rc-input-number-input-wrap',
      CORE: '.rc-input-number-input'
    }
  }
};

const iconWidth = '22px';

const getDisabledCtrlStyles = ({ highlightInvalid }) =>
  highlightInvalid ? { fill: colours.lighterGrey } : { fill: colours.grey };

const disableNativeNumberInputStyles = {
  [forAll(
    'input::-webkit-outer-spin-button',
    'input::-webkit-inner-spin-button'
  )]: {
    '-webkit-appearance': 'none',
    margin: '0px'
  },
  'input[type="number"]': {
    '-moz-appearance': 'textfield'
  }
};

const getRcInputNumberStyles = ({ highlightInvalid }) => ({
  ...disableNativeNumberInputStyles,
  [SELECTORS.RCI.ROOT.CORE]: {
    margin: '0',
    padding: '0',
    lineHeight: '26px',
    fontSize: '12px',
    display: 'inline-block',
    verticalAlign: 'middle',
    border: `2px solid ${colours.grey}`,
    borderRadius: '0px',
    position: 'relative',
    width: '100%',
    height: '55px',
    ...(highlightInvalid && { ...highlightInvalidField, borderRadius: '0px' })
  },
  [SELECTORS.RCI.ROOT.FOCUSED]: {
    borderColor: '#8de2e0',
    ...(highlightInvalid && { ...highlightInvalidField, borderRadius: '0px' })
  },
  [SELECTORS.RCI.CONTROLS.UP_AND_DOWN.CORE]: {
    textAlign: 'center',
    lineHeight: '12px',
    height: '12px',
    overflow: 'hidden',
    display: 'block',
    touchAction: 'none'
  },
  [SELECTORS.RCI.CONTROLS.UP.CORE]: {
    position: 'absolute',
    right: '0px',
    width: `calc(30px + ${iconWidth})`,
    height: '100%'
  },
  [SELECTORS.RCI.CONTROLS.DOWN.CORE]: {
    position: 'absolute',
    left: '0px',
    width: `calc(30px + ${iconWidth})`,
    height: '100%'
  },
  [SELECTORS.RCI.INPUT.CORE]: {
    textAlign: 'center',
    outline: '0',
    '-moz-appearance': 'textfield',
    lineHeight: '26px',
    height: '100%',
    transition: 'all 0.3s ease',
    border: '0',
    padding: '0',
    width: '99%',
    borderRadius: '0px',
    display: 'block',
    fontSize: '22px',
    color: '#323232',
    fontFamily: 'Ciutadella'
  },
  [SELECTORS.RCI.INPUT.WRAPPER]: {
    overflow: 'hidden',
    height: '100%'
  },
  [forAll(
    SELECTORS.RCI.CONTROLS.DOWN.DISABLED,
    SELECTORS.RCI.CONTROLS.UP.DISABLED
  )]: {
    opacity: '0.72'
  },
  [forAll(
    SELECTORS.RCI.CONTROLS.DOWN.DISABLED,
    SELECTORS.RCI.CONTROLS.UP.DISABLED
  )]: {
    [forAll(
      SELECTORS.RCI.CONTROLS.UP.ICON,
      SELECTORS.RCI.CONTROLS.DOWN.ICON
    )]: {
      ...getDisabledCtrlStyles({ highlightInvalid })
    }
  }
});

const labelStyles = {
  height: '28px',
  lineHeight: '1.75',
  letterSpacing: 'normal',
  fontSize: '16px',
  fontFamily: 'Ciutadella',
  color: colours.darkerGrey
};

const axValidationContainerStyles = {
  position: 'absolute !important',
  display: 'block',
  visibility: 'visible',
  overflow: 'hidden',
  width: '1px',
  height: '1px',
  margin: '-1px',
  border: '0',
  padding: '0',
  clip: 'rect(0 0 0 0)'
};
class NumericInput extends Component {
  state = {
    value: this.props.value
  };

  componentDidMount = () => {
    const clickables = document.querySelectorAll(
      SELECTORS.RCI.CONTROLS.UP_AND_DOWN.CORE
    );
    clickables.forEach(el => {
      el.addEventListener('click', this.preventDefault);
    });

    if (typeof this.props.setRef === 'function' && this.inputRef) {
      this.props.setRef(this.inputRef);
    }
  };

  overloadedOnChange = value => {
    this.setState({ value });
    this.props.onChange(value);
  };

  componentWillUnmount = () => {
    const clickables = document.querySelectorAll(
      SELECTORS.RCI.CONTROLS.UP_AND_DOWN.CORE
    );
    clickables.forEach(el => {
      el.removeEventListener('click', this.preventDefault);
    });
  };

  preventDefault = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  setInputRef = el => {
    this.inputRef = el;
  };

  render = () => {
    const {
      label,
      id,
      highlightInvalid,
      onChange,
      isTablet,
      ...rest
    } = this.props;

    const up = (
      <PlusIcon
        className={toCx(SELECTORS.RCI.CONTROLS.UP.ICON)}
        height="100%"
        width="30px"
      />
    );
    const down = (
      <MinusIcon
        className={toCx(SELECTORS.RCI.CONTROLS.DOWN.ICON)}
        height="100%"
        width="30px"
      />
    );
    return (
      <Fragment>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor={id} css={labelStyles}>
          {label}
          <div css={getRcInputNumberStyles({ highlightInvalid })}>
            <InputNumber
              {...rest}
              type="number"
              id={id}
              onChange={this.overloadedOnChange}
              upHandler={up}
              downHandler={down}
              ref={this.setInputRef}
              focusOnUpDown={isTablet ? true : false}
            />
          </div>
        </label>
        <div aria-live="polite" aria-atomic="true">
          <div css={axValidationContainerStyles}>
            Current value is {this.state.value}.
          </div>
        </div>
      </Fragment>
    );
  };
}

NumericInput.propTypes = {
  ...InputNumber.propTypes,
  highlightInvalid: PropTypes.bool,
  setRef: PropTypes.func,
  isTablet: PropTypes.bool
};

NumericInput.defaultProps = {
  highlightInvalid: false,
  setRef: null,
  isTablet: true
};

export default NumericInput;
