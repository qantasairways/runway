import React from 'react';
import { mount } from 'enzyme';
import Typeahead from '..';

jest.mock('lodash.debounce', () => jest.fn().mockImplementation(fn => fn));

const items = ['apple', 'pear', 'orange', 'grape', 'banana'];
const itemsCustom = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' }
];

describe('Typeahead', () => {
  it('renders correctly with defaults', () => {
    const component = mount(<Typeahead items={[]} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with items', () => {
    const component = mount(<Typeahead items={items} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with error state', () => {
    const component = mount(
      <Typeahead items={items} valid={false} message="Something went wrong" />
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly when fetching', () => {
    const component = mount(<Typeahead items={items} />);
    component.instance().setState({ isFetchingList: true });
    expect(component).toMatchSnapshot();
  });

  describe('filterItems()', () => {
    it('returns the matching items for simple items array', () => {
      const component = mount(<Typeahead items={items} />);
      expect(component.instance().filterItems(items, 'ra')).toEqual([
        'orange',
        'grape'
      ]);
    });

    it('returns the matching items for custom structure of items', () => {
      const itemToString = item => (item ? String(item.value) : '');

      const component = mount(
        <Typeahead items={itemsCustom} itemToString={itemToString} />
      );
      expect(component.instance().filterItems(itemsCustom, 'ra')).toEqual([
        { value: 'orange' },
        { value: 'grape' }
      ]);
    });

    it('calls the filter prop method if provided', () => {});
  });

  describe('renderItems()', () => {
    it('returns the correct jsx for simple items array', () => {
      const component = mount(<Typeahead items={items} />);
      expect(
        component.instance().renderItems(() => {}, () => {}, 5, 6, 'ra')
      ).toMatchSnapshot();
    });

    it('returns the correct jsx for custom structure of items', () => {
      const itemToString = item => (item ? String(item.value) : '');

      const component = mount(
        <Typeahead items={itemsCustom} itemToString={itemToString} />
      );
      expect(
        component.instance().renderItems(() => {}, () => {}, 5, 6, 'ra')
      ).toMatchSnapshot();
    });
  });

  describe('onInputValueChange()', () => {
    let fetchListOnInputMock = jest.fn();

    beforeEach(() => {
      fetchListOnInputMock = jest.fn().mockResolvedValue({});
    });

    afterEach(() => {
      fetchListOnInputMock.mockReset();
    });

    it('does nothing when fetchListOnInput prop does not exist', () => {
      const component = mount(<Typeahead items={items} />);
      component.instance().onInputValueChange('grape', { selectedItem: null });
      expect(fetchListOnInputMock.mock.calls.length).toBe(0);
    });

    it('does nothing when the value is below the minimum length', () => {
      const component = mount(
        <Typeahead
          items={items}
          minChars={3}
          fetchListOnInput={fetchListOnInputMock}
        />
      );
      component.instance().onInputValueChange('gr', { selectedItem: null });
      expect(fetchListOnInputMock.mock.calls.length).toBe(0);
    });

    it('does nothing when the value has not changed', () => {
      const component = mount(
        <Typeahead
          items={items}
          minChars={3}
          fetchListOnInput={fetchListOnInputMock}
        />
      );
      component
        .instance()
        .onInputValueChange('grape', { selectedItem: 'grape' });
      expect(fetchListOnInputMock.mock.calls.length).toBe(0);
    });

    it('calls fetchListOnInput()', () => {
      const component = mount(
        <Typeahead
          items={items}
          minChars={3}
          fetchListOnInput={fetchListOnInputMock}
        />
      );
      component.instance().onInputValueChange('grap', { selectedItem: null });
      expect(fetchListOnInputMock.mock.calls.length).toBe(1);
    });
  });
});
