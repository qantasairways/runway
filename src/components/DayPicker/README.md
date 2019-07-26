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
      isDateRange={true}
      hasPrice={true}
      priceInPoints={false}
      preFooterInfo="Lowest economy price per adult in AUD for a return trip."
      endDateData={{
        price: {
          value: 15127.5,
          isLowestPrice: false,
          points: 10200,
          isClassic: false
        },
        currencySymbol: '$'
      }}
      transformDatesData={arg => {
        return arg.map((date, i) => {
          if (i === 5) {
            console.log(date);
            return {
              ...date,
              currencyCode: 'AUD',
              currencySymbol: '$',
              price: {
                isClassic: true,
                isLowestPrice: true,
                points: 19100,
                taxValue: 29.98,
                value: 126.5
              }
            };
          }
          if (i === 6) {
            console.log(date);
            return {
              ...date,
              currencyCode: 'AUD',
              currencySymbol: '$',
              price: {
                isClassic: null,
                isLowestPrice: true,
                points: 19100,
                taxValue: null,
                value: 126.5
              }
            };
          }
          return date;
        });
      }}
      disclaimerMessage="Please read and agree to the terms and conditions."
    />
  )}
</StatefulManager>;
```
