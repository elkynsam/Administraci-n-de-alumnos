import Student from "../student/student.model.js"
import Teacher from "../teacher/teacher.model.js"

export const existeEmailStudent = async(email = '') =>{
    const existe = await Student.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado previamente`)
    }
}

export const existeUsernameStudent = async(username = '') =>{
    const existe = await Student.findOne({username})
    if(existe){
        throw new Error(`El email ${username} ya fue registrado previamente`)
    }
}

export const existeEmailTeacher = async(email = '') =>{
    const existe = await Teacher.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado previamente`)
    }
}

export const existeUsernameTeacher = async(username = '') =>{
    const existe = await Teacher.findOne({username})
    if(existe){
        throw new Error(`El email ${username} ya fue registrado previamente`)
    }
}

export const studentExists = async(uid = '') =>{
    const existe = await Student.findById(uid)
    if(!existe){
        throw new Error("El estudiante no existe")
    }
}

export const teacherExists = async(uid = '') =>{
    const existe = await Teacher.findById(uid)
    if(!existe){
        throw new Error("El maestro no existe")
    }
}