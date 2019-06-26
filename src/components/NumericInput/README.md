### NumericInput

```js
const isBadValue = value => value === 6;

<StatefulManager initial={4}>
  {({ value, updater }) => (
    <NumericInput
      label="Label content"
      id="manual-id-1"
      min={0}
      max={12}
      onChange={updater}
      value={value}
      highlightInvalid={isBadValue(value)}
      focusOnUpDown={false}
    />
  )}
</StatefulManager>;
```
