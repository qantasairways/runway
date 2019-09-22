import React from 'react';
import { ThemedButton as Button } from '..';
import { shallow } from 'enzyme';
import theme from '../../../theme/airways';

describe('Button', () => {
  it('should render correctly with defaults', () => {
    const component = shallow(<Button theme={theme} />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const component = shallow(
      <Button theme={theme} type="submit" onClick={() => 1}>
        button text
      </Button>
    );

    expect(component).toMatchSnapshot();
  });
});
