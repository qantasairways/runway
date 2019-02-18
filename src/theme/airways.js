const airwaysColours = {
  qantasRed: '#ee0000',
  darkRed: '#ba0000',
  focusRed: '#870000',
  transparentGrey: 'rgba(0,0,0,0.1',
  charcoal: '#323232',
  white: '#fff',
  warningOrange: '#ed710b',
  bayBlue: '#8de2e0',
  grey: '#dadada',
  dimGray: '#666666'
};

const airwaysFontFamily = {
  main: '"Ciutadella", sans-serif',
  mainMedium: '"Ciutadella-Medium", sans-serif'
};

const layout = {
  borderRadius: '4px'
};

export const colours = {
  primary: airwaysColours.qantasRed,
  primaryDark: airwaysColours.darkRed,
  white: airwaysColours.white,
  transparent: 'transparent',
  text: airwaysColours.charcoal,
  darkGrey: airwaysColours.dimGray,
  lightGrey: airwaysColours.grey,
  highlights: airwaysColours.bayBlue,
  warnings: airwaysColours.warningOrange
};

export const fontFamily = {
  body: airwaysFontFamily.main,
  h1: airwaysFontFamily.main,
  h2: airwaysFontFamily.mainMedium,
  h3: airwaysFontFamily.mainMedium
};

export const fontSize = {
  body: '1.125em',
  button: '1em'
};

export const buttons = {
  borderRadius: layout.borderRadius,
  clickOffset: '1px',
  width: '100%',
  height: '50px'
};

export default {
  colours,
  fontFamily,
  fontSize,
  buttons
};
