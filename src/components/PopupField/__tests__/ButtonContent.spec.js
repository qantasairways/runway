import React from 'react';
import { mount } from 'enzyme';
import ButtonContent from '../components/ButtonContent';

const DummyIcon = () => <div>ICON</div>;

describe('ButtonContent', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = mount(<ButtonContent />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    const fieldLabel = 'Departing';
    const placeHolder = 'Departing From?';

    component = mount(
      <ButtonContent
        fieldLabel={fieldLabel}
        placeHolder={placeHolder}
        Icon={DummyIcon}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with values provided', () => {
    const fieldLabel = 'Departing';
    const placeHolder = 'Departing From?';
    const values = [
      { large: '18', small: 'Tue, May 2019' },
      { large: '20', small: 'Thu, May 2019' }
    ];

    component = mount(
      <ButtonContent
        fieldLabel={fieldLabel}
        placeHolder={placeHolder}
        values={values}
        Icon={DummyIcon}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
