import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../components/Footer';

describe('Footer', () => {
  let footer;

  it('renders correctly with defaults', () => {
    footer = shallow(<Footer actionText="" onActionButtonClick={e => e} />);

    expect(footer).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    footer = shallow(
      <Footer
        showPreFooter={false}
        showBottomFooter={false}
        bottomFootersummaryLabel="From"
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
});
