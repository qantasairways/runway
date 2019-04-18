import React from 'react';
import { mount } from 'enzyme';
import ButtonContent from '../components/ButtonContent';

describe('ButtonContent', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = mount(<ButtonContent />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    const fieldLabel = 'Departing';
    const placeHolder = 'Departing From?';
    const largeValue = 'MEL';
    const smallValue = 'Melbourne, Australia';
    const icon = <div>ICON</div>;

    component = mount(
      <ButtonContent
        fieldLabel={fieldLabel}
        placeHolder={placeHolder}
        largeValue={largeValue}
        smallValue={smallValue}
        icon={icon}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
