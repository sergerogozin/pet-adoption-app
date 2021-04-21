import express from "express"
//import SurrenderApplication from "../../../models/SurrenderApplication.js"

const surrenderRouter = new express.Router();

surrenderRouter.post("/", async (req, res) => {
  try {
      console.log(req.body);
      /*
      const surrenderApplication = new SurrenderApplication(req.body)
      await surrenderApplication.save()
      res.status(201).json({ surrenderApplication: surrenderApplication })
      */
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err })
  }
})

export default surrenderRouter