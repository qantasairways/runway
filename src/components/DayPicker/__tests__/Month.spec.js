import React from 'react';
import { shallow } from 'enzyme';
import noop from '../../../utils/noop';
import Month from '../components/Month';

const DummyIcon = () => <div>Icon</div>;

describe('Month', () => {
  let component;

  const requiredProps = {
    months: [new Date(2019, 3, 20, 0, 0, 0)],
    monthIndex: 0,
    disabledBefore: new Date(2019, 3, 2, 0, 0, 0),
    disabledAfter: new Date(2019, 3, 26, 0, 0, 0),
    today: new Date(2019, 3, 15, 0, 0, 0).getTime(),
    firstDayOfWeek: 1,
    onDayClick: noop,
    focusDateElement: noop,
    days: [
      {
        date: new Date(2019, 3, 20, 0, 0, 0),
        timestamp: new Date(2019, 3, 20, 0, 0, 0).getTime()
      },
      {
        date: new Date(2019, 3, 21, 0, 0, 0),
        timestamp: new Date(2019, 3, 21, 0, 0, 0).getTime()
      },
      {
        date: new Date(2019, 3, 22, 0, 0, 0),
        timestamp: new Date(2019, 3, 22, 0, 0, 0).getTime()
      }
    ],
    monthLabels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]
  };

  const props = {
    startDate: new Date(2019, 3, 25, 0, 0, 0),
    endDate: new Date(2019, 3, 29, 0, 0, 0),
    isDateRange: false,
    isSelectingStartDate: false,
    isDesktopDevice: true,
    startSelectedLabel: 'start selected',
    endSelectedLabel: 'end selected',
    startLabel: 'start',
    endLabel: 'end',
    startAriaLabel: 'this is the start',
    endAriaLabel: 'this is the end',
    Icon: DummyIcon,
    rowStyles: { top: 0 },
    style: { bottom: 0 }
  };

  it('renders correctly with defaults', () => {
    component = shallow(<Month {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when with props', () => {
    component = shallow(<Month {...requiredProps} {...props} />);

    expect(component).toMatchSnapshot();
  });
});
