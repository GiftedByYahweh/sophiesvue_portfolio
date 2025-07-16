import jwt from "jsonwebtoken";

export const createToken = (payload, secretKey) => {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: "45m",
  });
  return token;
};

export const validateToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};
