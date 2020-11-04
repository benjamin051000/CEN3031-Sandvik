/* Import mongoose and define any variables needed to create the schema */
import mongoose from 'mongoose';


const DrillRigSchema = new mongoose.Schema({
    /* Your code for a schema here */
    //Check out - https://mongoosejs.com/docs/guide.html

    //RHT == Rotary head travel (found in Rig spec page in excel sheet)
   //RPD == Rig PullDown
    Model: { type: String, required: true },
    PipeSize:{type: [Number], required: true},
    PipeWeight:{type: [Number], required: true},
    RHT_SinglePass:{type: mongoose.Types.Decimal128 , required: true},
    RHT_PipeLength:{type: mongoose.Types.Decimal128 , required: true},
    RHT_LoaderCap:{type: Number , required: true},
    RHT_FeedRate:{type: Number, required: true},
    RHT_HoistRate:{type: Number, required: true},
    RHT_AddPipe:{type: mongoose.Types.Decimal128, required: true},
    RHT_SetUp:{type: mongoose.Types.Decimal128, required: true},
    RPD_RHWeight:{type: Number, required: true},
    RPD_MaxPulldown:{type: Number, required: true},
    RPD_MaxFeedPressure:{type: Number, required: true},
    //UNKNOWN_DATA:{type: ????, required, true}, found in Rig spec page
    Rotary_BitSize:{type: [Number], required: true},
    //UNKNOWN_DATA:{type: ????, required, true}, found in rotary page
    HP_Comp:{type: [Number], required: false},
    HP_CompPressure:{type: [Number], required: false},
    DTH_HammerModel:{type:String, required: false},
    DTH_HammerSize:{type: [Number],required: false},
    
    //maybe more labels???

});



/* Use your schema to instantiate a Mongoose model
Export the model to make it available to other parts of your Node application */
//Check out - https://mongoosejs.com/docs/guide.html#models
export default mongoose.model('DrillRigs', DrillRigSchema);