import express from "express"
import clientRouter from "./clientRouter.js"
import petTypesRouter from "./api/v1/petTypesRouter.js"
import petAdoptionRouter from "./api/v1/petAdoptionRouter.js"
import adoptablePetsRouter from "./api/v1/adoptablePetsRouter.js"
import surrenderRouter from "./api/v1/surrenderRouter.js"

const rootRouter = new express.Router()
rootRouter.use("/api/v1/petTypes", petTypesRouter);
rootRouter.use("/api/v1/petAdoption", petAdoptionRouter);
rootRouter.use("/api/v1/adoptablePets", adoptablePetsRouter);
rootRouter.use("/api/v1/surrender", surrenderRouter);
rootRouter.use("/", clientRouter)
export default rootRouter
