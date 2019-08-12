import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { fontFamily, mq, colours, layout } from '../../theme/airways';
import ClassicRewards from '../../icons/ClassicRewards';

class DisclaimerMessages extends Component {
  getHTMLFormat = () => {
    const { disclaimerMessage } = this.props;
    return { __html: disclaimerMessage };
  };

  render() {
    const { style, classicDisclaimerMessage } = this.props;

    return (
      <div
        role="alert"
        style={style}
        css={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'flex-end',
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
            '& a': {
              color: colours.primary
            },
            '& a:hover': {
              textDecoration: 'underline'
            },
            [mq.medium]: {}
          }}
          /* eslint-disable react/no-danger */
          dangerouslySetInnerHTML={this.getHTMLFormat()}
        />
        {classicDisclaimerMessage && (
          <div
            css={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: '16px',
              [mq.medium]: {
                paddingTop: '20px'
              }
            }}
          >
            <ClassicRewards
              css={{
                fill: colours.primary,
                height: '20px',
                width: '20px',
                marginRight: '10px'
              }}
            />
            <span css={{ paddingTop: '3px' }}>{classicDisclaimerMessage}</span>
          </div>
        )}
      </div>
    );
  }
}

DisclaimerMessages.propTypes = {
  disclaimerMessage: PropTypes.string,
  style: PropTypes.shape,
  classicDisclaimerMessage: PropTypes.string
};

DisclaimerMessages.defaultProps = {
  disclaimerMessage: '',
  style: {},
  classicDisclaimerMessage: ''
};

export default DisclaimerMessages;
