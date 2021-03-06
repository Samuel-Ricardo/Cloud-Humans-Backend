
import { educational_levels } from "../config/educational_level";
import { User } from "../types/models/User";

export function generateScore(user: User): number {
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
