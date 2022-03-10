import { Router } from "express";
import WorkflowController from "../../resources/workflow/workflow.controller";

const workflow_routes = Router();

const controller = new WorkflowController();

workflow_routes.post("/match-project", controller.match);

export default workflow_routes;
