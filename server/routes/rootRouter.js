import express from "express"
import clientRouter from "./clientRouter.js"
import petTypesRouter from "./api/v1/petTypesRouter.js"
import petAdoptionRouter from "./api/v1/petAdoptionRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/petTypes", petTypesRouter);
rootRouter.use("/api/v1/petAdoption", petAdoptionRouter);

rootRouter.use("/", clientRouter)

export default rootRouter
