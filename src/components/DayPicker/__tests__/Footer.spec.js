import React from 'react';
import { shallow } from 'enzyme';
import Footer from '..';

describe('Footer', () => {
  it('renders with props provided', () => {
    const footer = shallow(
      <Footer
        isCheapest={false}
        showPreFooter={false}
        showBottomFooter={false}
        info="Total return pricez in AUD per adult for a 25 day trip"
        summaryLabel="From "
        points="150,127 points"
        bottomFooterDisclaimer=" + $344.90 ^"
        preFooterDisclaimer="^ taxes fees and carrier charges. Limited avaliability"
        actionText="Confirm"
      />
    );

    expect(footer).toMatchSnapshot();
  });
});
