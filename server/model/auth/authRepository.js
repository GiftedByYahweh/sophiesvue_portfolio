export const authRepository = (mongo) => {
  const authModel = mongo.collection("auth");

  return {
    async findUser(username) {
      const user = await authModel.findOne({ username });
      return user;
    },
  };
};
