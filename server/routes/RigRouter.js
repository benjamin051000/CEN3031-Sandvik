/* This file is your server footballClubRouter. 
   Trace the dependencies so you understand which files are connected and how data is passed between them
   For each route, make note of the sequence of requests called for each

*/

import * as RigController from "../controllers/RigController.js";
import express from "express"; //refers to Express the middleware helper for Node.js
const RigRouter = express.Router();
/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 
  Note: the RigController variable above and the file it is connected to help you trace
 */
RigRouter.get("/", RigController.getAllDrillRigs);
RigRouter.post("/", RigController.create);

/*
  The ':' specifies a URL parameter. 
  Also, it allows the passing of data which is stored in req.params in the controller
 */
RigRouter.get("/:DrillId", RigController.read);
RigRouter.put("/:DrillId", RigController.update);
RigRouter.delete("/:DrillId", RigController.remove);

export default RigRouter;