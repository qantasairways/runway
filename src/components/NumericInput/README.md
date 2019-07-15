```js
const isBadValue = value => value === 6;

<StatefulManager initial={4}>
  {({ value, updater }) => (
    <NumericInput
      label="Select Number"
      min={0}
      max={12}
      onChange={updater}
      value={value}
      highlightInvalid={isBadValue(value)}
    />
  )}
</StatefulManager>;
```
