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
    withPadding={false}
    initialSelectedItem={SelectedItem}
  />
</div>;
```

### Left Aligned With Padding

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
    withPadding={true}
    initialSelectedItem={SelectedItem}
  />
</div>;
```
