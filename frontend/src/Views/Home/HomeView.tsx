import { useEffect, useMemo, useState } from "react";
import { StyledWrapper } from "./HomeView.Styled";
import { IEventModel } from "../../Models/eventModel";
import EventsTable from "../../Components/EventsTable/EventsTable";
import eventsService from "../../Services/EventsService";
import AddEventView from "../../Components/AddEvent/AddEvent";
import NavBar from "../../Components/NavBar/NavBar";

function HomeView(): JSX.Element {
    
    const navLinks = [
        { path: "/", namePage: "Dashboard" },
      ];
    
    const [events, setEvents] = useState<IEventModel[]>([])

    useEffect(()=>{
        eventsService.getAllEvents().then(addEvent=>{
            setEvents(addEvent)
        })
    },[])

  return (
    <StyledWrapper>
        <NavBar links={navLinks} />
        <EventsTable events={events}/>
        <AddEventView />
    </StyledWrapper>
  );
}
export default HomeView;
