import React from 'react';
import { mount } from 'enzyme';
import ExternalLink from '../index';

const createMockMediaMatcher = matches => {
  return () => ({
    matches,
    addListener: () => {},
    removeListener: () => {}
  });
};

describe('ExternalLink', () => {
  let originalMatchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  describe('when mobile', () => {
    beforeEach(() => {
      window.matchMedia = createMockMediaMatcher(true);
    });

    it('renders correctly', () => {
      const externalLink = mount(
        <ExternalLink url="mockUrl" icon="mockIcon" text="mockText" />
      );
      expect(externalLink).toMatchSnapshot();
    });
  });
  describe('when desktop', () => {
    beforeEach(() => {
      window.matchMedia = createMockMediaMatcher(false);
    });

    it('renders correctly', () => {
      const externalLink = mount(
        <ExternalLink url="mockUrl" icon="mockIcon" text="mockText" />
      );
      expect(externalLink).toMatchSnapshot();
    });
  });
});
