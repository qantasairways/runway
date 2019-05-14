import React from 'react';
import { shallow } from 'enzyme';
import Day from '../components/Day';

const DummyIcon = () => <div>Icon</div>;

describe('Day', () => {
  let component;

  const defaultProps = {
    day: new Date(2019, 3, 20, 0, 0, 0),
    modifiers: {}
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
    isDesktopDevice: true
  };

  it('renders correctly with defaults', () => {
    component = shallow(<Day {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    component = shallow(<Day {...defaultProps} {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly for start date', () => {
    component = shallow(
      <Day {...defaultProps} {...props} modifiers={{ start: true }} />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly for end date', () => {
    component = shallow(
      <Day {...defaultProps} {...props} modifiers={{ end: true }} />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly for outside date', () => {
    component = shallow(
      <Day {...defaultProps} {...props} modifiers={{ outside: true }} />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly for selected date', () => {
    component = shallow(
      <Day {...defaultProps} {...props} modifiers={{ selected: true }} />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly for disabled date', () => {
    component = shallow(
      <Day {...defaultProps} {...props} modifiers={{ disabed: true }} />
    );

    expect(component).toMatchSnapshot();
  });
});
