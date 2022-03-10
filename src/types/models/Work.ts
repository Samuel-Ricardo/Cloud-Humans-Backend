import { Project } from "./project";

  export interface Work {
    score: number,
    selected_project: Project,
    eligible_projects: Project[],
    ineligible_projects: Project[]
  }


