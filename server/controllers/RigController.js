/* Dependencies */
const DrillRig = require('../models/DrillRigModel.js');
//import DrillRig from "../models/DrillRigModel.js";
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update football clubs.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the football club as JSON in the response.

  HINT: if you are struggling with implementing these functions refer back to this tutorial 
  https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
  or
  https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d
  

  If you are looking for more understanding of exports and export modules - 
  https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
  or
  https://medium.com/@etherealm/named-export-vs-default-export-in-es6-affb483a0910
 */

/* Create a drill rig*/
module.exports.create = async (req, res) => {
  /* get the drill rig data from req.body */
  /* Then save the drillrill to the database */
  const drillRig = req.body;
  if (!drillRig) {
    return res.status(200).send({
      error: "Drill Rig not found",
    });
  }
  await new DrillRig(drillRig)
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(200).send(err);
    });
};

/* Show the current drill rig */
module.exports.read = async (req, res) => {
  /*get the drill rig id from the req.params */
  /* send back the drill rig data as json from the request */
  /* If the drill rig data could not be found, be sure to send back a response in the following format: {error: 'Some message that indicates an error'} */
  let id = req.params.DrillId;
  await DrillRig.findById(id)
    .then((drillRig) => {
      if (!drillRig) {
        return res.status(200).send({
          error: "Drill Rig not found with an Id " + id,
        });
      }
      res.json(drillRig);
    })
    .catch((err) => {
      res.status(200).send({
        error: err.message || "An unknown error has occurred.",
      });
    });
};

/* Update a Drill Rig - note the order in which this function is called by the router*/
module.exports.update = async (req, res) => {
  /*get both the football club id and new data from the request */
  /* Replace the FootballClubs's properties which is in the database with the new properties found in what the new data */
  /* Save the FootballClub */
  const drillRig = req.body;
  const id = req.params.DrillId;
  if (!drillRig) {
    return res.status(200).send({
      error: "Drill Rig not found",
    });
  }

  await DrillRig.findById(id)
    .then((data) => {
      if(drillRig.Model){
        data.Model = drillRig.Model;
      }
      if(drillRig.PipeSize){
      data.PipeSize = drillRig.PipeSize;
      }
      if(drillRig.PipeWeight){
        data.PipeWeight = drillRig.PipeWeight;
      }
      if(drillRig.RHT_SinglePass){
        data.RHT_SinglePass = drillRig.RHT_SinglePass;
      }
      if(drillRig.RHT_PipeLength){
        data.RHT_PipeLength = drillRig.RHT_PipeLength;
      }
      if(drillRig.RHT_LoaderCap){
        data.RHT_LoaderCap = drillRig.RHT_LoaderCap;
      }
      if(drillRig.RHT_FeedRate){
        data.RHT_FeedRate = drillRig.RHT_FeedRate;
      }
      if(drillRig.RHT_HoistRate){
        data.RHT_HoistRate = drillRig.RHT_HoistRate;
      }
      if(drillRig.RHT_AddPipe){
        data.RHT_AddPipe = drillRig.RHT_AddPipe;
      }
      if(drillRig.RHT_SetUp){
        data.RHT_SetUp = drillRig.RHT_SetUp;
      }
      if(drillRig.RPD_RHWeight){
        data.RPD_RHWeight = drillRig.RPD_RHWeight;
      }
      if(drillRig.RPD_MaxPulldown){
        data.RPD_MaxPulldown = drillRig.RPD_MaxPulldown;
      }
      if(drillRig.RPD_MaxFeedPressure){
        data.RPD_MaxFeedPressure = drillRig.RPD_MaxFeedPressure;
      }
      if(drillRig.Rotary_BitSize){
        data.Rotary_BitSize = drillRig.Rotary_BitSize;
      }
      if(drillRig.Comp){
        data.Comp = drillRig.Comp;
      }
      if(drillRig.HP_Comp){
        data.HP_Comp = drillRig.HP_Comp;
      }
      if(drillRig.HP_CompPressure){
        data.HP_CompPressure = drillRig.HP_CompPressure;
      }
      if(drillRig.FuelTank_Vol){
        data.FuelTank_Vol = drillRig.FuelTank_Vol;
      }
      if(drillRig.Engine){
        data.Engine = drillRig.Engine;
      }
      if(drillRig.DTH_Hammer){
        data.DTH_Hammer= drillRig.DTH_Hammer;
      }
      

      data
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(200).send({
            error: err.message || "An unknown error has occurred.",
          });
        });
    })
    .catch((err) => {
      res.status(200).send({
        error: err.message || "An unknown error has occurred.",
      });
    });
};

/* Delete a Drill Rig */
module.exports.remove = async (req, res) => {
  
  /* If the Drill Rig could not be found, be sure to send back a response in the following format: {error: 'Some message that indicates an error'} */
  let id = req.params.DrillId;

  await DrillRig.deleteOne({_id: id}, (err) => {
    if (err) {
      return res.status(200).send({
        error: err.message || "An unknown error occurred",
      });
    }
    res.send({
      error: id + " has been deleted successfully",
    });
  });
};

/* Retrieve all the directory, DrillRig*/
module.exports.getAllDrillRigs = async (req, res) => {
  /* Add your code. Make sure to send the documents as a JSON response.*/
  await DrillRig.find({}, (err, data) => {
    if (err)
      return res.status(200).send({
        message: err.message || "An unknown error occurred",
      });
    res.json(data);
  });
};

