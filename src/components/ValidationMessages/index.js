import React from 'react';
import { PropTypes } from 'prop-types';

import { fontSize, fontFamily, colours } from '../../theme/airways';

const MESSAGE_TYPE = {
  INFO: 'info',
  WARNING: 'warning'
};

const warningMessage = ({ messageType }) => ({
  width: '100%',
  minHeight: '48px',
  border: 'solid 0.5px rgba(151, 151, 151, 0)',
  position: 'relative',
  fontFamily: fontFamily.main,
  fontSize: fontSize.label,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontStretch: 'normal',
  letterSpacing: 'normal',
  color: colours.darkerGrey,
  padding: '11px 13px 11px 15px',
  ...(messageType === MESSAGE_TYPE.WARNING
    ? { backgroundColor: '#fcebcd' }
    : { backgroundColor: '#bff4f2' })
});

const warningArrow = () => ({
  width: 0,
  height: 0,
  borderLeft: '7px solid transparent',
  borderRight: '7px solid transparent',
  borderBottom: '7px solid #fcebcd',
  marginLeft: '15px'
});

function ValidationMessages({ validationMessage, messageType }) {
  return (
    <div role="alert">
      {messageType === MESSAGE_TYPE.WARNING && <div css={warningArrow} />}
      <div css={warningMessage({ messageType })}>{validationMessage}</div>
    </div>
  );
}

ValidationMessages.propTypes = {
  validationMessage: PropTypes.string,
  messageType: PropTypes.string
};

ValidationMessages.defaultProps = {
  validationMessage: '',
  messageType: MESSAGE_TYPE.WARNING
};

export default ValidationMessages;
