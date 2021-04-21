import express from "express"

import AdoptablePet from "../../../models/AdoptablePet.js"

const adoptablePetsRouter = new express.Router();

adoptablePetsRouter.get("/", async (req, res) => {
  try{
    const adoptablePets = await AdoptablePet.findAll();
    res.status(200).json({adoptablePets: adoptablePets});
  } catch(err) {
    console.log(err);
    res.status(500).json({error: err});
  }
})

export default adoptablePetsRouter;