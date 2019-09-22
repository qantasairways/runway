import React from 'react';
import ButtonSolid from '..';
import { shallow } from 'enzyme';

describe('ButtonSolid', () => {
  it('should render correctly with defaults', () => {
    const component = shallow(<ButtonSolid />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const component = shallow(
      <ButtonSolid type="submit" onClick={() => 1}>
        button text
      </ButtonSolid>
    );

    expect(component).toMatchSnapshot();
  });
});
