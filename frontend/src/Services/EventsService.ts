import axios from "axios";
import store from "../Redux/store";
import { addEventAction, fetchEventAction } from "../Redux/eventState";
import config from "../Utils/Config";
import { IEventModel } from "../Models/eventModel";

class EventsService {

  public async getAllEvents(): Promise<IEventModel[]> {
    try {
      let events: IEventModel[] = store.getState().eventsState.events; // first get from redux
      if (events.length === 0) {
        const response = await axios.get<IEventModel[]>(config.eventsURL);

        events = response.data;
        store.dispatch(fetchEventAction(events));
      }
      return events;
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  }

  // Add new event:
  public async addEvent(event: IEventModel): Promise<IEventModel> {
    try {

      const response = await axios.post<IEventModel>(
        config.eventsURL,
        event
      );
      
      const addedEvent = response.data;

      store.dispatch(addEventAction(addedEvent)); // Add to Redux

      return addedEvent;
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  }
}
const eventsService = new EventsService();

export default eventsService;
