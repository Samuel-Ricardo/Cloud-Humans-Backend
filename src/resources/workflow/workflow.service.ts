import projects from "../../storage/projects";
import { _Response } from "../../types/API/Response";
import { User } from "../../types/models/User";
import { Work } from "../../types/models/Work";
import { generateScore } from "../../utils";

export default class WorkflowService {

  async match(user: User): Promise<_Response<Work>> {

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
