import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../views/CalendarioEstilos.css';

function CalendarView() {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) =>{
        setDate(newDate);
    }

    return(
        <div className="flex flex-1 justify-items-center">
            <Calendar onChange={onChange} value={date} />
        </div>
        
        );

};

export default CalendarView;