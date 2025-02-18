import { body, param } from "express-validator";
import { existeEmailStudent, existeEmailTeacher, existeUsernameStudent, existeUsernameTeacher, studentExists, teacherExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

export const registerValidatorStudent = [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("username","El username es obligatorio").not().isEmpty(),
    body("email", "El correo es obligatorio").not().isEmpty(),
    body("email", "Ingrese un correo válido").isEmail(),
    body("email").custom(existeEmailStudent),
    body("username").custom(existeUsernameStudent),
    validarCampos,
    deleteFileOnError
]

export const registerValidatorTeacher = [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("username","El username es obligatorio").not().isEmpty(),
    body("email", "El correo es obligatorio").not().isEmpty(),
    body("email", "Ingrese un correo válido").isEmail(),
    body("email").custom(existeEmailTeacher),
    body("username").custom(existeUsernameTeacher),
    validarCampos,
    deleteFileOnError
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Ingrese un correo válido"),
    body("username").optional().isString().withMessage("Ingrese un username válido"),
    body("password").isLength({min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    validarCampos,
    deleteFileOnError
]

export const getStudentByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(studentExists),
    validarCampos,
    deleteFileOnError
]

export const deleteStudentValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(studentExists),
    validarCampos,
    deleteFileOnError
]

export const getTeacherByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(teacherExists),
    validarCampos,
    deleteFileOnError
]

export const deleteTeacherValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(teacherExists),
    validarCampos,
    deleteFileOnError
]

export const updatePasswordValidatorStudent = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(studentExists),
    body("newPassword").isLength({min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    validarCampos,
    deleteFileOnError
]

export const updatePasswordValidatorTeacher = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(teacherExists),
    body("newPassword").isLength({min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    validarCampos,
    deleteFileOnError
]