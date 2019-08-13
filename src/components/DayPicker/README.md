```js
const disabledBefore = new Date();
const today = new Date();

<StatefulManager initial>
  {({ value, updater }) => (
    <DayPicker
      startDate={value.startDate}
      endDate={value.endDate}
      disabledBefore={disabledBefore}
      disabledAfter={
        new Date(
          disabledBefore.getFullYear(),
          disabledBefore.getMonth(),
          disabledBefore.getDate() + 60
        )
      }
      firstDayOfWeek={1}
      monthsToShow={3}
      startSelectedLabel="SYD"
      endSelectedLabel="MEL"
      Icon={PlaneIcon}
      onDayClick={(startDate, endDate) => updater({ startDate, endDate })}
      isDateRange={false}
      hasPrice={true}
      priceInPoints={true}
      preFooterInfo="Lowest economy price per adult in AUD for a return trip."
      disclaimerMessage="Please read and agree to the terms and conditions."
    />
  )}
</StatefulManager>;
```
