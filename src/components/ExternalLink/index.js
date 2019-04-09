import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';

import {
  breakpoints,
  layout,
  colours,
  fontSize,
  fontFamily,
  fontWeight
} from '../../theme/airways';

const SVGArrowRight = ({ color, ...rest }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...rest}>
    <defs>
      <path
        id="arrow-right_svg__a"
        d="M10.138 11.269l5.088-4.766.005-.004.769-.721L10.138.287a1.144 1.144 0 0 0-1.53.012.976.976 0 0 0-.013 1.433l3.23 3.024H1.09C.488 4.756 0 5.214 0 5.778 0 6.342.488 6.8 1.09 6.8h10.733L8.595 9.824a.976.976 0 0 0 .014 1.432c.42.394 1.1.4 1.529.013z"
      />
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(4 6)">
      <mask id="arrow-right_svg__b" fill="#fff">
        <use xlinkHref="#arrow-right_svg__a" />
      </mask>
      <use fill="#202020" xlinkHref="#arrow-right_svg__a" />
      <g fill={color} mask="url(#arrow-right_svg__b)">
        <path d="M-4-6h24v24H-4z" />
      </g>
    </g>
  </svg>
);
SVGArrowRight.propTypes = {
  color: PropTypes.string.isRequired
};

const align = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
};

const ItemContainerMobile = ({ children }) => (
  <div
    css={{
      height: '72px',
      padding: `20px ${layout.gutter}`,
      backgroundColor: colours.lightGrey,
      ...align
    }}
  >
    {children}
  </div>
);
ItemContainerMobile.propTypes = {
  children: PropTypes.node.isRequired
};

const ItemContainerDesktop = ({ children }) => (
  <div
    css={{
      backgroundColor: colours.darkerGrey,
      ...align
    }}
  >
    {children}
  </div>
);
ItemContainerDesktop.propTypes = {
  children: PropTypes.node.isRequired
};

const Item = ({ children, size, ...rest }) => (
  <span css={{ ...(size && { flex: size }), ...rest }}>{children}</span>
);
Item.propTypes = {
  children: PropTypes.node,
  size: PropTypes.number
};

const Spacer = () => <Item width="0.625rem" />;

const Text = ({ children, color }) => {
  return (
    <span
      css={{
        textTransform: 'uppercase',
        fontFamily: fontFamily.body,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.body,
        color
      }}
    >
      {children}
    </span>
  );
};
Text.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired
};

const ExternalLink = ({ icon, url, text }) => {
  return (
    <a css={{ textDecoration: 'none' }} href={url}>
      <Media query={`(max-width: ${breakpoints.mobile})`}>
        {isMobile => {
          if (isMobile) {
            return (
              <ItemContainerMobile>
                <Item height={layout.iconSize} width={layout.iconSize}>
                  {icon}
                </Item>
                <Spacer />
                <Item size={1}>
                  <Text color={colours.darkerGrey}>{text}</Text>
                </Item>
                <Spacer />
                <Item height={layout.iconSize} width={layout.iconSize}>
                  <SVGArrowRight
                    color={colours.darkerGrey}
                    height="100%"
                    width="100%"
                  />
                </Item>
              </ItemContainerMobile>
            );
          }
          return (
            <ItemContainerDesktop>
              <Item height={layout.iconSize} width={layout.iconSize}>
                {icon}
              </Item>
              <Spacer />
              <Item>
                <Text color={colours.white}>{text}</Text>
              </Item>
            </ItemContainerDesktop>
          );
        }}
      </Media>
    </a>
  );
};

ExternalLink.propTypes = {
  icon: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default ExternalLink;
