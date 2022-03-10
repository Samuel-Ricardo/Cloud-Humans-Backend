import { User, Work } from "@cloud/model";
import { _Response } from "@cloud/API";
import projects from "../../storage/projects";
import { generateScore } from "../../utils";

export default class WorkflowService {

  async match(value: number, user: User): Promise<_Response<Work>> {

    const work: Work = {} as Work;
    work.score = generateScore(user);

    projects.forEach(( project, index) => {
      work.score >= project.score
        ? work.eligible_projects.push(project)
        : work.ineligible_projects.push(project)
    })

    work.eligible_projects.forEach(
      (project, index, all) => {

        project.score >= all[index].score
          ?work.selected_project = project
          :false
      }
    )

    const response: _Response<Work> = {
      data: work,
      error: false,
      message: `Your selected project is ${work.selected_project}`,
      status: 200,
    };

    return response;
  }
}
