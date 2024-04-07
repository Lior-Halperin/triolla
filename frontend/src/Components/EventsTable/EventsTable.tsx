import {IEventModel} from "../../Models/eventModel";
import { useState, useEffect, useMemo } from "react";
import {
  StyledWrapper,
  StyleTableRow,
  StyledTable,
  StyledTableData,
  StyledTableHeader,
} from "./EventsTable.styled";

function EventsTable({ events }: { events: IEventModel[] }): JSX.Element {

    
  const [eventsState, setEventsState] = useState<IEventModel[]>(events);

  useEffect(() => {
    setEventsState(events);
  }, [events]);

  /* Memoization of Table Headers: useMemo is used to memoize the computation of tableHeaders,
   improving performance by avoiding unnecessary recalculations on re-renders.*/
  const tableHeaders = useMemo(() => (eventsState.length > 0 ? Object.keys(eventsState[0]) : []), [eventsState]);

  if (eventsState.length === 0) {
    return <StyledWrapper>Loading events...</StyledWrapper>;
  }

  return (
    <StyledWrapper className="events-table">
      <StyledTable>
        {/* todo */}
        <thead> 
          <StyleTableRow>
            {tableHeaders.map((header) => (
              <StyledTableHeader key={header}>{header}</StyledTableHeader>
            ))}
          </StyleTableRow>
        </thead>
        <tbody>
          {eventsState.map((event, index) => (
            <StyleTableRow key={event._id || index}>
              {tableHeaders.map((header) => (
                <StyledTableData key={`${event._id}-${header}`}>
                  {event[header as keyof IEventModel]}
                </StyledTableData>
              ))}
            </StyleTableRow>
          ))}
        </tbody>
      </StyledTable>
    </StyledWrapper>
  );
}

export default EventsTable;
