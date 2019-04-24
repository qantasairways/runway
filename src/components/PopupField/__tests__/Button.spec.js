import React from 'react';
import { mount } from 'enzyme';
import Button from '../components/Button';

const DummyIcon = () => <div>ICON</div>;

describe('Button', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = mount(<Button onClick={() => {}} setButtonRef={() => {}} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    component = mount(
      <Button
        renderButtonvalue={() => 'button value'}
        open
        onClick={() => {}}
        onBlur={() => {}}
        setButtonRef={() => {}}
        buttonLabel="field label"
        placeHolder="placeholder"
        icon={DummyIcon}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with buttonContent custom element', () => {
    component = mount(
      <Button
        renderButtonValue={() => <div>BUTTON CONTENT</div>}
        open
        onClick={() => {}}
        onBlur={() => {}}
        setButtonRef={() => {}}
        buttonLabel="field label"
        placeHolder="placeholder"
        icon={DummyIcon}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
