import express from "express";
import { getUserProfile, login, logout, Signup } from "../controller/user.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.post("/signup",Signup);

router.post("/login",login);

router.post("/logout",logout);

router.get("/getUserProfile",secureRoute,getUserProfile);

export default router;
