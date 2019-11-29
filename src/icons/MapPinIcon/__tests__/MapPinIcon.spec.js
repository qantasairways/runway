import React from 'react';
import { shallow } from 'enzyme';
import shortid from 'shortid';

import MapPinIcon from '..';

jest.mock('shortid');

describe('MapPinIcon', () => {
  it('should render', () => {
    shortid.generate.mockReturnValue('1a2b3c');
    const component = shallow(
      <MapPinIcon width="36px" height="36px" className="my-favourite-icon" />
    );

    expect(component).toMatchSnapshot();
  });

  it('should set the width', () => {
    const component = shallow(<MapPinIcon width="36px" />);
    const result = component.find('svg').props().width;

    expect(result).toEqual('36px');
  });

  it('should set the height', () => {
    const component = shallow(<MapPinIcon height="36px" />);
    const result = component.find('svg').props().height;

    expect(result).toEqual('36px');
  });

  it('should set the class name', () => {
    const component = shallow(<MapPinIcon className="my-favourite-icon" />);
    const result = component.find('svg').props().className;

    expect(result).toEqual('my-favourite-icon');
  });
});
