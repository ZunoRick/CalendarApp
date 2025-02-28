import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { localizer, getMessagesES } from '../../helpers'
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks'

export const CalendarPage = () => {

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const { user } = useAuthStore()
  const { openDateModal } = useUiStore()

  const [currentView, setCurrentView] = useState(localStorage.getItem('lastView') || 'week')
  const [currentDate, setCurrentDate] = useState(new Date())

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected });
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid) 

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
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

  useEffect(() => {
    startLoadingEvents()
  }, [])

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
