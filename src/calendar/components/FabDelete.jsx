import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {
  const { hasEventSelected, startDeletingEvent } = useCalendarStore()

  return (
    <button
      aria-label="btn-delete"
      className="btn btn-danger fab-danger"
      onClick={ startDeletingEvent }
      style={{
        display: hasEventSelected ? '' : 'none'
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
