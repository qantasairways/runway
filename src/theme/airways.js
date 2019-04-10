export const airwaysColours = {
  qantasRed: '#ee0000',
  darkRed: '#ba0000',
  focusRed: '#870000',
  transparentGrey: 'rgba(0,0,0,0.1',
  charcoal: '#323232',
  white: '#fff',
  warningOrange: '#ed710b',
  bayBlue: '#8de2e0',
  grey: '#dadada',
  darkGrey: '#626262'
};

export const airwaysFontFamily = {
  main: '"Ciutadella", sans-serif',
  mainMedium: '"Ciutadella-Medium", sans-serif'
};

export const layout = {
  borderRadius: '4px',
  gutter: '16px',
  iconSize: '32px'
};

export const colours = {
  primary: airwaysColours.qantasRed,
  primaryDark: airwaysColours.darkRed,
  white: airwaysColours.white,
  transparent: 'transparent',
  darkerGrey: airwaysColours.charcoal,
  darkGrey: airwaysColours.darkGrey,
  lightGrey: airwaysColours.grey,
  highlights: airwaysColours.bayBlue,
  warnings: airwaysColours.warningOrange
};

export const fontFamily = {
  body: airwaysFontFamily.main,
  bold: airwaysFontFamily.mainMedium,
  h1: airwaysFontFamily.main,
  h2: airwaysFontFamily.mainMedium,
  h3: airwaysFontFamily.mainMedium
};

export const fontSize = {
  body: '1.125rem',
  button: '1rem',
  label: '1rem',
  large: '2.25rem'
};

export const fontWeight = {
  regular: 300
};

export const letterSpacing = {
  small: '-0.0625rem'
};

export const buttons = {
  borderRadius: layout.borderRadius,
  clickOffset: '1px',
  width: '100%',
  height: '3.125rem',
  heightLarge: '6rem'
};

export default {
  layout,
  colours,
  fontFamily,
  fontSize,
  fontWeight,
  buttons
};
