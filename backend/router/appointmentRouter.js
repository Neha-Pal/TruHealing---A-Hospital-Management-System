import express from "express";
import { deleteAppointments, getAppointments, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/post",isPatientAuthenticated, postAppointment);
router.get("/get", isAdminAuthenticated,getAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointments);

export default router;

