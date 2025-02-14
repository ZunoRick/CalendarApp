import { useState } from 'react'
import { Calendar, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'
import { CalendarEvent, Navbar } from "../"
import { localizer, getMessagesES } from '../../helpers'

const events = [{
  title: 'CUmpleaños del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Ricardo'
  }
}]

export const CalendarPage = () => {
  const [language, setLanguage] = useState(false)
  const [currentView, setCurrentView] = useState(localStorage.getItem('lastView') || 'week')
  const [currentDate, setCurrentDate] = useState(new Date())

  const onChangeLanguage = () => {
    setLanguage(current => !current)
  }

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

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
    
  }

  const onSelect = (event) => {
    console.log ({ click: event });
    
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
          culture={ language || 'es' }
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
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
        />
      </div>
    </>
  )
}
