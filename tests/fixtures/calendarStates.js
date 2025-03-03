export const events = [
  {
    id: 1,
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date('2025-03-03 10:00:00'),
    end: new Date('2025-03-03 12:00:00'),
  },
  {
    id: 2,
    title: 'Cumpleaños de Melisa',
    notes: 'Alguna nota de Melisa',
    start: new Date('2025-03-03 10:00:00'),
    end: new Date('2025-03-03 12:00:00'),
  },
]

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
}

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
}

export const calendarWithActiveEventState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: { ...events[0] },
}