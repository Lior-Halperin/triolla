import {IEventModel} from "../Models/eventModel";

// 1. State - The global state relate to Events
export class EventState {

    public events: IEventModel[] = []; // Initializes to an empty array at first avoid malfunctions 

}

// // 2. Action Type - list of actions we can do on the above EventState:
export enum EventsActionType {
    FetchEvents = "FetchEvents", // Bring the Events
    AddEvent = "AddEvent",
    UpdateEvent = "UpdateEvent",
    DeleteEvent = "DeleteEvent",
}

// 3. Action - interface for building a single action from above EventsActionType
export interface EventAction {
    type: EventsActionType; // The type of the acton to perform.
    payload: any; // The data we need to do that action.
}

// 4. Action Creators - Functions for creating suitable Action objects: 

export function fetchEventAction(Event: IEventModel[]): EventAction {
    const action: EventAction = { type: EventsActionType.FetchEvents, payload: Event }
    return action
}

export function addEventAction(Event: IEventModel): EventAction {
    const action: EventAction = { type: EventsActionType.AddEvent, payload: Event }
    return action
}

export function updateEventAction(Event: IEventModel): EventAction {
    const action: EventAction = { type: EventsActionType.UpdateEvent, payload: Event }
    return action
}

export function deleteEventAction(id: number): EventAction {
    const action: EventAction = { type: EventsActionType.DeleteEvent, payload: id }
    return action
}



// 5. Reducer - Do any of the above actions:
export function EventsReducer(currentState: EventState = new EventState(), action: EventAction) {
    const newState = { ...currentState };

    switch (action.type) {

        case EventsActionType.FetchEvents:
            newState.events = action.payload; // <-- here payload is all Event
            break;

        case EventsActionType.AddEvent:
            newState.events.push(action.payload); // <-- here payload is the Event to add.
            break;

        case EventsActionType.UpdateEvent:
            const indexToUpdate = newState.events.findIndex(e => e._id === action.payload.id); // <-- here payload is the Event to update.
            if(indexToUpdate >= 0){
                newState.events[indexToUpdate] = action.payload;
            }
            break;

        case EventsActionType.DeleteEvent:
            const indexToDelete = newState.events.findIndex( e => e._id === action.payload);
            if(indexToDelete >= 0){
                newState.events.splice(indexToDelete,1)
            }
            break;

    }

    return newState;
}