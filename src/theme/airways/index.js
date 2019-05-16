import airwaysColours from './colours.json';
import { breakpoints } from './layout.json';

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

export const mq = {
  small: '@media only screen and (min-width: 321px)',
  medium: `@media only screen and ${breakpoints.medium}`,
  large: `@media only screen and ${breakpoints.large}`,
  extraLarge: `@media only screen and ${breakpoints.extraLarge}`
};

export { fontFamily, fontWeight, fontSize } from './font.json';
export { layout, buttons, links, breakpoints } from './layout.json';
