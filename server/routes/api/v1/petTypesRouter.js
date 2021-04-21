import express from "express"

import PetType from "../../../models/PetType.js"
import AdoptionApplication from "../../../models/AdoptionApplication.js"


const petTypesRouter = new express.Router();

petTypesRouter.get("/", async (req, res) => {
    try {
        const petTypes = await PetType.findAll();
        res.status(200).json({ petTypes: petTypes })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
})

petTypesRouter.post("/", async (req, res) => {
    try {
        const applicationObject = new AdoptionApplication(req.body)
        await applicationObject.save()
        res.status(201).json({ application: applicationObject })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
})


export default petTypesRouter;