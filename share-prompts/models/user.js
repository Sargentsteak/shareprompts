import { Schema,model, models } from "mongoose";


//The "models object us provided by the Mongoose library and stores all the registered models.If a model named"User already exists in the "models" object, it assigna that existing model to the "User" variable.
//This prevents redefining the model and ensures that the existing model uis resued.

//If a model named "User" does not exist in the "models" object , the "model funciton" from the mongoose is called to create a new model
//the newly created model is tehn assigned to the "User" variable

const UserSchema = new Schema({
    email:{
        type:String,
        unique:[true,'Email is required'],
        required:[true, "Email is required"]
    },
    username:{
        type : String,
        required:[true,"Username already exist"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image:{
        type:String
    }
});

const User = models.User || ("User",UserSchema);

export default User;