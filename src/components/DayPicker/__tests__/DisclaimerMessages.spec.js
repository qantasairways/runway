import React from 'react';
import { mount } from 'enzyme';
import DisclaimerMessages from '../components/DisclaimerMessages';

describe('DisclaimerMessages', () => {
  it('Disclaimer Message renders correctly', () => {
    const component = mount(
      <DisclaimerMessages
        disclaimerHeight={80}
        disclaimerMessage="Please read and agree to the terms and conditions."
      />
    );

    expect(component).toMatchSnapshot();
  });
});
