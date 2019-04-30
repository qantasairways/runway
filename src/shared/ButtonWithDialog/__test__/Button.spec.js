import React from 'react';
import { shallow } from 'enzyme';
import Button, { ButtonContent } from '../components/Button';

const DummyIcon = () => <div>ICON</div>;

describe('ButtonContent', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = shallow(<ButtonContent />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    component = shallow(
      <ButtonContent largeValue="Large Value" smallValue="Small Value" />
    );

    expect(component).toMatchSnapshot();
  });
});

describe('Button', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = shallow(<Button onClick={() => {}} setButtonRef={() => {}} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    component = shallow(
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
    component = shallow(
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
