```js
<Toggle
  checked={false}
  label="Uncontrolled"
  id="toggle-1"
  onChange={value => console.log(value)}
  containerClassName="toggle-container-name-1"
/>
```

```js
<StatefulManager initial>
  {({ value, updater }) => (
    <Toggle
      label="Controlled"
      id="toggle-3"
      checked={value}
      onChange={() => updater(!value)}
      containerClassName="toggle-container-name-3"
    />
  )}
</StatefulManager>
```
