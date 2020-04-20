`FormField` simplifies creating form fields with labels and error messages. It accepts a `component` property, which can be either an `Input`, `Textarea`, or `SelectNew` component, and then adds `hasError`, `id`, `aria-describedby`, and `aria-invalid` props to it. It renders a label above the component and an optional error message below it, both of which are linked to the component using generated IDs.

### Without using `FormField`

```html
<div>
  <label htmlFor="myInput">Business name*</label>
  <input
    id="myInput"
    aria-describedby="myInputError"
    aria-invalid="{!!state.errorMessage}"
  />
  <div role="alert">
    {state.errorMessage &&
    <FormFieldError id="myInputError">{state.errorMessage}</FormFieldError>}
  </div>
</div>
```

### Using `FormField`

```html
<FormField
  label="Business name*"
  errorMessage="{state.errorMessage}"
  component="{<Input"
/>} />
```

```jsx
<FormField label="Business name*" component={<Input />} />
```

```jsx
<FormField
  label="Business name*"
  errorMessage="Business name is required."
  component={<Input />}
/>
```

### Using `FormField` in a form with [`Input`](/#/Components?id=input) and `react-hooks-form`

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

### Using `FormField` in a form with [`Textarea`](/#/Components?id=textarea) and `react-hooks-form`

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

### Using `FormField` in a form with [`SelectNew`](/#/Components?id=selectnew) and `react-hooks-form`

```jsx static
<FormField
  label="What area is your enquiry about?*"
  errorMessage={errors.enquiryType?.message}
  component={
    <SelectNew required name="enquiryType" ref={register({ required: "Select an enquiry type." }}>
      <option disabled selected value="">Select area of enquiry</option>
      <option value="ME">Member enrolment</option>
      <option value="AC">Managing My Account</option>
    </SelectNew>
  }
/>
```
