import {Schema, model} from "mongoose";

const studentSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength:[25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Name is required"],
        maxLength:[25, "Name cannot exceed 25 characters"]
    },
    username:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    profilePicture:{
        type: String,
    },
    phone:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 8
    },
    role:{
        type: String,
        required: true,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"],
        default: "STUDENT_ROLE"
    },
    status:{
        type: Boolean,
        default: true
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }]
},
{
    versionKey: false,
    timeStamps: true
})

studentSchema.methods.toJSON = function(){
    const { password, _id, ...student } = this.toObject()
    student.uid = _id
    return student
}

export default model("Student", studentSchema)