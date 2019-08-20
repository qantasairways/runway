import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header';
import noop from '../../../utils/noop';

const start = new Date(2019, 3, 21, 0, 0, 0, 0);
const end = new Date(2019, 3, 24, 0, 0, 0, 0);
const CalendarIcon = () => <div>Calendar Icon</div>;

describe('Header', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = shallow(
      <Header
        closeDialog={() => {}}
        firstDayOfWeek={1}
        rowStyles={{}}
        dayLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        onKeyDown={noop}
        setFocusElementRef={noop}
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
        startDate={start}
        endDate={end}
        isSelectingStartDate={false}
        isSingleDate
        startSelectedLabel="depart"
        endSelectedLabel="return"
        startPlaceholder="depart when?"
        endPlaceholder="return when?"
        Icon={CalendarIcon}
        isDateRange={false}
        onKeyDown={noop}
        setFocusElementRef={noop}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
