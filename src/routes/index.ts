import { Router } from "express";

const routes = Router();

routes.use("/", (req, res) => {
  res.status(200).send({message: "Welcome to API"})
})

export default routes;
