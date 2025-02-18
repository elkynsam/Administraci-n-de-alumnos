import Course from "./course.model.js";

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("teacher", "name").populate("students", "name");

        return res.status(200).json({
            message: "Cursos disponibles",
            courses
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al obtener cursos",
            error: err.message
        });
    }
};
