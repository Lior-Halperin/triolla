import { ResourceNotFoundError, UnauthorizedError, ValidationError } from "../4-models/error-models";
import { IEvent, EventModel } from "../4-models/event-model";

// Get all event reserves:
async function getAllEvent(): Promise<IEvent[]> {
  try {
    return await EventModel.find().exec();
  } catch (error) {
    // Todo: error
    throw error;
  }
}

// Get one event reserve by _id:
async function getOneEvent(_id: string): Promise<IEvent> {
  const event = await EventModel.findById(_id).exec();
  if (!event) {
    throw new ResourceNotFoundError(`Event with ID ${_id} not found.`);
  }
  return event;
}

// Add new event reserve:
async function addEvent(event: IEvent): Promise<IEvent> {
  try {
    const existingEvent = await EventModel.findOne({ name: event.title }).exec();
    if (existingEvent) {
      throw new UnauthorizedError("This title is already taken. Please select another.");
    }
    
    // Mongoose model handles validation internally or via a pre-save hook.
    return await event.save();
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ValidationError(error.message);
    }
    throw error;
  }
}

async function updateFullEvent(event: IEvent, id: string): Promise<IEvent>{

    const UpdatedEvent = await EventModel.findByIdAndUpdate(id, event, {
        new: true, // return the updated object
      });
  
      if (!event) {
        throw new ResourceNotFoundError(`Event with ID ${id} not found.`);
      }
      return UpdatedEvent;
}

async function deleteEvent(id:string): Promise<void> {
    
    const event = await EventModel.findByIdAndDelete(id);

    if (!event) {
        throw new ResourceNotFoundError(`Event with ID ${id} not found.`);
    }
}
export default {
getAllEvent,
getOneEvent, 
addEvent,
updateFullEvent,
deleteEvent
};
