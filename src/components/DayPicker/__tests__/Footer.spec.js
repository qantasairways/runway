import React from 'react';
import { shallow, mount } from 'enzyme';
import Footer from '../components/Footer';

describe('Footer', () => {
  let footer;

  it('renders with defaults', () => {
    footer = shallow(<Footer actionText="" onActionButtonClick={e => e} />);

    expect(footer).toMatchSnapshot();
  });

  it('renders with props provided', () => {
    footer = shallow(
      <Footer
        showPreFooter={false}
        showBottomFooter={false}
        bottomFootersummaryLabel="From "
        preFooterInfo="Lowest economy price per adult in AUD for a return trip."
        preFooterDisclaimer="^ Taxes, fees and carrier charges. Limited avaliability"
        bottomFooterDisclaimer="+ $34.90^"
        actionText="CONFIRM"
        onActionButtonClick={e => e}
        endDateData={null}
      />
    );

    expect(footer).toMatchSnapshot();
  });

  it('renders preFooterDisclaimer and bottom footer text contents when endDateData includes price.value', () => {
    const endDateData = { price: { value: 3000 }, currencySymbol: '€' };
    footer = mount(
      <Footer
        showPreFooter
        showBottomFooter
        bottomFootersummaryLabel="From "
        preFooterInfo="Lowest economy price per adult in AUD for a return trip."
        preFooterDisclaimer="^ Taxes, fees and carrier charges. Limited avaliability"
        bottomFooterDisclaimer="+ $34.90^"
        actionText="CONFIRM"
        onActionButtonClick={e => e}
        endDateData={endDateData}
      />
    );
    expect(footer).toMatchSnapshot();
  });

  it('renders only confirm button when endDateData does NOT include price.value', () => {
    const endDateData = { price: null, currencySymbol: '€' };
    footer = mount(
      <Footer
        showPreFooter
        showBottomFooter
        bottomFootersummaryLabel="From "
        preFooterInfo="Lowest economy price per adult in AUD for a return trip."
        preFooterDisclaimer="^ Taxes, fees and carrier charges. Limited avaliability"
        bottomFooterDisclaimer="+ $34.90^"
        actionText="CONFIRM"
        onActionButtonClick={e => e}
        endDateData={endDateData}
      />
    );
    expect(footer).toMatchSnapshot();
  });
});
