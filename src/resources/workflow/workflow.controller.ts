import { _Response } from "@cloud/API";
import { Work } from "@cloud/model";
import { NextFunction, Request, Response } from "express";
import WorkflowService from "./workflow.service";

export default class WorkflowController {
  async match(req: Request, res: Response, next: NextFunction) {
    try {

      const service = new WorkflowService();

      const response: _Response<Work> = await service.match(req.body);

      return res.status(200).send(response);

    } catch (error) { next(error) }
  }
}
