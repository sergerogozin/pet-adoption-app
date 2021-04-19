import express from "express"

import PetType from "../../../Models/PetType.js"

const petsRouter = new express.Router();

petsRouter.get("/types", async (req, res) => {
    try{
        const petTypes = await PetType.findAll();
        res.status(200).json({petTypes: petTypes})
    } catch(err) {
        console.log(err);
        res.status(500).json({error: err});
    }
})

export default petsRouter;