import { css } from '@emotion/core';
import airwaysColours from './colours.json';

export const airwaysFontFamily = '"Ciutadella", sans-serif';

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
  primary: airwaysColours.qantasRed,
  primaryDark: airwaysColours.darkRed,
  white: airwaysColours.white,
  transparent: 'transparent',
  darkerGrey: airwaysColours.charcoal,
  darkGrey: airwaysColours.darkGrey,
  mediumDarkGrey: airwaysColours.mediumDarkGrey,
  dullGrey: airwaysColours.dullGrey,
  grey: airwaysColours.grey,
  mediumGrey: airwaysColours.mediumGrey,
  mediumLightGrey: airwaysColours.mediumLightGrey,
  lightGrey: airwaysColours.lightGrey,
  lighterGrey: airwaysColours.lighterGrey,
  disabledGrey: airwaysColours.disabledGrey,
  highlights: airwaysColours.bayBlue,
  hightlightsLight: airwaysColours.lightBayBlue,
  hightlightsLighter: airwaysColours.lighterBayBlue,
  warnings: airwaysColours.warningOrange,
  warningOrangeLight: airwaysColours.warningOrangeLight,
  black: airwaysColours.black
};

export const fontFamily = {
  main: airwaysFontFamily
};

export const fontWeight = {
  regular: 400,
  bold: 700
};

export const fontSize = {
  body: '1.125rem',
  button: '1rem',
  label: '1rem',
  labelLarge: '1.375rem',
  large: '1.75rem',
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

export const highlightInvalidField = {
  borderRadius: '2px',
  border: 'solid 2px #ed710b'
};

export const resetFormStyles = {
  appearance: 'none',
  margin: 0,
  padding: 0,
  border: 0,
  background: 'none',
  fontFamily: 'inherit',
  lineHeight: '1',
  textAlign: 'left',
  textIndent: 0,
  textDecoration: 'none',
  textTransform: 'none'
};

export const sharedFormControlStyles = hasError =>
  css(resetFormStyles, {
    fontSize: '18px',
    lineHeight: '1.5',
    width: '100%',
    color: airwaysColours.charcoal,
    border: '2px solid',
    borderColor: hasError ? airwaysColours.warningOrange : airwaysColours.grey,
    borderRadius: 0,
    '&:focus': {
      outline: 0,
      boxShadow: `0 0 0 1px ${airwaysColours.bayBlue} inset`,
      borderColor: airwaysColours.bayBlue
    },
    padding: '10px 15px'
  });

export default {
  layout,
  colours,
  fontFamily,
  fontSize,
  fontWeight,
  buttons,
  highlightInvalidField,
  resetFormStyles,
  sharedFormControlStyles
};
