```js
<StatefulManager initial={false}>
  {({ value, updater }) => (
    <FocusLock active={value} returnFocus={false}>
      <div>
        <button type="button" onClick={() => updater(!value)}>
          Focus
        </button>
        <input type="text" value="will" />
        <a href="be">lock here</a>
      </div>
    </FocusLock>
  )}
</StatefulManager>
```
