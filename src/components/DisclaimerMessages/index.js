import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { fontFamily, mq, colours, layout } from '../../theme/airways';

class DisclaimerMessages extends Component {
  getHTMLFormat = () => {
    const { disclaimerMessage } = this.props;
    return { __html: disclaimerMessage };
  };

  render() {
    const { style } = this.props;

    return (
      <div
        role="alert"
        style={style}
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'left',
          fontFamily: fontFamily.main,
          color: colours.darkerGrey,
          background: colours.disabledGrey,
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
        }}
      >
        <div
          css={{
            width: '750px',
            '& a': {
              color: colours.primary
            },
            '& a:hover': {
              textDecoration: 'underline'
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
  style: PropTypes.shape
};

DisclaimerMessages.defaultProps = {
  disclaimerMessage: '',
  style: {}
};

export default DisclaimerMessages;
