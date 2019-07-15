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

const selectedItem = itemsArray.find((value, index) => index === 0);

<Dropdown
  items={itemsArray}
  initialSelectedItem={selectedItem}
  leftAlign
  withPadding
/>;
```
