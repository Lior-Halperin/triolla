import {
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../4-models/error-models";
import { IEvent, EventModel } from "../4-models/event-model";
import PaginationRequestModel from "../4-models/pagination-request-model";
import { PaginationResponseModel } from "../4-models/pagination-response-model";

// Get all event reserves:
async function getAllEvent(): Promise<IEvent[]> {
  // Todo: Pagination
  return await EventModel.find().exec();
}

// Get all event reserves:
async function getEventUsePagination(details: PaginationRequestModel): Promise<PaginationResponseModel> {
  try {

    // Fetch paginated list of events
    const events = await EventModel.find().skip(details.skip).limit(details.limit);

    // Optional: Get total count of documents for pagination meta
    const totalEvents = await EventModel.countDocuments();
   
    const response:PaginationResponseModel = {data:events, total: totalEvents, page:details.skip, per_page:details.limit} 
   
    return response
 
} catch (err: any) {
    throw err;
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
    const existingEvent = await EventModel.findOne({
      name: event.title,
    }).exec();
    if (existingEvent) {
      throw new UnauthorizedError(
        "This title is already taken. Please select another."
      );
    }

    // Mongoose model handles validation internally or via a pre-save hook.
    return await event.save();
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new ValidationError(error.message);
    }
    throw error;
  }
}

async function updateFullEvent(event: IEvent, id: string): Promise<IEvent> {
  const UpdatedEvent = await EventModel.findByIdAndUpdate(id, event, {
    new: true, // return the updated object
  });

  if (!event) {
    throw new ResourceNotFoundError(`Event with ID ${id} not found.`);
  }
  return UpdatedEvent;
}

async function deleteEvent(id: string): Promise<void> {
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
  deleteEvent,
  getEventUsePagination,
};
