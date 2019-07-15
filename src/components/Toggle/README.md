```js
<div style={{ padding: '20px', background: '#3c3c3c' }}>
  <StatefulManager initial>
    {({ value, updater }) => (
      <Toggle
        label="Toggle"
        checked={value}
        onChange={() => updater(!value)}
        spaceBetween="10px"
        handleSize={26}
        height={30}
        width={50}
        id="toggle-1"
      />
    )}
  </StatefulManager>
</div>
```
