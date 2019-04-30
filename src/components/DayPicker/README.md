```js
const startDate = new Date();
const endDate = new Date(
  startDate.getFullYear(),
  startDate.getMonth(),
  startDate.getDate() + 7
);
const disabledAfter = new Date(
  startDate.getFullYear(),
  startDate.getMonth(),
  startDate.getDate() + 60
);

<DayPicker
  start={startDate}
  end={endDate}
  disabledBefore={startDate}
  disabledAfter={disabledAfter}
  firstDayOfWeek={1}
  monthsToShow={3}
  label="When"
  placeHolder="When?"
  headerLabel="Select Dates"
  startLabel="SYD"
  endLabel="MEL"
  Icon={PlaneIcon}
  dayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
  monthLabels={[
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]}
/>;
```
