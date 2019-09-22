/* eslint-disable no-unused-vars */
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { createSerializer } from 'jest-emotion';
import * as emotion from 'emotion';

import ThemeProvider from './src/components/ThemeProvider';
import theme from './src/theme/airways';

expect.addSnapshotSerializer(createSerializer(emotion));

window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn()
}));

window.scrollTo = jest.fn();

configure({ adapter: new Adapter() });

global.mountWithThemeProvider = child => {
  return mount(<ThemeProvider theme={theme}>{child}</ThemeProvider>);
};
