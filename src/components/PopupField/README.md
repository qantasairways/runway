### Value Selected

- Return value of `renderButtonValue` will be displayed if provided
- Use named export `largeButtonTextStyles` for styling larger text in the button

```js
const largeButtonTextStyles = require('./index.js').largeButtonTextStyles;

<PopupField
  fieldLabel="Where"
  renderButtonValue={() => (
    <div>
      <div className={largeButtonTextStyles()}>SYD</div>
      <div>Sydney Kingsford Smith (SYD), Australia</div>
    </div>
  )}
  headerLabel="Popup Field"
  HeaderIcon={PinIcon}
>
  <div>Content of the popup</div>
</PopupField>;
```

### Value not selected

Optional placeholder and icon will be displayed

```js
<PopupField
  placeHolder="When?"
  fieldLabel="When"
  Icon={CalendarIcon}
  HeaderIcon={CalendarIcon}
  headerLabel="Popup Field"
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
  fieldLabel="Where"
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
