import React from 'react';
import { shallow } from 'enzyme';
import CalendarHeader from '../components/CalendarHeader';

describe('CalendarHeader', () => {
  it('renders with defaults', () => {
    const calendar = shallow(
      <CalendarHeader
        departPlaceholder="depart?"
        returnPlaceholder="return?"
        departSelectedLabel="departing on"
        returnSelectedLabel="returning on"
      />
    );

    expect(calendar).toMatchSnapshot();
  });

  it('renders with props provided', () => {
    const calendar = shallow(
      <CalendarHeader
        departPlaceholder="depart?"
        returnPlaceholder="return?"
        departSelectedLabel="departing on"
        returnSelectedLabel="returning on"
        isSelectingStartDate={false}
        departDate="6th June"
        returnDate="10th October"
      />
    );

    expect(calendar).toMatchSnapshot();
  });
});
