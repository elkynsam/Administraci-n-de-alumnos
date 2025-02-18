import Student from "../student/student.model.js"
import Teacher from "../teacher/teacher.model.js"
import { hash, verify } from "argon2"
import { generateJWT } from "../helpers/generate-jwt.js"

export const registerStudent = async (req, res) => {
    try{
        const data = req.body
        let profilePicture = req.file ? req.file.filename : null
        const encryptedPassword = await hash(data.password)

        data.password = encryptedPassword
        data.profilePicture = profilePicture
        const student = await Student.create(data)
        return res.status(201).json({
            message: "Student has been registered",
            name: student.name,
            email: student.email
        })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: "Student registration failed",
            error: err.message
        })
    }
}

export const registerTeacher = async (req, res) => {
    try{
        const data = req.body
        let profilePicture = req.file ? req.file.filename : null
        const encryptedPassword = await hash(data.password)

        data.password = encryptedPassword
        data.profilePicture = profilePicture
        const teacher = await Teacher.create(data)
        return res.status(201).json({
            message: "Teacher has been registered",
            name: teacher.name,
            email: teacher.email
        })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: "Teacher registration failed",
            error: err.message
        })
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const student = await Student.findOne({
            $or: [{email: email}, {username: username}]
        })

        if(!student){
            return res.status(404).json({
                message: "Credenciales inválidas",
                error: "Username o email no existe en la base de datos"
            })
        }

        const validPassword = await verify(student.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(student.id)
        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            studentDetails:{
                token: token,
                profilePicture: student.profilePicture
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error en inicio de sesión",
            error: err.message
        })
    }
}