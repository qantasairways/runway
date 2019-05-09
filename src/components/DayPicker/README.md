```js
const disabledBefore = new Date();

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
    />
  )}
</StatefulManager>;
```
