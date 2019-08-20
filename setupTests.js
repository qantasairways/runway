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

configure({ adapter: new Adapter() });
