import React from 'react';
import ButtonHollow from '..';
import { shallow } from 'enzyme';

describe('ButtonHollow', () => {
  it('should render correctly with defaults', () => {
    const component = shallow(<ButtonHollow />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const component = shallow(
      <ButtonHollow type="submit" onClick={() => 1}>
        button text
      </ButtonHollow>
    );

    expect(component).toMatchSnapshot();
  });
});
