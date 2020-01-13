import React from 'react';
import { mount } from 'enzyme';
import { Select } from '../index';

jest.mock('shortid', () => ({ generate: () => 'mockId' }));

describe('Select', () => {
  const apple = { name: 'name:apple', value: 'value:apple' };
  const orange = { name: 'name:orange', value: 'name:orange' };
  const banana = { name: 'name:banana', value: 'name:banana' };
  const pear = { name: 'name:pear', value: 'value:pear' };

  const items = [apple, orange, banana];

  const props = {
    items,
    renderItem: () => <div>mockRenderItemResult</div>,
    withPadding: true,
    focus: true,
    downShiftProps: { itemToString: item => item.name },
    menuWidth: '800px',
    height: '20px',
    onChange: () => {},
    highlighted: true,
    inline: true,
    growMenu: true
  };

  it('renders correctly with defaults', () => {
    const component = mount(<Select items={[]} />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    const component = mount(<Select {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('initially renders with valid initialSelectedItem selected', () => {
    const component = mount(
      <Select {...props} items={items} initialSelectedItem={orange} />
    );
    const button = component.find('button');

    expect(button.text()).toEqual(orange.name);
  });

  it('initially renders with first available item selected when initialSelectedItem not valid', () => {
    const missingName = { value: 'value:bad' };
    const mockItems = [...items, missingName];
    const component = mount(
      <Select {...props} items={mockItems} initialSelectedItem={missingName} />
    );

    const button = component.find('button');
    expect(button.text()).toEqual(items[0].name);
  });

  describe('when items change', () => {
    describe('when current selected is valid AND still exists in items', () => {
      it('should keep current selected', () => {
        const component = mount(
          <Select {...props} items={items} initialSelectedItem={orange} />
        );
        const nextItems = [pear, orange];

        component.setProps({ items: nextItems });
        component.update();

        const button = component.find('button');

        expect(button.text()).toEqual(orange.name);
      });
    });
  });
});

// TODO: This doesn't work the way i want it to yet but react-testing-library works
/*
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

describe("Select - React Testing Library", () => {
  let component;

  const apple = { name: 'name:apple', value: 'value:apple' };
  const orange = { name: 'name:orange', value: 'name:orange' };
  const banana = { name: 'name:banana', value: 'name:banana' };
  const pear = { name: 'name:pear', value: 'value:pear' };

  const items = [apple, orange, banana];

  const props = {
    items,
    renderItem: () => <div>mockRenderItemResult</div>,
    withPadding: true,
    focus: true,
    downShiftProps: { itemToString: item => item.name },
    menuWidth: '800px',
    height: '20px',
    onChange: () => {},
    highlighted: true,
    inline: true,
    growMenu: true
  };

  it("should change styles appropriate for focus", () => {
    const { container, getByRole } = render(<Select {...props} items={items} initialSelectedItem={orange}/>);
    const button = getByRole('button');

    expect(container.firstChild).toMatchSnapshot()
  });
});
*/
