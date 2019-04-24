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

<div style={{ position: 'relative' }}>
  <Dropdown items={itemsArray} placeholder="Trip Type" />
</div>;
```

### Full Width Left Aligned

_Note: Full width variation requires a parent with relative position_

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

<div style={{ position: 'relative' }}>
  <Dropdown
    items={itemsArray}
    placeholder="Return"
    fullWidth={true}
    leftAlign={true}
  />
</div>;
```
