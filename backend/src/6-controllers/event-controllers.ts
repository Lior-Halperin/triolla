import express, { NextFunction, Request, Response } from "express";
import { EventModel } from "../4-models/event-model";
import logic from "../5-logic/event-logic";

const router = express.Router();

// GET http://localhost:3001/api/event
router.get("/event", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const event  = await logic.getAllEvent ();

        response.json(event );
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/event /5e91e29b9c08fc560ce2cf3a
router.get("/event/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const event  = await logic.getOneEvent(_id);
        response.json(event );
    }
    catch (err: any) {
        next(err);
    }
});


// POST http://localhost:3001/api/event 
router.post("/event", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const event  = new EventModel(request.body);
        const addedEvent  = await logic.addEvent(event);
        response.status(201).json(addedEvent);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:3002/api/event/7 <-- id
router.put("/event/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params._id;
        const event  = new EventModel(request.body);
        const updatedEvent = await logic.updateFullEvent(event,id);
        response.json(updatedEvent);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3002/api/event/7 <-- id
router.delete("/event/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params._id;
        await logic.deleteEvent(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }

});




export default router; 