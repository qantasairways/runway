`Input` provides a styled `input` element. You can add attributes to the `input` element by passing them as props.

```jsx
<Input />
```

```jsx
<Input
  hasError={true}
  ref={element => {
    this.businessNameElement = element;
  }}
  name="businessName"
/>
```

### Using in a form with [`FormField`](/#/Components?id=formfield) and `react-hooks-form`

```jsx static
<FormField
  label="Business name*"
  errorMessage={errors.businessName?.message}
  component={
    <Input
      name="businessName"
      ref={register({ required: 'Enter a business name.' })}
    />
  }
/>
```
