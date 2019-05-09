import React from 'react';
import { shallow } from 'enzyme';
import Tabs from '../components/Tabs';

const CalendarIcon = () => <div>Calendar Icon</div>;

describe('Tabs', () => {
  it('renders with defaults', () => {
    const calendar = shallow(
      <Tabs
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
      <Tabs
        startPlaceholder="depart?"
        endPlaceholder="return?"
        startSelectedLabel="departing on"
        endSelectedLabel="returning on"
        isSelectingStartDate={false}
        startDate="6th June"
        endDate="10th October"
        Icon={CalendarIcon}
      />
    );

    expect(calendar).toMatchSnapshot();
  });
});
