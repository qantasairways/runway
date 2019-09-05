import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import { colours, fontSize, fontFamily } from '../../theme/airways';

const SELECTORS = {
  REACT_SWITCH: {
    ELEMENT_CONTAINER: '.react-switch',
    BACKGROUND: '.react-switch-bg'
  }
};

const LocalStylesInjector = ({
  children,
  checked,
  containerClassName,
  spaceBetween
}) => {
  const thickenBorder = () => {
    const existingTransitions = `background 150ms ease 0s`;
    const offBoxShadow = `inset ${colours.darkGrey} 0px 0px 0px 2px`;
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
          marginLeft: spaceBetween,
          backgroundColor: colours.darkerGrey
        },
        ...thickenBorder(),
        ...keepAllVertAligned,
        backgroundColor: colours.mediumGrey
      }}
    >
      {children}
    </div>
  );
};

LocalStylesInjector.propTypes = {
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool.isRequired,
  containerClassName: PropTypes.string.isRequired,
  spaceBetween: PropTypes.string.isRequired
};

const LabelText = ({ children }) => (
  <span
    css={{
      textTransform: 'none',
      color: colours.white,
      fontSize: fontSize.body,
      fontFamily: fontFamily.main
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
    /** Id for the html input */
    id: PropTypes.string,
    /** Label to display */
    label: PropTypes.string.isRequired,
    /** @ignore */
    containerClassName: PropTypes.string,
    /** Function triggered when the value is changed
     * @param {bool} value The new value
     */
    onChange: PropTypes.func,
    /** Flag to control whether the toggle is checked */
    checked: PropTypes.bool,
    /** String to specify in css units the space between toggle and label */
    spaceBetween: PropTypes.string,
    /** The size of the toggle handle */
    handleSize: PropTypes.number,
    /** The height of the toggle */
    height: PropTypes.number,
    /** The width of the toggle */
    width: PropTypes.number
  };

  static defaultProps = {
    id: '',
    containerClassName: 'react-toggle-container',
    onChange: () => {},
    checked: false,
    spaceBetween: '10px',
    handleSize: 26,
    height: 30,
    width: 46
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

  renderLabel = () => {
    const { id, label } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/label-has-for
      <label htmlFor={id}>
        <LabelText>{label}</LabelText>
      </label>
    );
  };

  renderSwitch = () => {
    const { id, handleSize, height, width } = this.props;

    return (
      <Switch
        checked={this.getCheckedState()}
        onChange={this.handleChange}
        offColor={colours.darkerGrey}
        onColor={colours.highlights}
        handleDiameter={handleSize}
        offHandleColor={colours.dullGrey}
        onHandleColor={colours.white}
        boxShadow="0px 0px 1px 0px rgba(0, 0, 0, 0.3)"
        uncheckedIcon={false}
        checkedIcon={false}
        height={height}
        width={width}
        className="react-switch"
        id={id}
      />
    );
  };

  render = () => {
    const {
      containerClassName = 'react-toggle-container',
      spaceBetween
    } = this.props;
    return (
      <LocalStylesInjector
        containerClassName={containerClassName}
        checked={this.getCheckedState()}
        spaceBetween={spaceBetween}
      >
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        {this.renderLabel()}
        {this.renderSwitch()}
      </LocalStylesInjector>
    );
  };
}

export default Toggle;
