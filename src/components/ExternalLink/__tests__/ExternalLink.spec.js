import React from 'react';
import { mount } from 'enzyme';
import ExternalLink from '../index';

describe('ExternalLink', () => {
  it('renders correctly', () => {
    const externalLink = mount(
      <ExternalLink url="mockUrl" icon="mockIcon" text="mockText" />
    );
    expect(externalLink).toMatchSnapshot();
  });
});
