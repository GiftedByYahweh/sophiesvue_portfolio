import { ApiError } from "../../infrastructure/errorHandler.js";
import { comparePasswords } from "../../infrastructure/hash.js";
import { createToken } from "../../infrastructure/jwt.js";
import { authRepository } from "./authRepository.js";

const login = async (db, { username, password }, secret) => {
  if (!username || !password) ApiError.BadRequest("Invalid data");
  const currentUser = await authRepository(db).findUser(username);
  if (!currentUser) ApiError.BadRequest("Wrong username or password");
  const isPasswordCorrect = await comparePasswords(
    password,
    currentUser.password
  );
  if (!isPasswordCorrect) ApiError.BadRequest("Wrong username or password");
  return createToken({ id: currentUser._id }, secret);
};

export const authService = (db) => ({
  login: (payload, secret) => login(db, payload, secret),
});
