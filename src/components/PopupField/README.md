### Value not selected

Optional placeholder and icon will be displayed if provided

```js
<PopupField
  placeHolder="Where to?"
  buttonLabel="Where"
  Icon={PinIcon}
  HeaderIcon={PinIcon}
  headerLabel="Popup Field"
>
  <div>Content of the popup</div>
</PopupField>
```

### Value Selected

Optional labels `largeButtonValue` and/or `smallButtonValue` will be displayed if provided

```js
<PopupField
  placeHolder="Where to?"
  buttonLabel="Where"
  largeButtonValue="SYD"
  smallButtonValue="Sydney Kingsford Smith (SYD), Australia"
  headerLabel="Popup Field"
  HeaderIcon={PinIcon}
>
  <div>Content of the popup</div>
</PopupField>
```

### Render props

If the type of `children` provided is a function, the following render props are provided:

| Prop               | Type     | Description                                                      |
| ------------------ | -------- | ---------------------------------------------------------------- |
| closeDialog        | function | Closes the popup                                                 |
| setFocusElementRef | function | Sets ref on an element that will be focused when the popup opens |

```js
<PopupField
  buttonLabel="Where"
  placeHolder="Where to?"
  headerLabel="Popup Field"
  HeaderIcon={PinIcon}
>
  {({ closeDialog, setFocusElementRef }) => (
    <div>
      <div>Render Custom Content</div>
      <input type="text" ref={setFocusElementRef} />
      <button onClick={closeDialog}>Close</button>
    </div>
  )}
</PopupField>
```
