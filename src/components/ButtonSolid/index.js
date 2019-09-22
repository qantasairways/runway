import React from 'react';
import ButtonBase, {
  buttonPropTypes,
  buttonDefaultProps
} from '../../baseComponents/Button';
import { CSS_SELECTOR_ACTIVE, CSS_SELECTOR_HOVER } from '../../constants/css';

const themeStyles = {
  button: theme => ({
    backgroundColor: theme.colours.primary,
    color: theme.colours.white,
    [CSS_SELECTOR_HOVER]: {
      backgroundColor: theme.colours.primaryDark
    },
    [CSS_SELECTOR_ACTIVE]: {
      backgroundColor: theme.colours.primaryDark
    }
  })
};

const ButtonSolid = props => (
  <ButtonBase {...props} themeStyles={themeStyles} />
);

ButtonSolid.propTypes = {
  ...buttonPropTypes
};

ButtonSolid.defaultProps = {
  ...buttonDefaultProps
};

export default ButtonSolid;
