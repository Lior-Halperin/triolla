import mongoose from "mongoose";

// 1. Model interface describing the data:
export interface IEvent extends mongoose.Document {
  // No need to specify _id - Primary Key
  title: string;
  description: string;
  dateAndTime: Date;
  location: string;
}

// 2. Model schema describing more things about the model:
export const EventSchema = new mongoose.Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Missing title"],
      minlength: [2, "Title too short"],
      maxlength: [30, "Title too long"],
      trim: true, // Removes whitespace from the beginning and end of the string.
      unique: true,
      validate: [/[a-z]/, "Name must contain only English letters"],
    },
    description: {
        type: String,
        required: [true, "Missing description"],
        minlength: [10, "Description too short"],
        maxlength: [30, "Description too long"],
        trim: true, // Removes whitespace from the beginning and end of the string.
        validate: [/[a-z]/, "Name must contain only English letters"],
      },
      dateAndTime: {
        type: Date,
        required: [true, "Missing date and time"],
      },
      location: {
        type: String,
        required: [true, "Missing location"],
        minlength: [10, "Location too short"],
        maxlength: [30, "Location too long"],
        trim: true, // Removes whitespace from the beginning and end of the string.
      },
  },
  {
    versionKey: false, // Don't add __v field
    toJSON: { virtuals: true }, // Allow to convert virtual fields to JSON
    id: false, // Don't add additional id field
  }
);

// 3. Model class which mongoose create for us:
export const EventModel = mongoose.model<IEvent>(
  "EventModel",
  EventSchema,
  "events"
); // (Name of the model, The schema to build the model from, Which collection should be addressed in the data base)
