import { Router } from "express";

const workflow_routes = Router();

workflow_routes.use("/match-project", (req, res) => {
  res.status(200).send({message: "Match Project"})
})

export default workflow_routes;
