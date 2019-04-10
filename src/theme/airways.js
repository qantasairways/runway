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
  lightGrey: '#f4f5f6',
  darkGrey: '#666666'
};

const airwaysFontFamily = {
  main: '"Ciutadella", sans-serif',
  mainMedium: '"Ciutadella-Medium", sans-serif'
};

export const layout = {
  borderRadius: '4px',
  gutter: '16px',
  iconSize: '32px',
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
  lightGrey: airwaysColours.grey,
  lighterGrey: airwaysColours.lightGrey,
  highlights: airwaysColours.bayBlue,
  warnings: airwaysColours.warningOrange
};

export const fontFamily = {
  body: airwaysFontFamily.main,
  h1: airwaysFontFamily.main,
  h2: airwaysFontFamily.mainMedium,
  h3: airwaysFontFamily.mainMedium
};

export const fontWeight = {
  regular: 300,
  bold: 700
};

export const fontSize = {
  body: '1.125em',
  button: '1em',
  label: '1.125rem'
};

export const buttons = {
  borderRadius: layout.borderRadius,
  clickOffset: '1px',
  width: '100%',
  height: '50px'
};

export const mq = {
  tablet: '@media only screen and (min-width: 480px)'
};

export default {
  colours,
  fontFamily,
  fontSize,
  buttons
};
