import React from 'react';
import { shallow } from 'enzyme';
import CalendarHeader from '../components/CalendarHeader';

describe('CalendarHeader', () => {
  it('renders with defaults', () => {
    const calendar = shallow(
      <CalendarHeader
        startPlaceholder="depart?"
        endPlaceholder="return?"
        startSelectedLabel="departing on"
        endSelectedLabel="returning on"
      />
    );

    expect(calendar).toMatchSnapshot();
  });

  it('renders with props provided', () => {
    const calendar = shallow(
      <CalendarHeader
        startPlaceholder="depart?"
        endPlaceholder="return?"
        startSelectedLabel="departing on"
        endSelectedLabel="returning on"
        isSelectingStartDate={false}
        startDate="6th June"
        endDate="10th October"
      />
    );

    expect(calendar).toMatchSnapshot();
  });
});
