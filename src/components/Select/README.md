```js
const itemsArray = [
  {
    name: 'Economy'
  },
  {
    name: 'Premium Economy'
  },
  {
    name: 'Business'
  },
  {
    name: 'First'
  }
];

const selectedItem = itemsArray.find((value, index) => index === 0);

<Select items={itemsArray} initialSelectedItem={selectedItem} height="50px" />;
```

```js
const itemsArray = [
  {
    name: 'Economy'
  },
  {
    name: 'Premium Economy'
  },
  {
    name: 'Business'
  },
  {
    name: 'First'
  }
];

const selectedItem = itemsArray.find((value, index) => index === 0);

<div style={{ position: 'relative' }}>
  <Select
    items={itemsArray}
    initialSelectedItem={selectedItem}
    highlighted
    inline
    growMenu
  />
</div>;
```
