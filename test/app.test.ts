import WorkflowController from "../src/resources/workflow/workflow.controller"
import WorkflowService from "../src/resources/workflow/workflow.service"
import { User } from "../src/types/models/User";

jest.mock('../src/resources/workflow/workflow.controller')
jest.mock("../src/resources/workflow/workflow.service");
//jest.mock("../src/types/models/User");

//const controllerM = WorkflowController as jest.Mock<WorkflowController>
//const serviceM = WorkflowService as jest.Mock<WorkflowService>


function setup() {

  //const controller = new WorkflowController as jest.Mocked<WorkflowController>;
  //const service = new WorkflowService as jest.Mocked<WorkflowService>;

  const controller = new WorkflowController();
  const service = new WorkflowService();
  return {
    controller,
    service
  }
}

describe('Workflow Service', () => {

})
