`SelectNew` provides a styled `<select>` element. You can add attributes to the `select` element by passing them as props and you can pass in `option` elements as children.

```jsx
<SelectNew required name="enquiryReason">
  <option disabled selected value="">
    Select area of enquiry
  </option>
  <option value="ME">Member enrolment</option>
  <option value="AC">Managing My Account</option>
</SelectNew>
```

```jsx
<SelectNew required name="enquiryReason" hasError={true}>
  <option disabled selected value="">
    Select area of enquiry
  </option>
  <option value="ME">Member enrolment</option>
  <option value="AC">Managing My Account</option>
</SelectNew>
```

### Using in a form with [`FormField`](/#/Components?id=formfield) and `react-hooks-form`

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
