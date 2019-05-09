/* eslint-disable */
import React, { Component } from 'react';
import CalendarHeader from './components/CalendarHeader';

class Calendar extends Component {
  render = () => {
    return (
      <div>
        <CalendarHeader {...this.props} />
      </div>
    );
  };
}

export default Calendar;
