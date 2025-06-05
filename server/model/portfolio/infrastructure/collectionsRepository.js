const { CATEGORIES_NAME, COLLECTIONS_NAME } = require("../../../utils/mongodb");
const { ObjectId } = require("@fastify/mongodb");

module.exports.collectionsRepository = (mongo) => {
  const categoriesModel = mongo.collection(CATEGORIES_NAME);
  const collectionsModel = mongo.collection(COLLECTIONS_NAME);

  return {
    async getAll(category) {
      const currentCategory = await categoriesModel.findOne({
        title: category,
      });
      if (!currentCategory) return;
      const collections = await collectionsModel.find({
        categoryId: new ObjectId(currentCategory._id),
      });
      return collections.toArray();
    },
    async getFavorites() {
      const favorites = await collectionsModel
        .find({
          status: "liked",
        })
        .toArray();
      return favorites;
    },
    async create({ title, photo, status, categoryId, buffer }) {
      const collection = await collectionsModel.insertOne({
        title: title,
        photo: photo,
        status: status,
        categoryId: new ObjectId(categoryId),
        createdAt: new Date(),
        buffer: buffer,
      });
      return collection;
    },
    async findByTitle(title) {
      const collection = await collectionsModel.findOne({
        title,
      });
      return collection;
    },
    async deleteById(id) {
      const collection = await collectionsModel.deleteOne({
        _id: new ObjectId(id),
      });
      return collection;
    },
  };
};
