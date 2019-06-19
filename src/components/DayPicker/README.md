```js
const disabledBefore = new Date();
const today = new Date();

const onMonthsShown = ({ startMonthDate, endMonthDate }) => {
  console.group('onMonthsShown');
  console.log('startMonthDate', startMonthDate);
  console.log('endMonthDate', endMonthDate);
  console.groupEnd('onMonthsShown');
};

const transformDatesData = monthDatesData =>
  monthDatesData.map(dateData => ({
    ...dateData,
    isGoodDay: dateData.date > today
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
      monthsToShow={12}
      startSelectedLabel="SYD"
      endSelectedLabel="MEL"
      Icon={PlaneIcon}
      onDayClick={(startDate, endDate) => updater({ startDate, endDate })}
      configOnMonthsShownSubscription={{
        enabledsOnly: true,
        onMonthsShown: onMonthsShown
      }}
      transformDatesData={transformDatesData}
      isDateRange={true}
      hasPrice={true}
      preFooterInfo="Lowest economy price per adult in AUD for a return trip."
      endDateData={{
        price: { value: '15127.5', isLowestPrice: false },
        currencySymbol: ' $'
      }}
    />
  )}
</StatefulManager>;
```
