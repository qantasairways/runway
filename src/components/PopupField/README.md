```js
const ButtonContent = (
  <div>
    <div>Open</div>
    <div>Popup</div>
  </div>
);

<PopupField buttonContent={ButtonContent}>
  {({ closePopup }) => <Button onClick={closePopup} label="Close Popup" />}
</PopupField>;
```
