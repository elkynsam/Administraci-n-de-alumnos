import { hash, verify } from "argon2"
import Student from "./student.model.js"
import Course from "../course/course.model.js"
import { uploadProfilePicture } from "../middlewares/multer-upload.js";

export const getStudentById = async(req, res) => {
    try{
        const { uid } = req.params
        const student = await Student.findById(uid)

        if(!student){
            return res.status(404).json({
                success: false,
                message: "Estudiante no existe",
                error: err.message
            })
        }

        return res.status(200).json({
            success: true,
            student
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el estudiante",
            error: err.message
        })
    }
}

export const getStudents = async(req, res) => {
    try{
        const { limits = 3, from = 0} = req.query
        const query = {status: true}

        const [ total, students ] = await Promise.all([
            Student.countDocuments(query),
            Student.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            students
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar los estudiantes",
            error: err.message
        })
    }
}

export const deleteStudent = async (req, res) => {
    try{
        const { uid } = req. params

        const student =  await Student.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Estudiante Eliminado",
            student
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el estudiante",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword } =  req.body

        const student = await Student.findById(uid)

        const matchPassword = await verify(student.password, newPassword)

        if(matchPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }
        
        const encryptedPassword = await hash(newPassword)

        await Student.findByIdAndUpdate(uid, {password: encryptedPassword})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada"
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
} 

export const enrollInCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);

        if (!student || !course) {
            return res.status(404).json({ message: "Estudiante o curso no encontrado" });
        }

        if (student.courses.length >= 3) {
            return res.status(400).json({ message: "No puedes inscribirte en más de 3 cursos" });
        }

        if (student.courses.includes(courseId)) {
            return res.status(400).json({ message: "Ya estás inscrito en este curso" });
        }

        student.courses.push(courseId);
        course.students.push(studentId);

        await student.save();
        await course.save();

        return res.status(200).json({ message: "Inscripción exitosa", student });
    } catch (err) {
        return res.status(500).json({ message: "Error al inscribirse en el curso", error: err.message });
    }
};

export const getStudentCourses = async (req, res) => {
    try {
        const student = await Student.findById(req.params.uid).populate("courses");

        if (!student) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        return res.status(200).json({ courses: student.courses });
    } catch (err) {
        return res.status(500).json({ message: "Error al obtener cursos", error: err.message });
    }
};

export const updateStudent = [
    uploadProfilePicture.single('profilePicture'),
    async (req, res) => {
        const { uid } = req.params;
        const { name, surname, username, email, phone, password } = req.body;

        let updateData = {};

        if (name) updateData.name = name;
        if (surname) updateData.surname = surname;
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;

        if (req.file) {
            updateData.profilePicture = req.file.filename;
        }

        if (password) {
            updateData.password = password;
        }

        try {
            const updatedStudent = await Student.findByIdAndUpdate(uid, updateData, { new: true });

            if (!updatedStudent) {
                return res.status(404).json({ message: "Estudiante no encontrado" });
            }

            return res.status(200).json({
                message: "Estudiante actualizado correctamente",
                student: updatedStudent
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error al actualizar el estudiante",
                error: err.message
            });
        }
    },
];
