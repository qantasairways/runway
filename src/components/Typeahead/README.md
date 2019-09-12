```js
<Typeahead
  label="From"
  items={[
    { text: 'Sydney, Australia', badge: 'SYD' },
    { text: 'Melbourne, Australia', badge: 'MEL' },
    { text: 'Brisbane, Australia', badge: 'BNE' },
    { text: 'Perth, Australia', badge: 'PER' },
    { text: 'Darwin, Australia', badge: 'DRW' },
    { text: 'Gold Coast, Australia', badge: 'OOL' },
    { text: 'Adelaide, Australia', badge: 'ADL' },
    { text: 'Los Angeles, United States', badge: 'LAX' },
    { text: 'Abu Dhabi, United Arab Emirates', badge: 'AUH' },
    { text: 'Toowoomba (Brisbane West Wellcamp), Australia', badge: 'WTB' },
    { text: 'London (Heathrow), United Kingdom', badge: 'LHR' },
    { text: 'New York (Newark), United States', badge: 'EWR' }
  ]}
  itemToString={item => (item ? String(item.text) : '')}
  badgeToString={item => (item ? String(item.badge) : '')}
  menuHeight="auto"
  filterItems={(items, inputValue) => {
    return items.filter(item => {
      const regex = new RegExp(inputValue, 'gi');

      return regex.test(`${item.text} ${item.badge}`);
    });
  }}
/>
```

### When selectedItemValue provided

Optional prop to maintain state externally (passed to downshift's selectedItem prop)

```js
<StatefulManager initial={{ text: 'Gold Coast, Australia', badge: 'OOL' }}>
  {({ value, updater }) => (
    <Typeahead
      label="From"
      items={[
        { text: 'Sydney, Australia', badge: 'SYD' },
        { text: 'Melbourne, Australia', badge: 'MEL' },
        { text: 'Brisbane, Australia', badge: 'BNE' },
        { text: 'Perth, Australia', badge: 'PER' },
        { text: 'Darwin, Australia', badge: 'DRW' },
        { text: 'Gold Coast, Australia', badge: 'OOL' },
        { text: 'Adelaide, Australia', badge: 'ADL' },
        { text: 'Los Angeles, United States', badge: 'LAX' },
        { text: 'Abu Dhabi, United Arab Emirates', badge: 'AUH' },
        { text: 'Toowoomba (Brisbane West Wellcamp), Australia', badge: 'WTB' },
        { text: 'London (Heathrow), United Kingdom', badge: 'LHR' },
        { text: 'New York (Newark), United States', badge: 'EWR' }
      ]}
      itemToString={item => (item ? String(item.text) : '')}
      badgeToString={item => (item ? String(item.badge) : '')}
      menuHeight="auto"
      filterItems={(items, inputValue) => {
        return items.filter(item => {
          const regex = new RegExp(inputValue, 'gi');

          return regex.test(`${item.text} ${item.badge}`);
        });
      }}
      selectedItemValue={value}
      onChange={updater}
    />
  )}
</StatefulManager>
```
