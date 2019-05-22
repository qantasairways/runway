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
      isInvalid={isBadValue(value)}
      isInvalidMessage="It was a bad value"
    />
  )}
</StatefulManager>;
```
