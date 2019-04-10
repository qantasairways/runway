Value not selected

```js
<PopupField
  placeHolder="To where?"
  fieldLabel="To"
  icon={<PinIcon color="#626262" />}
>
  {({ closePopup }) => <Button onClick={closePopup} label="Close Popup" />}
</PopupField>
```

Value selected

```js
<PopupField
  placeHolder="To where?"
  fieldLabel="To"
  largeValue="SYD"
  smallValue="Sydney Kingsford Smith (SYD), Australia"
>
  {({ closePopup }) => <Button onClick={closePopup} label="Close Popup" />}
</PopupField>
```
