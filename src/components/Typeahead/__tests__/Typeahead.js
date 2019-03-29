import React, { Component } from 'react';
import { mount } from 'enzyme';
import Downshift from 'downshift';

import Typeahead from '..';

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
    const component = mount(<Typeahead items={items} isFetchingList />);
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

    it('does not call fetchListOnInput() when input change type is not "changeInput"', () => {
      const component = mount(
        <Typeahead items={items} fetchListOnInput={fetchListOnInputMock} />
      );
      const downshiftChangetype = Downshift.stateChangeTypes.clickItem;
      component.instance().onInputValueChange('grape', {
        selectedItem: null,
        type: downshiftChangetype
      });
      expect(fetchListOnInputMock.mock.calls.length).toBe(0);
    });

    it('calls fetchListOnInput() when input change type is "changeInput"', () => {
      const downshiftChangetype = Downshift.stateChangeTypes.changeInput;
      const component = mount(
        <Typeahead
          items={items}
          minChars={3}
          fetchListOnInput={fetchListOnInputMock}
        />
      );
      component.instance().onInputValueChange('grap', {
        selectedItem: null,
        type: downshiftChangetype
      });
      expect(fetchListOnInputMock.mock.calls.length).toBe(1);
    });
  });

  describe('Escape Hatches', () => {
    let fetchListOnInputMock = jest.fn();
    beforeEach(() => {
      fetchListOnInputMock = jest.fn().mockResolvedValue({});
    });
    afterEach(() => {
      fetchListOnInputMock.mockReset();
    });
    describe('selectItemCollector', () => {
      it('should hand selectItem to selectItemCollector and allow selected state overrides', () => {
        // naive implementation of using escape hatch to override Typeaheads internal
        // state selection for testing purposes.
        class Tracker extends Component {
          track = collectedFx => {
            this.tracked = collectedFx;
          };

          render = () => (
            <Typeahead
              items={items}
              minChars={3}
              fetchListOnInput={fetchListOnInputMock}
              selectItemCollector={(...args) => this.track(...args)}
            />
          );
        }

        const tracker = mount(<Tracker />);

        const { value: initialSelection } = tracker.find('input').props();
        expect(initialSelection).toEqual('');

        const desiredSelection = 'mock desired new selection';
        tracker.instance().tracked(desiredSelection);
        tracker.update();

        const { value: updatedSelection } = tracker.find('input').props();
        expect(updatedSelection).toEqual(desiredSelection);
      });
    });
  });
});
