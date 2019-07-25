import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { fontFamily, mq } from '../../theme/airways';

const styleDisclaimerMessage = disclaimerHeight => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'left',
  fontFamily: fontFamily.main,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontStretch: 'normal',
  color: '#323232',
  background: '#fafafa',
  height: `${disclaimerHeight}px`,
  fontSize: '12px',
  lineHeight: '1.25',
  letterSpacing: '0.17px',
  padding: '15px 15px',
  [mq.medium]: {
    fontSize: '14px',
    lineHeight: '1.43',
    letterSpacing: 'normal',
    padding: '0px 15px',
    textAlign: 'center'
  }
});

const styleInnerLayer = () => ({
  width: '750px'
});

class DisclaimerMessages extends Component {
  getHTMLFormat = () => {
    const { disclaimerMessage } = this.props;
    return { __html: disclaimerMessage };
  };

  render() {
    const { disclaimerHeight } = this.props;

    return (
      <div role="alert" css={styleDisclaimerMessage(disclaimerHeight)}>
        <div
          css={styleInnerLayer()}
          /* eslint-disable react/no-danger */
          dangerouslySetInnerHTML={this.getHTMLFormat()}
        />
      </div>
    );
  }
}

DisclaimerMessages.propTypes = {
  disclaimerMessage: PropTypes.string,
  disclaimerHeight: 80
};

DisclaimerMessages.defaultProps = {
  disclaimerMessage: '',
  disclaimerHeight: PropTypes.number
};

export default DisclaimerMessages;
