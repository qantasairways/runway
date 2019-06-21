```js
<Typeahead
  label="From"
  items={[
    {
      text: 'Sydney',
      badge: 'SYD'
    },
    {
      text: 'Melbourne',
      badge: 'MEL'
    },
    {
      text: 'Brisbane',
      badge: 'BNE'
    },
    {
      text: 'Perth',
      badge: 'PER'
    },
    {
      text: 'Darwin',
      badge: 'DRW'
    },
    {
      text: 'Gold Coast',
      badge: 'OOL'
    },
    {
      text: 'Adelaide',
      badge: 'ADL'
    },
    {
      text: 'Los Angeles, United States',
      badge: 'LAX'
    },
    {
      text: 'Abu Dhabi, United Arab Emirates',
      badge: 'AUH'
    },
    {
      text: 'Toowoomba (Brisbane West Wellcamp), Australia',
      badge: 'WTB'
    },
    {
      text: 'London (Heathrow), United Kingdom',
      badge: 'LHR'
    },
    {
      text: 'New York (Newark), United States',
      badge: 'EWR'
    }
  ]}
  itemToString={item => (item ? String(item.text) : '')}
  badgeToString={item => (item ? String(item.badge) : '')}
  filterItems={(items, inputValue) => {
    return items.filter(item => {
      const regex = new RegExp(inputValue, 'gi');

      return regex.test(`${item.text} ${item.badge}`);
    });
  }}
/>
```
