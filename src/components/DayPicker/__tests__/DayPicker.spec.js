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

  beforeAll(() => {
    // Setup mock for global date object
    const RealDate = Date;
    global.Date = jest.fn(arg =>
      arg ? new RealDate(arg) : new RealDate(today.toISOString())
    );
    Object.assign(Date, RealDate);
  });

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
        component
          .instance()
          .renderHeader({ closeDialog: () => {}, setFocusElementRef: () => {} })
      );

      expect(renderedHeader).toMatchSnapshot();
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

    it('reset isSelectingStartDate to true when tripType is switched to Oneway (ie., isDateRange = false)', () => {
      component = shallow(<DayPicker {...props} />);
      component.instance().setState({ isSelectingStartDate: false });
      expect(component.state('isSelectingStartDate')).toBeFalsy();

      component.instance().onOpen();

      expect(component.state('isSelectingStartDate')).toBeTruthy();
    });

    it('set isSelectingStartDate to false when isDate range is true and startDate exists', () => {
      component = shallow(
        <DayPicker {...props} isDateRange startDate={today} endDate={null} />
      );
      component.instance().setState({ isSelectingStartDate: true });
      expect(component.state('isSelectingStartDate')).toBeTruthy();

      component.instance().onOpen();

      expect(component.state('isSelectingStartDate')).toBeFalsy();
    });
  });
});
