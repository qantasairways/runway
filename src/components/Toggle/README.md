```js
<Toggle
  label="Uncontrolled"
  id="toggle-1"
  onChange={value => console.log(value)}
  containerClassName="toggle-container-name-1"
/>
```

```js
<Toggle
  label="Controlled"
  id="toggle-2"
  checked={true}
  onChange={() => {}}
  containerClassName="toggle-container-name-2"
/>
```

```js
<StatefulManager initial>
  {({ value, updater }) => (
    <Toggle
      label="Controlled (Test)"
      id="toggle-3"
      checked={value}
      onChange={() => updater(!value)}
      containerClassName="toggle-container-name-3"
    />
  )}
</StatefulManager>
```
