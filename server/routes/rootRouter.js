import express from "express"
import clientRouter from "./clientRouter.js"
import petTypesRouter from "./api/v1/petTypesRouter.js"
import adoptablePetsRouter from "./api/v1/adoptablePetsRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/petTypes", petTypesRouter);
rootRouter.use("/api/v1/adoptablePets", adoptablePetsRouter);

rootRouter.use("/", clientRouter)

export default rootRouter
