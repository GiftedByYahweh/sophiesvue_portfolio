const { AUTH_NAME } = require("../../../utils/mongodb");

module.exports.authRepository = (mongo) => {
  const authModel = mongo.collection(AUTH_NAME);

  return {
    async findUser(username) {
      const user = await authModel.findOne({ username });
      return user;
    },
  };
};
