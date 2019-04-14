Value not selected

```js
<PopupField placeHolder="To where?" fieldLabel="To" Icon={PinIcon}>
  {({ closePopup }) => <Button onClick={closePopup} label="Close Popup" />}
</PopupField>
```

Value selected

```js
<PopupField
  placeHolder="To where?"
  fieldLabel="To"
  values={[{ large: 'SYD', small: 'Sydney Kingsford Smith (SYD), Australia' }]}
>
  {({ closePopup }) => <Button onClick={closePopup} label="Close Popup" />}
</PopupField>
```

Two values selected

```js
<PopupField
  placeHolder="When?"
  fieldLabel="When"
  values={[
    { large: '20', small: 'Tue, May 2019' },
    { large: '30', small: 'Fri, May 2019' }
  ]}
>
  {({ closePopup }) => <Button onClick={closePopup} label="Close Popup" />}
</PopupField>
```
