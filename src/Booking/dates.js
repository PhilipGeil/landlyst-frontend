import React, { useEffect, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import './Booking.css'

const StaticDatePicker = (props) => {
  const [startDate, changeStartDate] = useState(new Date(Date.now()));
  const [endDate, changeEndDate] = useState(new Date(Date.now()));

  useEffect(() => {
    console.log(props)
    let myStorage = window.localStorage;
    myStorage.removeItem("dates")
    let start 
    let end
    if (props.dates === null || props.dates === undefined) {
      start = new Date(Date.now());
      end = new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 7);
    } else {
      start = new Date(props.dates.start_date)
      end = new Date(props.dates.end_date)
    }
    changeStartDate(start);
    changeEndDate(end);
    props.setDates({
      start_date: new Date(start),
      end_date: new Date(end)
    })

    let summary = document.getElementById("summary")
    summary.style.display = 'none';

  }, [])

  var dates = {
    start_date: startDate,
    end_date: endDate,
  }

  const setStartDate = (date) => {
    let myStorage = window.localStorage;
    dates.start_date = date;
    myStorage.setItem("dates", JSON.stringify(dates))
    changeStartDate(date)
    props.setDates(dates)

    let tempDate = new Date(endDate)

    console.log(tempDate.valueOf())
    console.log(date.valueOf())

    if (tempDate.valueOf() <= date.valueOf()) {
      let addedDate = new Date(date);
      console.log(addedDate)
      addedDate = addedDate.setDate(date.getDate() + 1)
      console.log(new Date(addedDate))
      dates.end_date = new Date(addedDate)
      changeEndDate(addedDate)
      props.setDates(dates)
      myStorage.setItem("dates", JSON.stringify(dates))
    }
  }

  const setEndDate = (date) => {
    let myStorage = window.localStorage;
    dates.end_date = date;
    myStorage.setItem("dates", JSON.stringify(dates))
    changeEndDate(date)
    props.setDates(dates)
  }

  // prettier-ignore
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="dates">
        <div className="datePicker">
          <h1>Check ind</h1>
          <DatePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="date"
            value={startDate}
            onChange={setStartDate}
            
          />
        </div>
        <div className="datePicker">
          <h1>Check ud</h1>
          <DatePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="date"
            value={endDate}
            onChange={setEndDate}
          />
        </div>
      </div>
    </MuiPickersUtilsProvider >
  );
};

export default StaticDatePicker;