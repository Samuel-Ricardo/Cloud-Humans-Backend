import { User, Work } from "@cloud/model";
import { _Response } from "@cloud/API";
import { educational_levels } from "../../config/educational_level";
import projects from "../../storage/projects";

function generateScore(user: User): number {
  if (user.age < 18) return -1;

  let score = 0;

  let level = user.education_level
  const {
    BACHELORS_DEGREE_OR_HIGH,
    HIGH_SCHOOL,
    NO_EDUCATION
  } = educational_levels;


  level === BACHELORS_DEGREE_OR_HIGH
    ? score = score + 2

    : level === HIGH_SCHOOL ? score = score++ : false;

  if (user.past_experiences.sales) score = score + 5;
  if (user.past_experiences.support) score = score + 3;

  if (user.internet_test.download_speed >= 50) { score = score++;}
  else if (user.internet_test.download_speed <= 5) { score = score--;}

  if (user.internet_test.upload_speed >= 50) { score = score++;}
  else if (user.internet_test.upload_speed <= 5) { score = score--;}

  user.writing_score < 0.3 ? score--
    : user.writing_score <= 0.7 ? score++
      : user.writing_score <= 1 ? score = score + 2 : false;


  if (user.referral_code === "token1234") score++;

      return score;
}


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
