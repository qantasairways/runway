import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { fontFamily, mq, colours, layout } from '../../theme/airways';

const styleDisclaimerMessage = disclaimerHeight => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'left',
  fontFamily: fontFamily.main,
  color: colours.darkerGrey,
  background: colours.disabledGrey,
  height: `${disclaimerHeight}px`,
  fontSize: '12px',
  lineHeight: '1.25',
  letterSpacing: '0.17px',
  padding: `15px ${layout.gutter}`,
  pointerEvents: 'initial',
  [mq.medium]: {
    fontSize: '14px',
    lineHeight: '1.43',
    letterSpacing: 'normal',
    padding: `0px ${layout.gutter}`,
    textAlign: 'center'
  }
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
          css={{
            width: '750px',
            '& a': {
              color: colours.darkerGrey,
              textDecoration: 'underline',
              textDecorationColor: colours.darkerGrey
            }
          }}
          /* eslint-disable react/no-danger */
          dangerouslySetInnerHTML={this.getHTMLFormat()}
        />
      </div>
    );
  }
}

DisclaimerMessages.propTypes = {
  disclaimerMessage: PropTypes.string,
  disclaimerHeight: 90
};

DisclaimerMessages.defaultProps = {
  disclaimerMessage: '',
  disclaimerHeight: PropTypes.number
};

export default DisclaimerMessages;
