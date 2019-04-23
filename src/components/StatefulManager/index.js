// Purpose: Only for making Controlled components testable in styleguide
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StatefulManager extends Component {
  state = {
    value: this.props.initial
  };

  render = () => {
    const { value } = this.state;
    const { children } = this.props;
    return children({
      value,
      updater: updated => this.setState({ value: updated })
    });
  };
}

StatefulManager.propTypes = {
  children: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initial: PropTypes.any.isRequired
};

export default StatefulManager;
