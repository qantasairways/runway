/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { fontFamily, mq, colours, layout } from '../../../theme/airways';

class DisclaimerMessages extends Component {
  getHTMLFormat = () => {
    const { disclaimerMessage } = this.props;
    return { __html: disclaimerMessage };
  };

  render() {
    const { style, disclaimerMessage, onKeyDown } = this.props;

    return (
      <div
        role="alert"
        style={style}
        tabIndex={disclaimerMessage ? 0 : -1}
        onKeyDown={onKeyDown}
        css={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'left',
          fontFamily: fontFamily.main,
          color: colours.darkerGrey,
          background: colours.disabledGrey,
          fontSize: '12px',
          lineHeight: '1.25',
          letterSpacing: '0.17px',
          padding: `15px ${layout.gutter} 0`,
          pointerEvents: 'initial',
          [mq.medium]: {
            fontSize: '14px',
            lineHeight: '1.43',
            letterSpacing: 'normal',
            padding: `0 ${layout.gutter}`,
            textAlign: 'center',
            alignItems: 'center'
          }
        }}
      >
        <div
          css={{
            maxWidth: '750px',
            width: '100%',
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
  style: PropTypes.shape(),
  onKeyDown: PropTypes.func
};

DisclaimerMessages.defaultProps = {
  disclaimerMessage: '',
  style: {},
  onKeyDown: null
};

export default DisclaimerMessages;
