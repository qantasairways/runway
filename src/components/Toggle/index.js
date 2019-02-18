import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CSS_SELECTOR_FOCUS } from '../../constants/css';
import { KEY_CODE_SPACE } from '../../constants/keyCodes';
import { colours } from '../../theme/airways';

const isControlled = checkedProp => checkedProp !== undefined;

class Toggle extends Component {
  state = {
    checked: !isControlled(this.props.checked)
      ? this.props.checked
      : this.props.defaultChecked
  };

  static getDerivedStateFromProps(props, state) {
    if (isControlled(props.checked) && props.checked !== state.checked) {
      return {
        checked: props.checked
      };
    }

    return null;
  }

  handleClick = () => {
    this.handleToggle();
  };

  handleKeyDown = event => {
    if (event.keyCode === KEY_CODE_SPACE) {
      this.handleToggle();
    }
  };

  handleToggle = () => {
    if (isControlled(this.props.checked)) {
      this.props.onChange();
      return;
    }

    this.setState(
      ({ checked }) => ({
        checked: !checked
      }),
      () => this.props.onChange()
    );
  };

  render() {
    const { label, id, ariaLabel } = this.props;
    const { checked } = this.state;

    return (
      <div css={{ marginTop: '5px', maxWidth: '62px' }}>
        <label htmlFor={id}>{label}</label>
        <div
          aria-checked={checked}
          aria-label={ariaLabel}
          id={id}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          role="switch"
          tabIndex="0"
          css={{
            alignItems: 'center',
            backgroundColor: checked ? colours.highlights : colours.lightGrey,
            borderRadius: '15px',
            cursor: 'pointer',
            display: 'flex',
            height: '30px',
            position: 'relative',
            transition: 'background-color 150ms linear',
            width: '100%',
            [CSS_SELECTOR_FOCUS]: {
              boxShadow: `0px 0px 1px 2px ${colours.lightGrey}`,
              outline: 'none'
            }
          }}
        >
          <div
            css={{
              background: 'white',
              borderRadius: '50%',
              height: '24px',
              left: checked ? 'calc(100% - 27px)' : '3px',
              position: 'absolute',
              top: '3px',
              transition: 'left 150ms ease-out',
              width: '24px'
            }}
          />
        </div>
      </div>
    );
  }
}

Toggle.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

Toggle.defaultProps = {
  checked: undefined,
  defaultChecked: false,
  onChange: () => {}
};

export default Toggle;
