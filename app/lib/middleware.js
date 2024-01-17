import { header } from "express-validator";

export const validateAuthHeader = [
  header("Authorization", "Please provide your Authorization token")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (!value.startsWith("Bearer") || !value.split(" ")[1]) {
        throw new Error("Invalid Authorization token");
      }
      req.headers.access_token = value.split(" ")[1];
      return true;
    }),
];
