import express from "express"

import PetType from "../../../models/PetType.js"

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

petTypesRouter.get("/pets/:type", async (req, res) => {
    try{
        const petType = await PetType.findByType(req.params.type);
        const adoptablePets = await petType.adoptablePets();
        petType.adoptablePets = adoptablePets;
        res.status(200).json({petType: petType})
    } catch(err) {
        console.log(err);
        res.status(500).json({error: err});
    }
})

export default petTypesRouter;