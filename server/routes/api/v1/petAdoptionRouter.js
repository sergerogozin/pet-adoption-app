import express from "express"
import AdoptionApplication from "../../../models/AdoptionApplication.js"

const petAdoptionRouter = new express.Router();

petAdoptionRouter.post("/", async (req, res) => {
  try {
      const applicationObject = new AdoptionApplication(req.body)
      await applicationObject.save()
      res.status(201).json({ application: applicationObject })
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
})

export default petAdoptionRouter