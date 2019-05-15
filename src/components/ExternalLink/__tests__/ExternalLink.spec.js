import React from 'react';
import { mount } from 'enzyme';
import ExternalLink, { SELECTORS } from '../index';
import { toCx } from '../../../utils/css';

describe('ExternalLink', () => {
  const setMatchMedia = matches => {
    window.matchMedia = () => ({
      matches,
      addListener: jest.fn(),
      removeListener: jest.fn()
    });
  };

  it('renders correctly when smaller viewport', () => {
    setMatchMedia(false);
    const renderIcon = jest.fn(() => <div />);
    const externalLink = mount(
      <ExternalLink url="mockUrl" renderIcon={renderIcon} text="mockText" />
    );
    expect(externalLink).toMatchSnapshot();
    expect(renderIcon).toBeCalledWith(toCx(SELECTORS.ICON.SMALL));
  });

  it('renders correctly when larger viewport', () => {
    setMatchMedia(true);
    const renderIcon = jest.fn(() => <div />);
    const externalLink = mount(
      <ExternalLink url="mockUrl" renderIcon={renderIcon} text="mockText" />
    );
    expect(externalLink).toMatchSnapshot();
    expect(renderIcon).toBeCalledWith(toCx(SELECTORS.ICON.LARGE));
  });
});
