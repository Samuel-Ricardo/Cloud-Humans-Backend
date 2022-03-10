import WorkflowController from "../src/resources/workflow/workflow.controller"
import WorkflowService from "../src/resources/workflow/workflow.service"
import { User } from "../src/types/models/User";
import { generateScore } from "../src/utils";

jest.mock('../src/resources/workflow/workflow.controller')
jest.mock("../src/resources/workflow/workflow.service");
//jest.mock("../src/types/models/User");

const controllerM = WorkflowController as jest.Mock<WorkflowController>
const serviceM = WorkflowService as jest.Mock<WorkflowService>


function setup() {

  const controller = new WorkflowController as jest.Mocked<WorkflowController>;
  const service = new WorkflowService as jest.Mocked<WorkflowService>;

  const user:User = {
    age: 27,
    education_level: 'bachelors_degree_or_high',
    past_experiences: { sales: true, support: true },
    internet_test: { download_speed: 80, upload_speed: 78.9 },
    writing_score: 1,
    referral_code: 'token1234'
  }

  //const controller = new WorkflowController();
  //const service = new WorkflowService();
  return {
    controller,
    service,
    user
  }
}

describe('Workflow Service', () => {

  it('Should match project', async () => {

    const { controller, service, user } = setup();

    const result = await service.match(user);

    expect(result).toBe({
      data: {
          eligible_projects: [
              {
                  title: "Calculate the Dark Matter of the universe for Nasa",
                  score: 10
              },
              {
                  title: "Determine if the Schrodinger's cat is alive",
                  score: 5
              },
              {
                  title: "Attend to users support for a YXZ Company",
                  score: 3
              },
              {
                  title: "Collect specific people information from their social media for XPTO Company",
                  score: 2
              }
          ],
          ineligible_projects: [],
          score: 13,
          selected_project: {
              title: "Calculate the Dark Matter of the universe for Nasa",
              score: 10
          }
      },
      error: false,
      message: "Your selected project is Calculate the Dark Matter of the universe for Nasa",
      status: 200
  })
  })

  it('Should throw error because atributes are not valid', async () => {
    const { controller, service } = setup();
    const user:User = {
      age: 15,
      education_level: "no_education",
      past_experiences: { sales: true, support: false },
      internet_test: { download_speed: 4, upload_speed: 3 },
      writing_score: 0.2,
      referral_code: 'token124'
    }

    const result = await service.match(user);

    expect(result).toBe(undefined)
  })

  it('Should throw error because some required atribute are not send', async () => {
    const { service } = setup();
    const user = {
      age: 35,
      education_level: "no_education",
      internet_test: { download_speed: 40.8, upload_speed: 35.5 },
      writing_score: 0.75,
      referral_code: 'token1234'
    }

    expect(await service.match(user)).toThrowError
  })

})

describe('score calculation', () => {
  it('should return the correct calculation', () => {
    const { user } = setup();

    expect(generateScore(user)).toBe(13);
  })
})
