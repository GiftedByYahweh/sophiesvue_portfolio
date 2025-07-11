import { AUTH_NAME } from "../../../utils/mongodb.js";

export const authRepository = (mongo) => {
  const authModel = mongo.collection(AUTH_NAME);

  return {
    async findUser(username) {
      const user = await authModel.findOne({ username });
      return user;
    },
  };
};
