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

export const checkIsUserAuth = (req, secretKey) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("Unauthorized");
    const decoded = validateToken(token, secretKey);
    return decoded;
  } catch (err) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }
};
