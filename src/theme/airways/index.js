// TODO - remove component specific sizes
export const layout = {
  borderRadius: '4px',
  gutter: '15px',
  iconSize: '32px',
  containerMaxWidth: '1000px',
  paddingContainerMaxWidth: '1030px',
  links: {
    gutter: '10px'
  }
};

export const colours = {
  primary: '#ee0000',
  primaryDark: '#ba0000',
  white: '#fff',
  transparent: 'transparent',
  darkerGrey: '#323232',
  darkGrey: '#626262',
  mediumDarkGrey: '#888888',
  dullGrey: '#b3b3b3',
  grey: '#dadada',
  mediumGrey: '#3c3c3c',
  mediumLightGrey: '#666666',
  lightGrey: '#f4f5f6',
  lighterGrey: '#eeeeee',
  disabledGrey: '#fafafa',
  highlights: '#8de2e0',
  hightlightsLight: '#bff4f2',
  hightlightsLighter: '#e8f7f7',
  warnings: '#ed710b',
  black: '#000000'
};

export const fontFamily = {
  main: '"Ciutadella", sans-serif'
};

export const fontWeight = {
  regular: 400,
  bold: 700
};

// TODO - remove component specific sizes
export const fontSize = {
  body: '1.125rem',
  button: '1rem',
  label: '1rem',
  labelLarge: '1.375rem',
  large: '2.25rem',
  medium: '1.625rem',
  small: '0.625rem'
};

export const letterSpacing = {
  small: '-0.0625rem'
};

export const breakpoints = {
  medium: '(min-width: 768px)',
  large: '(min-width: 960px)',
  extraLarge: '(min-width: 1200px)'
};

// TODO - rename this to mediaQueries
export const mq = {
  small: '@media only screen and (min-width: 321px)',
  medium: `@media only screen and ${breakpoints.medium}`,
  large: `@media only screen and ${breakpoints.large}`,
  extraLarge: `@media only screen and ${breakpoints.extraLarge}`
};

// TODO - remove this
export const highlightInvalidField = {
  borderRadius: '2px',
  border: 'solid 2px #ed710b'
};

export default {
  layout,
  colours,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  breakpoints,
  mq,
  highlightInvalidField // this will be removed
};
