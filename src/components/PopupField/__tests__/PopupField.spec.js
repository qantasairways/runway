import React from 'react';
import { mount, shallow } from 'enzyme';
import PopupField from '..';

import PinIcon from '../../../icons/PinIcon';

function openDialog(component) {
  component.instance().setState({ open: true });
}

describe('PopupField', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = shallow(<PopupField />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    beforeAll(() => {
      component = shallow(
        <PopupField
          closeAriaLabel="Close Aria Label"
          dialogAriaLabel="Dialog Aria Label"
          onClose={e => e}
          onBlur={e => e}
          buttonLabel="Field Label"
          largeButtonValue="large value"
          smallButtonValue="small value"
          placeHolder="placeholder"
          Icon={PinIcon}
          headerLabel="header label"
          headerHeight={100}
          HeaderIcon={PinIcon}
        />
      );
      openDialog(component);
    });

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with one child element', () => {
    component = shallow(
      <PopupField>
        <span>Child Element</span>
      </PopupField>
    );
    openDialog(component);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with one child function', () => {
    component = mount(
      <PopupField>
        {({ closeDialog }) => <button type="button" onClick={closeDialog} />}
      </PopupField>
    );
    openDialog(component);

    expect(component).toMatchSnapshot();
  });
});
