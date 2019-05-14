### Right Aligned

```js
const itemsArray = [
  {
    name: 'Return'
  },
  {
    name: 'One way'
  }
];
const SelectedItem = itemsArray.find((value, index) => index === 0);

<div>
  <Dropdown
    items={itemsArray}
    placeholder="Return"
    isButtonStyle={false}
    initialSelectedItem={SelectedItem}
  />
</div>;
```

### Left Aligned Button Style

```js
const itemsArray = [
  {
    name: 'Economy'
  },
  {
    name: 'Premium economy'
  },
  {
    name: 'Business'
  },
  {
    name: 'First'
  }
];
const SelectedItem = itemsArray.find((value, index) => index === 0);

<div>
  <Dropdown
    items={itemsArray}
    placeholder="Economy"
    leftAlign={true}
    isButtonStyle={true}
    initialSelectedItem={SelectedItem}
  />
</div>;
```
