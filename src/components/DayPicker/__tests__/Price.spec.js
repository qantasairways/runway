import React from 'react';
import { shallow } from 'enzyme';
import Price from '../components/Price';

describe('Price', () => {
  let component;

  const props = {
    isLoadingPrice: false,
    value: 12345,
    taxValue: 345,
    currencySymbol: '$',
    isLowestPrice: false,
    isLowestPoints: false,
    isDesktopDevice: false
  };

  it('renders correctly with defaults', () => {
    component = shallow(<Price />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    component = shallow(<Price {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when isLoadingPrice is true', () => {
    component = shallow(<Price {...props} isLoadingPrice />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when isLowestPrice is true', () => {
    component = shallow(<Price {...props} isLowestPrice />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when isDesktopDevice is true', () => {
    component = shallow(<Price {...props} isDesktopDevice />);

    expect(component).toMatchSnapshot();
  });
});
