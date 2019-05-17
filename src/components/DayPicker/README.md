```js
const disabledBefore = new Date();
const today = new Date();

const onMonthsShown = ({ startMonthDate, endMonthDate }) => {
  console.group('onMonthsShown');
  console.log('startMonthDate', startMonthDate);
  console.log('endMonthDate', endMonthDate);
  console.groupEnd('onMonthsShown');
}

const transformDatesData = (monthDatesData) => monthDatesData.map(dateData => ({
  ...dateData,
  isGoodDay: dateData.date > tday
}));

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
      configOnMonthsShownSubscription={{
        enabledsOnly: true,
        onMonthsShown: onMonthsShown
      }}
      transformDatesData={transformDatesData}
    />
  )}
</StatefulManager>;
```
