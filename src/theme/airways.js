export const airwaysColours = {
  qantasRed: '#ee0000',
  darkRed: '#ba0000',
  focusRed: '#870000',
  transparentGrey: 'rgba(0,0,0,0.1',
  charcoal: '#323232',
  white: '#fff',
  warningOrange: '#ed710b',
  bayBlue: '#8de2e0',
  lightBayBlue: '#bff4f2',
  lighterBayBlue: '#e8f7f7',
  darkGrey: '#626262',
  mediumDarkGrey: '#888888',
  grey: '#dadada',
  lightGrey: '#f4f5f6',
  lighterGrey: '#eeeeee',
  disabledGrey: '#fafafa'
};

export const airwaysFontFamily = {
  main: '"Ciutadella", sans-serif',
  mainMedium: '"Ciutadella-Md", sans-serif'
};

export const layout = {
  borderRadius: '4px',
  gutter: '15px',
  iconSize: '32px',
  containerMaxWidth: '1000px',
  links: {
    gutter: '10px'
  }
};

export const colours = {
  primary: airwaysColours.qantasRed,
  primaryDark: airwaysColours.darkRed,
  white: airwaysColours.white,
  transparent: 'transparent',
  darkerGrey: airwaysColours.charcoal,
  darkGrey: airwaysColours.darkGrey,
  mediumDarkGrey: airwaysColours.mediumDarkGrey,
  grey: airwaysColours.grey,
  lightGrey: airwaysColours.lightGrey,
  lighterGrey: airwaysColours.lighterGrey,
  disabledGrey: airwaysColours.disabledGrey,
  highlights: airwaysColours.bayBlue,
  hightlightsLight: airwaysColours.lightBayBlue,
  hightlightsLighter: airwaysColours.lighterBayBlue,
  warnings: airwaysColours.warningOrange
};

export const fontFamily = {
  body: airwaysFontFamily.main,
  bold: airwaysFontFamily.mainMedium,
  h1: airwaysFontFamily.main,
  h2: airwaysFontFamily.mainMedium,
  h3: airwaysFontFamily.mainMedium
};

export const fontWeight = {
  regular: 300,
  bold: 700
};

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

export const buttons = {
  borderRadius: layout.borderRadius,
  clickOffset: '1px',
  width: '100%',
  height: '3.125rem'
};

export const breakpoints = {
  medium: '(min-width: 768px)',
  large: '(min-width: 960px)',
  extraLarge: '(min-width: 1200px)'
};

export const mq = {
  small: '@media only screen and (min-width: 321px)',
  medium: `@media only screen and ${breakpoints.medium}`,
  large: `@media only screen and ${breakpoints.large}`,
  extraLarge: `@media only screen and ${breakpoints.extraLarge}`
};

export default {
  layout,
  colours,
  fontFamily,
  fontSize,
  fontWeight,
  buttons
};
