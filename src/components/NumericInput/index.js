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
    fontFamily: 'Ciutadella',
    '&::-ms-clear': {
      display: 'none'
    }
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
    value: this.props.value,
    ariaValueUpdate: false
  };

  getAriaDescriptionId = () => `${this.props.id}-description`;

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
    this.setState({ value, ariaValueUpdate: true });
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
      ariaDescription,
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
        </label>
        <div css={getRcInputNumberStyles({ highlightInvalid })}>
          <InputNumber
            {...rest}
            type="number"
            id={id}
            onChange={this.overloadedOnChange}
            upHandler={up}
            downHandler={down}
            ref={this.setInputRef}
            aria-describedby={this.getAriaDescriptionId()}
          />
          {this.renderAriaHiddenText()}
        </div>
      </Fragment>
    );
  };

  renderAriaHiddenText = () => {
    const { ariaDescription } = this.props;
    const { value, ariaValueUpdate } = this.state;
    return (
      <div css={axValidationContainerStyles}>
        <span aria-live="polite" aria-atomic="true">
          {ariaValueUpdate ? `Current value is ${value}.` : ''}
        </span>
        <span
          aria-live="off"
          aria-atomic="true"
          id={this.getAriaDescriptionId()}
        >
          {`Current value is ${value}.`}
          {ariaDescription ? ` ${ariaDescription}` : ''}
        </span>
      </div>
    );
  };
}

NumericInput.propTypes = {
  ...InputNumber.propTypes,
  /** Flag to display styles to show the current value is invalid */
  highlightInvalid: PropTypes.bool,
  /** Function to set the ref on the input
   *
   * @param {Node} inputRef The input element */
  setRef: PropTypes.func,
  /** String for the html label */
  label: PropTypes.string,
  /** String for the input description */
  ariaDescription: PropTypes.string,
  /** Optional id string for the input */
  id: PropTypes.string.isRequired,
  /** Triggered when the user changes the value
   *
   * @param {Number} value New value */
  onChange: PropTypes.func,
  /** Prop to set the value of this controlled component */
  value: PropTypes.number
};

NumericInput.defaultProps = {
  highlightInvalid: false,
  setRef: null,
  label: '',
  ariaDescription: '',
  onChange: () => {},
  value: null
};

export default NumericInput;
