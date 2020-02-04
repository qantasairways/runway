`Textarea` provides a styled `textarea` element. You can add attributes to the `textarea` element by passing them as props.

```jsx
<Textarea />
```

```jsx
<Textarea
  hasError={true}
  ref={element => {
    this.businessNameElement = element;
  }}
  aria-invalid="true"
/>
```

### Using in a form with [`FormField`](/#/Components?id=formfield) and `react-hooks-form`

```jsx static
<FormField
  label="Enquiry*"
  errorMessage={errors.enquiry?.message}
  component={
    <Textarea
      name="enquiry"
      ref={register({ required: 'Enter an enquiry.' })}
    />
  }
/>
```
