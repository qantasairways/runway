import React from 'react';
import InputNumber from 'rc-input-number';

function NumericInput(props) {
  return <InputNumber {...props} />;
}

NumericInput.propTypes = {
  ...InputNumber.propTypes
};

export default NumericInput;
