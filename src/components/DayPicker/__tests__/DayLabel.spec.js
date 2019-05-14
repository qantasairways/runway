import React from 'react';
import { shallow } from 'enzyme';
import DayLabel from '../components/DayLabel';

const DummyIcon = () => <div>Icon</div>;

describe('DayLabel', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = shallow(<DayLabel />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    component = shallow(
      <DayLabel
        leftAligned={false}
        bottomAligned
        isSelected
        label="Label"
        Icon={DummyIcon}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
