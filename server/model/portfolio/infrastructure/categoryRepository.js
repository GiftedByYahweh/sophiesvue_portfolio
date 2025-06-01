const { CATEGORIES_NAME } = require("../../../utils/mongodb");
const { ObjectId } = require("@fastify/mongodb");

module.exports.categoryRepository = (mongo) => {
  const categoryModel = mongo.collection(CATEGORIES_NAME);

  return {
    async getAll() {
      await categoryModel.createIndex({ createdAt: -1 });
      const categories = await categoryModel
        .find()
        .sort({ createdAt: -1 })
        .toArray();
      return categories;
    },
    async getAllTitles() {
      await categoryModel.createIndex({ createdAt: -1 });
      const categories = await categoryModel
        .find({}, { projection: { title: 1 } })
        .sort({ createdAt: -1 })
        .toArray();
      return categories;
    },
    async createOne({ title, photo, buffer }) {
      const category = await categoryModel.insertOne({
        title,
        photo,
        createdAt: new Date(),
        buffer,
      });
      return category;
    },
    async findByTitle(title) {
      const category = await categoryModel.findOne({
        title,
      });
      return category;
    },
    async deleteById(id) {
      const elToDelete = await categoryModel.deleteOne({
        _id: new ObjectId(id),
      });
      return elToDelete;
    },
  };
};
