import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
  return (
    <div>
        <FullCalendar
         plugins={[dayGridPlugin,interactionPlugin, timeGridPlugin]}
         headerToolbar={{
            start:"today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        locale='es'
        nowIndicator= {true}
        />
    </div>
  )
}