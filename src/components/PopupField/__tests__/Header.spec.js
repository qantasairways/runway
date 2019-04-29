import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header';

jest.mock('shortid', () => ({ generate: () => 'shortid' }));
const DummyIcon = () => <div>ICON</div>;

describe('Header', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = shallow(<Header closePopup={() => {}} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    const renderHeaderChildren = () => <div>HEADER CHILDREN</div>;

    component = shallow(
      <Header
        headerLabel="header label"
        headerHeight={50}
        HeaderIcon={DummyIcon}
        closeAriaLabel="close"
        renderHeaderChildren={renderHeaderChildren}
        closePopup={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
