import { combineReducers, createStore } from "redux";
import { EventsReducer } from "./eventState";

// Single object containing all reducers:
const reducers = combineReducers({
    eventsState: EventsReducer,
});

const store = createStore(reducers);

export default store;