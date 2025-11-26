import { Router } from "express";
import  AppStatus from "../controller/Status.js";


const WelcomeRouter = Router()

WelcomeRouter
    .get("/", AppStatus.welcome)
    .get("/healthCheck", AppStatus.healthCheck)

export default WelcomeRouter