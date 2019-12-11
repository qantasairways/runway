```js
const isBadValue = value => value === 6;

<StatefulManager initial={4}>
  {({ value, updater }) => (
    <NumericInput
      label="Select Number"
      id="numeriInput"
      min={0}
      max={12}
      onChange={updater}
      value={value}
      highlightInvalid={isBadValue(value)}
      ariaDescription={'Press up to increase. Press down to decrease value.'}
    />
  )}
</StatefulManager>;
```
