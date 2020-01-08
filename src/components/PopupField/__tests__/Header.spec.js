import React from 'react';
import { mount } from 'enzyme';
import Header from '../components/Header';

jest.mock('../../../icons/CrossIcon', () => () => <span>Mock Cross Icon</span>);
jest.mock('shortid', () => ({ generate: () => 'shortid' }));

const DummyIcon = () => <div>ICON</div>;

describe('Header', () => {
  let component;

  it('renders correctly with defaults', () => {
    component = mount(<Header closeDialog={() => {}} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    const renderHeaderChildren = () => <div>HEADER CHILDREN</div>;

    component = mount(
      <Header
        headerLabel="header label"
        headerHeight={50}
        HeaderIcon={DummyIcon}
        closeAriaLabel="close"
        renderHeaderChildren={renderHeaderChildren}
        closeDialog={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
