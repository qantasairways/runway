import React from 'react';
import { mount } from 'enzyme';
import FieldButton from '../components/FieldButton';

const DummyIcon = () => <div>ICON</div>;

describe('FieldButton', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = mount(
      <FieldButton onClick={() => {}} setButtonRef={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    component = mount(
      <FieldButton
        renderButtonvalue={() => 'button value'}
        open
        onClick={() => {}}
        onBlur={() => {}}
        setButtonRef={() => {}}
        fieldLabel="field label"
        placeHolder="placeholder"
        icon={DummyIcon}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with buttonContent custom element', () => {
    component = mount(
      <FieldButton
        renderButtonValue={() => <div>BUTTON CONTENT</div>}
        open
        onClick={() => {}}
        onBlur={() => {}}
        setButtonRef={() => {}}
        fieldLabel="field label"
        placeHolder="placeholder"
        icon={DummyIcon}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
