import { Router } from "express";
import workflow_routes from "./Workflow/workflow.routes";

const routes = Router();

routes.get("/", (req, res) => {
  res.status(200).send({message: "Welcome to API"})
})

routes.use("/workflow", workflow_routes)

export default routes;
