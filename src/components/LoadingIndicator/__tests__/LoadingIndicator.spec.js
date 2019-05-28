import React from 'react';
import LoadingIndicator from '..';
import { shallow } from 'enzyme';

describe('LoadingIndicator', () => {
  it('should render correctly with props', () => {
    const component = shallow(<LoadingIndicator screenReaderText="loading" />);

    expect(component).toMatchSnapshot();
  });
});
