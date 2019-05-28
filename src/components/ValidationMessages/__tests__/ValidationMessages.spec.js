import React from 'react';
import { mount } from 'enzyme';
import ValidationMessages from '..';

describe('ValidationMessages', () => {
  it('info renders correctly', () => {
    const component = mount(
      <ValidationMessages
        messageType="info"
        validationMessage="Passengers has been reset to default value."
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('warning message renders correctly', () => {
    const component = mount(
      <ValidationMessages
        messageType="warning"
        validationMessage="Please select a destination."
      />
    );

    expect(component).toMatchSnapshot();
  });
});
