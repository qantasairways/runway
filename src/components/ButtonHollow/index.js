import React from 'react';
import ButtonBase, {
  buttonPropTypes,
  buttonDefaultProps
} from '../../baseComponents/Button';
import { CSS_SELECTOR_ACTIVE, CSS_SELECTOR_HOVER } from '../../constants/css';

const themeStyles = {
  button: theme => ({
    backgroundColor: theme.colours.transparent,
    boxShadow: `0 0 0 2px ${theme.colours.primary} inset`,
    color: theme.colours.primary,
    fontWeight: 'normal',
    [CSS_SELECTOR_HOVER]: {
      boxShadow: `0 0 0 2px ${theme.colours.primaryDark} inset`,
      color: theme.colours.primaryDark
    },
    [CSS_SELECTOR_ACTIVE]: {
      boxShadow: `0 0 0 2px ${theme.colours.primaryDark} inset`,
      color: theme.colours.primaryDark
    }
  })
};

const ButtonHollow = props => (
  <ButtonBase {...props} themeStyles={themeStyles} />
);

ButtonHollow.propTypes = {
  ...buttonPropTypes
};

ButtonHollow.defaultProps = {
  ...buttonDefaultProps
};

export default ButtonHollow;
