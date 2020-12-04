/* Import mongoose and define any variables needed to create the schema */
import mongoose from 'mongoose';


const DrillRigSchema = new mongoose.Schema({
    /* Your code for a schema here */
    //Check out - https://mongoosejs.com/docs/guide.html

    //RHT == Rotary head travel (found in Rig spec page in excel sheet)
   //RPD == Rig PullDown
    Model: String,
    PipeSize: [Number],
    PipeWeight: [Number],
    RHT_SinglePass: mongoose.Types.Decimal128,
    RHT_PipeLength: mongoose.Types.Decimal128,
    RHT_LoaderCap: Number,
    RHT_FeedRate: Number,
    RHT_HoistRate: Number,
    RHT_AddPipe: mongoose.Types.Decimal128,
    RHT_SetUp: mongoose.Types.Decimal128, 
    RPD_RHWeight: Number, 
    RPD_MaxPulldown: Number,
    RPD_MaxFeedPressure: Number,
    Rotary_BitSize: [Number], 
    Comp: [Number], 
    HP_Comp:[Number], 
    HP_CompPressure:[Number],
    FuelTank_Vol : Number,
    Engine: [{
        name: String,
        Fuel_BurnRate: Number,
        Fuel_V_Life: Number,
        Nominal_HP: Number
    }],
    DTH_Hammer:[{
        Model: String,
        Sizes: [Number],
        ROP_Factor: [Number]
    }]
    
});



/* Use your schema to instantiate a Mongoose model
Export the model to make it available to other parts of your Node application */
//Check out - https://mongoosejs.com/docs/guide.html#models
export default mongoose.model('DrillRigs', DrillRigSchema);