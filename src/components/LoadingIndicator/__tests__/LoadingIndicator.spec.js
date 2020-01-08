import React from 'react';
import LoadingIndicator from '..';
import { mount } from 'enzyme';

describe('LoadingIndicator', () => {
  it('should render correctly with props', () => {
    const component = mount(<LoadingIndicator screenReaderText="loading" />);

    expect(component).toMatchSnapshot();
  });
});
