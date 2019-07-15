import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import InfoIcon from '../../icons/InfoIcon';
import { colours } from '../../theme/airways';

const iconSize = '16.8px';

const getContainerStyles = ({ isMultiLine, height, width }) => ({
  height,
  width,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: '10px',
  ...(isMultiLine && {
    position: 'relative'
  })
});

const getIconStyles = ({ isMultiLine }) => ({
  fill: colours.darkerGrey,
  marginRight: isMultiLine ? '0px' : '11px'
});

const getIconContainerStyles = ({ isMultiLine, lines }) => ({
  display: 'flex',
  ...(isMultiLine && {
    position: 'absolute',
    top: lines > 2 ? '2px' : '1px',
    left: '0'
  })
});

const getContentStyles = ({ isMultiLine }) => ({
  color: colours.darkerGrey,
  lineHeight: '1.21',
  fontSize: '14px',
  fontFamily: 'Ciutadella',
  ...(isMultiLine && { marginLeft: '27.8px' })
});

class InfoSection extends React.Component {
  state = { lines: 1 };

  setContentRef = el => {
    this.contentNode = el;
  };

  componentDidMount = () => {
    this.updateLineCount();
    this.debouncedUpdateLineCount = debounce(() => {
      this.updateLineCount();
    }, 200);
    window.addEventListener('resize', this.debouncedUpdateLineCount);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.debouncedUpdateLineCount);
  };

  isMultiLine = () => this.state.lines > 1;

  updateLineCount = () => {
    const el = this.contentNode;
    if (el) {
      const elHeight = el.offsetHeight;
      const contentStyles = getContentStyles({
        isMultiLine: this.isMultiLine()
      });
      const lineHeight =
        Number(contentStyles.lineHeight) *
        Number(contentStyles.fontSize.replace('px', ''));
      const lines = elHeight / lineHeight + 1;
      this.setState({ lines: parseInt(lines, 10) });
    }
  };

  render = () => {
    const { content, height, width } = this.props;
    const isMultiLine = this.isMultiLine();
    return (
      <div css={getContainerStyles({ height, width, isMultiLine })}>
        <span
          css={getIconContainerStyles({ isMultiLine, lines: this.state.lines })}
        >
          <InfoIcon
            css={getIconStyles({ isMultiLine })}
            height={iconSize}
            width={iconSize}
          />
        </span>
        <span
          // eslint-disable-next-line no-return-assign
          ref={this.setContentRef}
          className="runway-info-section__text-content"
          css={getContentStyles({ isMultiLine })}
        >
          {content}
        </span>
      </div>
    );
  };
}

InfoSection.propTypes = {
  /** Content element for the InfoSection */
  content: PropTypes.node.isRequired,
  /** Optional height override */
  height: PropTypes.string,
  /** Optional width override */
  width: PropTypes.string
};

InfoSection.defaultProps = {
  height: 'auto',
  width: '100%;'
};

export default InfoSection;
