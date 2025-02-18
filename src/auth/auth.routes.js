import { Router } from "express";
import { registerStudent, registerTeacher, login} from "./auth.controller.js"
import { registerValidatorStudent, registerValidatorTeacher, loginValidator} from "../middlewares/check-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-upload.js";

const router = Router()

router.post(
    "/registerStudent",
    uploadProfilePicture.single("profilePicture"), 
    registerValidatorStudent, 
    registerStudent
)
router.post(
    "/registerTeacher",
    uploadProfilePicture.single("profilePicture"), 
    registerValidatorTeacher, 
    registerTeacher
)

router.post("/login", loginValidator, login)

export default router
