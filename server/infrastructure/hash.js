import bcrypt from "bcrypt";

export const comparePasswords = async (enteredPassword, userPassword) => {
  const isPasswordsEqual = await bcrypt.compare(enteredPassword, userPassword);
  return isPasswordsEqual;
};