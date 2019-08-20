import React from 'react';
import { shallow } from 'enzyme';
import noop from '../../../utils/noop';

import Day from '../components/Day';

import {
  getShouldSelectAsStartDate,
  getEndDateFromStartDate
} from '../helpers';
import { KEY_CODE_ENTER, KEY_CODE_SPACE } from '../../../constants/keyCodes';

jest.mock('../helpers', () => ({
  getShouldSelectAsStartDate: jest.fn(),
  getEndDateFromStartDate: jest.fn(),
  DAY_CELL_HEIGHT_DESKTOP: 90,
  DAY_CELL_HEIGHT_MOBILE: 94
}));

const DummyIcon = () => <div>Icon</div>;

describe('Day', () => {
  let component;

  const date = new Date(2019, 3, 20, 0, 0, 0);
  const defaultProps = {
    date,
    timestamp: date.getTime(),
    month: 'January',
    year: 2018,
    onDayClick: noop,
    onDayNavigate: noop
  };

  const props = {
    isSelectingStartDate: false,
    startSelectedLabel: 'MEL',
    endSelectedLabel: 'SYD',
    startLabel: 'Depart',
    endLabel: 'Return',
    startAriaLabel: 'Selected for departure',
    endAriaLabel: 'Selected for return',
    Icon: DummyIcon,
    isDesktopDevice: false,
    startDate: new Date(2019, 3, 21, 0, 0, 0),
    endDate: new Date(2019, 3, 23, 0, 0, 0),
    isStart: false,
    isEnd: false,
    isInRange: false,
    isDisabled: false,
    isOutside: false,
    isToday: false,
    isFirstDayOfMonth: false,
    isDateRange: true,
    isLoadingPrice: false,
    currencyCode: 'AUD',
    currencySymbol: '$',
    price: null
  };

  it('renders correctly with defaults', () => {
    component = shallow(<Day {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    component = shallow(<Day {...defaultProps} {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when isStart is true', () => {
    component = shallow(<Day {...defaultProps} {...props} isStart />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when isEnd is true', () => {
    component = shallow(<Day {...defaultProps} {...props} isEnd />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when isInRange is true', () => {
    component = shallow(<Day {...defaultProps} {...props} isInRange />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when isDisabled is true', () => {
    component = shallow(<Day {...defaultProps} {...props} isDisabled />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when isOutside is true', () => {
    component = shallow(<Day {...defaultProps} {...props} isOutside />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when isToday is true', () => {
    component = shallow(<Day {...defaultProps} {...props} isToday />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when isFirstDayOfMonth is true', () => {
    component = shallow(<Day {...defaultProps} {...props} isFirstDayOfMonth />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when isLoadingPrice is true', () => {
    component = shallow(<Day {...defaultProps} {...props} isLoadingPrice />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when price is provided', () => {
    component = shallow(
      <Day
        {...defaultProps}
        {...props}
        price={{
          value: 123,
          taxValue: 2,
          isLowestPrice: false,
          isLowestPoints: false
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when isDesktopDevice is true and this.state.hover is true', () => {
    component = shallow(<Day {...defaultProps} {...props} isDesktopDevice />);
    component.instance().setState({ hover: true });

    expect(component).toMatchSnapshot();
  });

  describe('renderHoverLabel()', () => {
    it('returns null if isDisabled is true', () => {
      component = shallow(<Day {...defaultProps} {...props} isDisabled />);

      expect(component.instance().renderHoverLabel()).toBe(null);
    });

    it('returns null if isSelectingStartDate is true and isStart is true', () => {
      component = shallow(
        <Day {...defaultProps} {...props} isSelectingStartDate isStart />
      );

      expect(component.instance().renderHoverLabel()).toBe(null);
    });

    it('returns null if isSelectingStartDate is false and isEnd is true', () => {
      component = shallow(
        <Day {...defaultProps} {...props} isSelectingStartDate={false} isEnd />
      );

      expect(component.instance().renderHoverLabel()).toBe(null);
    });

    describe('when getShouldSelectAsStartDate returns true', () => {
      beforeEach(() => {
        getShouldSelectAsStartDate.mockImplementation(() => true);
      });

      it('returns the correct markup', () => {
        component = shallow(<Day {...defaultProps} {...props} />);

        expect(component.instance().renderHoverLabel()).toMatchSnapshot();
      });
    });

    describe('when getShouldSelectAsStartDate returns false', () => {
      beforeEach(() => {
        getShouldSelectAsStartDate.mockImplementation(() => false);
      });

      it('returns the correct markup when isEnd is false', () => {
        component = shallow(<Day {...defaultProps} {...props} isEnd={false} />);

        expect(component.instance().renderHoverLabel()).toMatchSnapshot();
      });

      it('returns null when isEnd is true', () => {
        component = shallow(<Day {...defaultProps} {...props} isEnd />);

        expect(component.instance().renderHoverLabel()).toBe(null);
      });
    });
  });

  describe('handleKeyDown()', () => {
    const onDayClickMock = jest.fn();
    const onDayNavigateMock = jest.fn();
    const preventDefaultMock = jest.fn();
    const stopPropagationMock = jest.fn();

    afterEach(() => {
      onDayClickMock.mockReset();
      onDayNavigateMock.mockReset();
      preventDefaultMock.mockReset();
      stopPropagationMock.mockReset();
    });

    it('calls handleDayClick when key is the Enter key', () => {
      component = shallow(
        <Day {...defaultProps} {...props} onDayClick={onDayClickMock} />
      );
      component.instance().handleKeyDown({
        keyCode: KEY_CODE_ENTER,
        preventDefault: preventDefaultMock,
        stopPropagation: stopPropagationMock
      });
      expect(onDayClickMock.mock.calls.length).toBe(1);
      expect(preventDefaultMock.mock.calls.length).toBe(1);
      expect(stopPropagationMock.mock.calls.length).toBe(1);
    });

    it('calls handleDayClick when key is the Space key', () => {
      component = shallow(
        <Day {...defaultProps} {...props} onDayClick={onDayClickMock} />
      );
      component.instance().handleKeyDown({
        keyCode: KEY_CODE_SPACE,
        preventDefault: preventDefaultMock,
        stopPropagation: stopPropagationMock
      });
      expect(onDayClickMock.mock.calls.length).toBe(1);
      expect(preventDefaultMock.mock.calls.length).toBe(1);
      expect(stopPropagationMock.mock.calls.length).toBe(1);
    });

    it('calls this.props.onDayNavigate with correct args', () => {
      component = shallow(
        <Day {...defaultProps} {...props} onDayNavigate={onDayNavigateMock} />
      );
      component.instance().handleKeyDown({ keyCode: 555 });
      expect(onDayNavigateMock.mock.calls.length).toBe(1);
      expect(onDayNavigateMock.mock.calls[0][0]).toBe(date.getTime());
      expect(onDayNavigateMock.mock.calls[0][1]).toBe(555);
    });
  });

  describe('handleMouseOver()', () => {
    it('sets this.state.hover to true', () => {
      component = shallow(<Day {...defaultProps} {...props} />);
      component.instance().handleMouseOver();
      expect(component.instance().state.hover).toBe(true);
    });
  });

  describe('handleMouseLeave()', () => {
    it('sets this.state.hover to false', () => {
      component = shallow(<Day {...defaultProps} {...props} />);
      component.instance().setState({ hover: true });
      component.instance().handleMouseLeave();
      expect(component.instance().state.hover).toBe(false);
    });
  });

  describe('handleDayClick()', () => {
    const onDayClickMock = jest.fn();
    const calculatedEndDate = new Date(2019, 10, 11, 0, 0, 0, 0);

    afterEach(() => {
      onDayClickMock.mockReset();
      getShouldSelectAsStartDate.mockReset();
      getEndDateFromStartDate.mockReset();
    });

    it('sets this.state.hover to false', () => {
      component = shallow(<Day {...defaultProps} {...props} />);
      component.instance().setState({ hover: true });
      component.instance().handleDayClick();
      expect(component.instance().state.hover).toBe(false);
    });

    it('does not call this.props.onDayClick when the day is disabled', () => {
      component = shallow(
        <Day
          {...defaultProps}
          {...props}
          isDisabled
          onDayClick={onDayClickMock}
        />
      );
      component.instance().setState({ hover: true });
      component.instance().handleDayClick();
      expect(onDayClickMock.mock.calls.length).toBe(0);
      expect(component.instance().state.hover).toBe(false);
    });

    describe('when getShouldSelectAsStartDate returns true', () => {
      beforeEach(() => {
        getShouldSelectAsStartDate.mockImplementation(() => true);
        getEndDateFromStartDate.mockImplementation(() => calculatedEndDate);
      });

      it('calls this.props.onDayClick with the correct args', () => {
        component = shallow(
          <Day {...defaultProps} {...props} onDayClick={onDayClickMock} />
        );
        component.instance().handleDayClick();
        expect(onDayClickMock.mock.calls.length).toBe(1);
        expect(onDayClickMock.mock.calls[0][0]).toBe(date);
        expect(onDayClickMock.mock.calls[0][1]).toBe(calculatedEndDate);
        expect(onDayClickMock.mock.calls[0][2]).toBe(false);
      });

      it('calls this.props.onDayClick with the third argument as true when this.props.isDateRange is false', () => {
        component = shallow(
          <Day
            {...defaultProps}
            {...props}
            onDayClick={onDayClickMock}
            isDateRange={false}
          />
        );
        component.instance().handleDayClick();
        expect(onDayClickMock.mock.calls.length).toBe(1);
        expect(onDayClickMock.mock.calls[0][0]).toBe(date);
        expect(onDayClickMock.mock.calls[0][1]).toBe(calculatedEndDate);
        expect(onDayClickMock.mock.calls[0][2]).toBe(true);
      });
    });

    describe('when getShouldSelectAsStartDate returns false', () => {
      beforeEach(() => {
        getShouldSelectAsStartDate.mockImplementation(() => false);
      });

      it('calls this.props.onDayClick with the correct args', () => {
        component = shallow(
          <Day {...defaultProps} {...props} onDayClick={onDayClickMock} />
        );
        component.instance().handleDayClick();
        expect(onDayClickMock.mock.calls.length).toBe(1);
        expect(onDayClickMock.mock.calls[0][0]).toBe(props.startDate);
        expect(onDayClickMock.mock.calls[0][1]).toBe(date);
        expect(onDayClickMock.mock.calls[0][2]).toBe(true);
      });
    });
  });
});
