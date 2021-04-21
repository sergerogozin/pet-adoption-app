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

adoptablePetsRouter.get("/:type/:id", async (req, res) => {
  try {
    const adoptablePet = await AdoptablePet.findById(req.params.id);
    if (adoptablePet) {
      console.log(req.params)
      adoptablePet.petType = await adoptablePet.petType();
      if (req.params.type === adoptablePet.petType.type) {
        res.status(200).json({adoptablePet: adoptablePet});
      } else {
        res.status(404).json({error: 'Not found'});
      }
    } else {
      res.status(404).json({error: 'Not found'});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({error: err});
  }
} )

export default adoptablePetsRouter;