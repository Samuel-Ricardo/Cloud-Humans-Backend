declare module "@cloud/model" {

  export interface Work {
    score: number,
    selected_project: Project,
    eligible_projects: Project[],
    ineligible_projects: Project[]
  }

}
