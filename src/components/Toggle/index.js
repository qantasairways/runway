import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import { colours, fontSize } from '../../theme/airways';

const SELECTORS = {
  REACT_SWITCH: {
    ELEMENT_CONTAINER: '.react-switch',
    BACKGROUND: '.react-switch-bg'
  }
};

const LocalStylesInjector = ({
  height,
  children,
  checked,
  containerClassName
}) => {
  const thickenBorder = () => {
    const existingTransitions = `background 150ms ease 0s`;
    const offBoxShadow = `inset ${colours.darkGrey} 0px 0px 1px 3px`;
    return {
      [SELECTORS.REACT_SWITCH.BACKGROUND]: {
        transition: `${existingTransitions}, box-shadow 150ms ease 0s !important`,
        boxShadow: checked ? 'none' : offBoxShadow
      }
    };
  };

  const keepAllVertAligned = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  };

  return (
    <div
      className={containerClassName}
      css={{
        [SELECTORS.REACT_SWITCH.ELEMENT_CONTAINER]: {
          marginLeft: '8px',
          backgroundColor: colours.darkerGrey,
          height: `${height}px !important`
        },
        backgroundColor: colours.darkerGrey,
        ...thickenBorder(),
        ...keepAllVertAligned
      }}
    >
      {children}
    </div>
  );
};

LocalStylesInjector.propTypes = {
  height: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool.isRequired,
  containerClassName: PropTypes.string.isRequired
};

const LabelText = ({ children }) => (
  <span
    css={{
      textTransform: 'uppercase',
      color: colours.white,
      fontSize: fontSize.label
    }}
  >
    {children}
  </span>
);

LabelText.propTypes = {
  children: PropTypes.node.isRequired
};

class Toggle extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    containerClassName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired
  };

  static defaultProps = {
    containerClassName: 'react-toggle-container'
  };

  static isControlled = props => typeof props.checked === 'boolean';

  state = {
    checked: false
  };

  handleChange = () => {
    if (Toggle.isControlled(this.props)) {
      this.props.onChange();
    } else {
      const update = !this.state.checked; // eslint-disable-line
      this.setState({ checked: update }, () => this.props.onChange(update));
    }
  };

  getCheckedState = () =>
    Toggle.isControlled(this.props) ? this.props.checked : this.state.checked;

  render = () => {
    const {
      id,
      label,
      containerClassName = 'react-toggle-container'
    } = this.props;
    return (
      <LocalStylesInjector
        containerClassName={containerClassName}
        height={31}
        checked={this.getCheckedState()}
      >
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor={id}>
          <LabelText>{label}</LabelText>
        </label>
        <Switch
          checked={this.getCheckedState()}
          onChange={this.handleChange}
          handleDiameter={24.8}
          offColor={colours.darkerGrey}
          onColor={colours.highlights}
          offHandleColor={colours.white}
          onHandleColor={colours.white}
          boxShadow="0px 0px 1px 0px rgba(0, 0, 0, 0.3)"
          uncheckedIcon={false}
          checkedIcon={false}
          height={31}
          width={49}
          className="react-switch"
          id={id}
        />
      </LocalStylesInjector>
    );
  };
}

export default Toggle;
