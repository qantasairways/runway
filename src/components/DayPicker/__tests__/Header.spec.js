import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header';

describe('Header', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = shallow(
      <Header
        closeDialog={() => {}}
        firstDayOfWeek={1}
        rowStyles={{}}
        dayLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    component = shallow(
      <Header
        headerLabel="header label"
        firstDayOfWeek={5}
        closeAriaLabel="close"
        closeDialog={() => {}}
        rowStyles={{}}
        dayLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
