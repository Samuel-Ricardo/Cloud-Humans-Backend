import { Experience, Internet } from "../index";

  export interface User {
    age: number,
    education_level: 'no_education' | 'high_school' | 'bachelors_degree_or_high',
    past_experiences: Experience,
    internet_test: Internet,
    writing_score: number,
    referral_code?: string
  }

