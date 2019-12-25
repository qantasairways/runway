import React from 'react';
import { mount } from 'enzyme';
import Dropdown from '../index';

jest.mock('shortid', () => ({ generate: () => 'mockId' }));

describe('Select', () => {
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

  it('renders correctly with defaults', () => {
    component = mount(<Dropdown items={[]} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with props provided', () => {
    component = mount(<Dropdown {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('initially renders with valid initialSelectedItem selected', () => {
    component = mount(
      <Dropdown {...props} items={items} initialSelectedItem={orange} />
    );
    const button = component.find('button');
    expect(button.text()).toEqual(orange.name);
  });

  it('initially renders with first available item selected when initialSelectedItem not valid', () => {
    const missingName = { value: 'value:bad' };
    const mockItems = [...items, missingName];
    component = mount(
      <Dropdown
        {...props}
        items={mockItems}
        initialSelectedItem={missingName}
      />
    );
    const button = component.find('button');
    expect(button.text()).toEqual(items[0].name);
  });

  describe('when items change', () => {
    describe('when current selected is valid AND still exists in items', () => {
      it('should keep current selected', () => {
        component = mount(
          <Dropdown {...props} items={items} initialSelectedItem={orange} />
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
