import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CSS_SELECTOR_FOCUS, CSS_PSEUDO_AFTER } from '../../constants/css';
import { colours } from '../../theme/airways';

const isControlled = checkedProp => checkedProp !== undefined;

class Toggle extends Component {
  state = {
    checked: isControlled(this.props.checked)
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
    const { label, id, onBlur } = this.props;
    const { checked } = this.state;

    return (
      <div
        css={{
          paddingBottom: '35px',
          position: 'relative'
        }}
      >
        <label htmlFor={id}>
          {label}
          <input
            checked={checked}
            id={id}
            onChange={this.handleToggle}
            onBlur={onBlur}
            type="checkbox"
            ref={el => {
              this.checkbox = el;
            }}
            css={{
              border: 0,
              clip: 'rect(0 0 0 0)',
              height: '1px',
              margin: '-1px',
              overflow: 'hidden',
              padding: 0,
              position: 'absolute',
              width: '1px',
              [CSS_SELECTOR_FOCUS]: {
                '+ span': {
                  boxShadow: `0px 0px 1px 2px ${colours.lightGrey}`,
                  outline: 'none'
                }
              }
            }}
          />
          <span
            css={{
              alignItems: 'center',
              backgroundColor: checked ? colours.highlights : colours.lightGrey,
              borderRadius: '15px',
              bottom: 0,
              cursor: 'pointer',
              display: 'flex',
              height: '30px',
              maxWidth: '62px',
              position: 'absolute',
              transition: 'background-color 150ms linear',
              width: '100%',
              [CSS_PSEUDO_AFTER]: {
                content: '" "',
                background: 'white',
                borderRadius: '50%',
                height: '24px',
                left: checked ? 'calc(100% - 27px)' : '3px',
                position: 'absolute',
                top: '3px',
                transition: 'left 150ms ease-out',
                width: '24px'
              }
            }}
          />
        </label>
      </div>
    );
  }
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

Toggle.defaultProps = {
  checked: undefined,
  defaultChecked: false,
  onChange: () => {},
  onBlur: () => {}
};

export default Toggle;
