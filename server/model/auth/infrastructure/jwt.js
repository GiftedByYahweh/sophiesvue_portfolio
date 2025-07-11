import jwt from "jsonwebtoken";

export const createToken = (payload, secretKey) => {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: "45m",
  });
  return token;
};

const validateToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

export const checkIsUserAuth = (token, secretKey) => {
  const decoded = validateToken(token, secretKey);
  return decoded;
};
