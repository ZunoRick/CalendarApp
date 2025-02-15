import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { localizer, getMessagesES } from '../../helpers'
import { useUiStore, useCalendarStore } from '../../hooks'

export const CalendarPage = () => {

  const { events, setActiveEvent } = useCalendarStore()
  const { openDateModal } = useUiStore()

  const [currentView, setCurrentView] = useState(localStorage.getItem('lastView') || 'week')
  const [currentDate, setCurrentDate] = useState(new Date())

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected });
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onSelect = (event) => {
    // console.log ({ click: event });
    setActiveEvent(event)
  }

  const onViewChanged = (event) => {
    setCurrentView(event)
    localStorage.setItem('lastView', event)
  }

  return (
    <>
      <Navbar/>

      <div>
        <Calendar
          culture='es'
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          view={currentView}
          onView={onViewChanged}
          onNavigate={ setCurrentDate }
          style={{ height: 'calc(100vh - 80px)', width: '100%' }}
          messages={getMessagesES()}
          eventPropGetter={ eventStyleGetter }
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={ openDateModal }
          onSelectEvent={ onSelect }
        />
      </div>

      <CalendarModal/>

      <FabAddNew/>

      <FabDelete/>
    </>
  )
}
