import React from 'react';
import { shallow } from 'enzyme';
import DayPicker from '..';

const today = new Date(2019, 3, 21, 0, 0, 0, 0);
const end = new Date(2019, 4, 1, 0, 0, 0, 0);
const disabledBefore = new Date(2019, 3, 10, 0, 0, 0, 0);
const hiddenBefore = new Date(2019, 3, 8, 0, 0, 0, 0);
const disabledAfter = new Date(2019, 4, 21, 0, 0, 0, 0);
const CalendarIcon = () => <div>Calendar Icon</div>;

const props = {
  startDate: today,
  endDate: end,
  isDateRange: false,
  hiddenBefore,
  disabledBefore,
  disabledAfter,
  onDayClick: e => e,
  firstDayOfWeek: 4,
  monthsToShow: 6,
  buttonLabel: 'Label',
  placeHolder: 'Placeholder',
  headerLabel: 'header label',
  startSelectedLabel: 'SYD',
  endSelectedLabel: 'MEL',
  startLabel: 'Depart',
  endLabel: 'Return',
  startPlaceholder: 'depart when?',
  endPlaceholder: 'return when?',
  startAriaLabel: 'Selected for departure',
  endAriaLabel: 'Selected for return',
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
  ],
  dayLabels: ['Mon', 'Tue'],
  closeAriaLabel: 'Close aria label',
  dialogAriaLabel: 'dialog aria label',
  Icon: CalendarIcon,
  transformDatesData: null,
  configOnMonthsShownSubscription: null,
  footerButtonLabel: 'Confirm',
  preFooterInfo: 'Lowest economy price per adult in AUD for a return trip.',
  bottomFootersummaryLabel: 'From',
  hasPrice: false,
  endDateData: null
};

describe('DayPicker', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = shallow(<DayPicker />);

    expect(component).toMatchSnapshot();
  });

  it('renders DayPicker with props provided', () => {
    component = shallow(<DayPicker {...props} />);

    expect(component).toMatchSnapshot();
  });

  describe('renderHeader()', () => {
    it('renders correctly', () => {
      component = shallow(<DayPicker {...props} />);

      const renderedHeader = shallow(
        component.instance().renderHeader({ closeDialog: () => {} })
      );

      expect(renderedHeader).toMatchSnapshot();
    });
  });

  describe('renderMonth()', () => {
    it('renders correctly', () => {
      component = shallow(<DayPicker {...props} />);

      const renderedMonth = shallow(
        component.instance().renderMonth({ index: 0, style: {} }, true)
      );

      expect(renderedMonth).toMatchSnapshot();
    });
  });

  describe('renderButtonDates()', () => {
    it('does not render if start date is not selected', () => {
      component = shallow(
        <DayPicker {...props} startDate={null} endDate={null} />
      );

      expect(component.instance().renderButtonDates()).toBe(null);
    });

    it('renders correctly when start date is selected', () => {
      component = shallow(
        <DayPicker {...props} startDate={today} endDate={null} />
      );

      const renderedDates = shallow(component.instance().renderButtonDates());

      expect(renderedDates).toMatchSnapshot();
    });

    it('renders correctly when start and end dates are selected', () => {
      component = shallow(<DayPicker {...props} />);

      const renderedDates = shallow(component.instance().renderButtonDates());

      expect(renderedDates).toMatchSnapshot();
    });
  });
});
