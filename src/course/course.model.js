import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
},
{
    versionKey: false,
    timeStamps: true
})

export default mongoose.model("Course", CourseSchema);
