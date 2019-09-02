import React from 'react';
import { mount } from 'enzyme';

import Dropdown from '../index';

jest.mock('shortid', () => ({ generate: () => 'mockId' }));

describe('Dropdown', () => {
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
    component = mount(<Dropdown {...props} initialSelectedItem={orange} />);
    const input = component.find('input');
    expect(input.props().value).toEqual(orange.name);
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
    const input = component.find('input');
    expect(input.props().value).toEqual(items[0].name);
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
        const input = component.find('input');
        expect(input.props().value).toEqual(orange.name);
      });
    });
    describe('when current selected is does NOT exist in items AND defaultItemWhenNoneSelected is valid AND still exists in items', () => {
      it('should keep select defaultItemWhenNoneSelected', () => {
        component = mount(
          <Dropdown
            {...props}
            items={items}
            initialSelectedItem={orange}
            defaultItemWhenNoneSelected={banana}
          />
        );
        const nextItems = [apple, banana];
        component.setProps({ items: nextItems });
        component.update();
        const input = component.find('input');
        expect(input.props().value).toEqual(banana.name);
      });
    });
    describe('when current selected does NOT exist in items AND defaultItemWhenNoneSelected does NOT exist in items', () => {
      it('should select first available item', () => {
        component = mount(
          <Dropdown
            {...props}
            items={items}
            initialSelectedItem={orange}
            defaultItemWhenNoneSelected={banana}
          />
        );
        const nextItems = [apple, pear];
        component.setProps({ items: nextItems });
        component.update();
        const input = component.find('input');
        expect(input.props().value).toEqual(apple.name);
      });
    });
  });
});
