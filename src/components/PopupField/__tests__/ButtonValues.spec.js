import React from 'react';
import { mount } from 'enzyme';
import ButtonValues from '../components/ButtonValues';

describe('ButtonValues', () => {
  let component;

  it('renders correctly with one large value', () => {
    const value = { large: 'MEL' };

    component = mount(<ButtonValues firstValue={value} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with one small value', () => {
    const value = { small: 'Melbourne, Australia' };

    component = mount(<ButtonValues firstValue={value} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with one large and small value', () => {
    const value = { large: 'MEL', small: 'Melbourne, Australia' };

    component = mount(<ButtonValues firstValue={value} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with two values', () => {
    const firstValue = { large: 'MEL', small: 'Melbourne, Australia' };
    const secondValue = { large: 'SYD', small: 'Sydney, Australia' };

    component = mount(
      <ButtonValues firstValue={firstValue} secondValue={secondValue} />
    );

    expect(component).toMatchSnapshot();
  });
});
