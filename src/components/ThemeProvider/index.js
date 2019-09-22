import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';

export { withTheme } from 'emotion-theming';

const RunwayThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

RunwayThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape().isRequired
};

export default RunwayThemeProvider;
