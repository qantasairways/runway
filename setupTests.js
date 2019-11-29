/* eslint-disable no-unused-vars */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'jest-emotion';
import * as emotion from 'emotion';

expect.addSnapshotSerializer(createSerializer(emotion));

window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn()
}));

window.scrollTo = jest.fn();

// Mock offsetParent (undefined in jsdom)
// https://github.com/jsdom/jsdom/issues/1261
Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
  get() {
    return this.parentNode;
  }
});

configure({ adapter: new Adapter() });
