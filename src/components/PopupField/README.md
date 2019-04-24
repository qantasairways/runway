### Value not selected

Optional placeholder and icon will be displayed if provided

```js
<PopupField
  placeHolder="When?"
  buttonLabel="When"
  Icon={CalendarIcon}
  HeaderIcon={CalendarIcon}
  headerLabel="Popup Field"
>
  <div>Content of the popup</div>
</PopupField>
```

### Value Selected

Optional labels `largeButtonValue` and/or `smallButtonValue` will be displayed if provided

```js
<PopupField
  placeHolder="When?"
  buttonLabel="When"
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
| closePopup         | function | Closes the popup                                                 |
| setFocusElementRef | function | Sets ref on an element that will be focused when the popup opens |

```js
<PopupField
  buttonLabel="Where"
  placeHolder="Where to?"
  headerLabel="Popup Field"
  HeaderIcon={PinIcon}
>
  {({ closePopup, setFocusElementRef }) => (
    <div>
      <div>Render Custom Content</div>
      <input type="text" ref={setFocusElementRef} />
      <button onClick={closePopup}>Close</button>
    </div>
  )}
</PopupField>
```
