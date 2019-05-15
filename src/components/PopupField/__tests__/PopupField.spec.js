import React from 'react';
import { mount } from 'enzyme';
import PopupField from '../index';

window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: true,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn()
}));

describe('PopupField', () => {
  it('renders correctly with defaults', () => {
    const component = mount(<PopupField />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    const component = mount(
      <PopupField
        placeHolder="Where to?"
        buttonLabel="Where"
        Icon="mockIcon"
        HeaderIcon="mockIcon"
        headerLabel="Passengers"
        disableHeader={false}
        disableFooter={false}
        dialogDimensions={{ height: '522px', width: '375px' }}
        iconLabelButtonValue={{
          icon: 'mockIcon',
          label: '12 Passengers'
        }}
        footerLabelsPrimary={['1 Adult, 1 Children', '4 Youths, 3 Infants']}
        footerLabelPrimaryAriaTitle="Passengers Summary prior to Confirmation"
        footerActionText="Confirm"
        onFooterAction={close => close()}
        preFooter="mockPreFooter"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with one child element', () => {
    const component = mount(
      <PopupField>
        <span>Child Element</span>
      </PopupField>
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with one child function', () => {
    const component = mount(
      <PopupField>
        {({ closeDialog }) => <button type="button" onClick={closeDialog} />}
      </PopupField>
    );
    expect(component).toMatchSnapshot();
  });
});
