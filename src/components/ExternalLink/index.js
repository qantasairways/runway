import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import RightArrowIcon from '../../icons/RightArrowIcon';
import { toCx } from '../../utils/css';
import MediaQueryDetector from '../MediaQueryDetector';

import {
  layout,
  colours,
  fontSize,
  fontFamily,
  fontWeight,
  mq
} from '../../theme/airways';

const align = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
};

export const SELECTORS = {
  ICON: {
    SMALL: '.runway-external-link__icon--size_small',
    LARGE: '.runway-external-link__icon--size_large'
  }
};

const iconStyles = {
  [SELECTORS.ICON.SMALL]: {
    fill: colours.darkerGrey,
    height: '100%',
    width: '100%'
  },
  [SELECTORS.ICON.LARGE]: {
    fill: colours.white,
    height: '100%',
    width: '100%'
  }
};

const ItemContainer = ({ children }) => (
  <div
    css={css({
      label: 'runway-external-link__item-container',
      height: '72px',
      padding: `20px ${layout.gutter}`,
      backgroundColor: colours.white,
      [mq.medium]: {
        height: '100%',
        padding: '0px',
        backgroundColor: colours.darkerGrey
      },
      ...align,
      ...iconStyles
    })}
  >
    {children}
  </div>
);
ItemContainer.propTypes = {
  children: PropTypes.node
};
ItemContainer.defaultProps = {
  children: undefined
};

const Item = ({ children, size, onlyMobile, ...rest }) => (
  <span
    css={{
      ...(size && { flex: size }),
      display: 'inline',
      [mq.medium]: {
        display: onlyMobile ? 'none' : 'inline'
      },
      ...rest
    }}
  >
    {children}
  </span>
);
Item.propTypes = {
  children: PropTypes.node,
  size: PropTypes.number,
  onlyMobile: PropTypes.bool
};
Item.defaultProps = {
  children: undefined,
  onlyMobile: false,
  size: null
};

const Spacer = ({ onlyMobile }) => (
  <Item width={layout.links.gutter} onlyMobile={onlyMobile} />
);
Spacer.propTypes = {
  onlyMobile: PropTypes.bool
};

Spacer.defaultProps = {
  onlyMobile: false
};

const Text = ({ children }) => (
  <span
    css={{
      textTransform: 'none',
      fontFamily: fontFamily.main,
      fontWeight: fontWeight.regular,
      fontSize: fontSize.body,
      color: colours.darkerGrey,
      [mq.medium]: {
        color: colours.white
      }
    }}
  >
    {children}
  </span>
);
Text.propTypes = {
  children: PropTypes.node.isRequired
};

const ExternalLink = ({ renderIcon, url, text }) => (
  <a
    css={{
      textDecoration: 'none'
    }}
    href={url}
  >
    <ItemContainer>
      <Item height={layout.iconSize} width={layout.iconSize}>
        <MediaQueryDetector query={mq.medium}>
          {atLeastTablet =>
            renderIcon(
              atLeastTablet
                ? toCx(SELECTORS.ICON.LARGE)
                : toCx(SELECTORS.ICON.SMALL)
            )
          }
        </MediaQueryDetector>
      </Item>
      <Spacer />
      <Item size="1 1 auto">
        <Text>{text}</Text>
      </Item>
      <Spacer onlyMobile />
      <Item onlyMobile height={layout.iconSize} width={layout.iconSize}>
        <RightArrowIcon color={colours.darkerGrey} height="100%" width="100%" />
      </Item>
    </ItemContainer>
  </a>
);

ExternalLink.propTypes = {
  /**
   * Render prop for the link's icon. Must return an icon.
   *
   * @param {String} className This string must be set as the className of the returned icon */
  renderIcon: PropTypes.func.isRequired,
  /** URL for the link */
  url: PropTypes.string.isRequired,
  /** Label text for the link */
  text: PropTypes.string.isRequired
};

export default ExternalLink;
