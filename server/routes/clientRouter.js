import express from "express"

const router = new express.Router()

router.get("/", (req, res) => {
  res.redirect("/pets")
})

const clientRoutes = ["/pets"]
router.get(clientRoutes, (req, res) => {
  res.render("home")
})

export default router
