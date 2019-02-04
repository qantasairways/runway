const colours = {
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

const fontFamily = {
  main: '"Ciutadella", sans-serif',
  mainMedium: '"Ciutadella-Medium", sans-serif'
};

const layout = {
  borderRadius: '4px'
};

export default {
  colours: {
    primary: colours.qantasRed,
    primaryDark: colours.darkRed,
    white: colours.white,
    transparent: 'transparent',
    text: colours.charcoal,
    darkGrey: colours.dimGray,
    lightGrey: colours.grey,
    highlights: colours.bayBlue,
    warnings: colours.warningOrange
  },

  fontFamily: {
    body: fontFamily.main,
    h1: fontFamily.main,
    h2: fontFamily.mainMedium,
    h3: fontFamily.mainMedium
  },

  fontSize: {
    body: '1.125em',
    button: '1em'
  },

  buttons: {
    borderRadius: layout.borderRadius,
    clickOffset: '1px',
    width: '100%',
    height: '50px'
  }
};
