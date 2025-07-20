import { ObjectId } from "@fastify/mongodb";

export const categoryRepository = (mongo) => {
  const categoryModel = mongo.collection("categories");

  return {
    async getAll() {
      await categoryModel.createIndex({ createdAt: -1 });
      const categories = await categoryModel
        .find()
        .sort({ createdAt: -1 })
        .toArray();
      return categories;
    },
    async findById(categoryId) {
      const category = await categoryModel.findOne({
        _id: new ObjectId(categoryId),
      });
      return category;
    },
    async getAllTitles() {
      await categoryModel.createIndex({ createdAt: -1 });
      const categories = await categoryModel
        .find({}, { projection: { title: 1 } })
        .sort({ createdAt: -1 })
        .toArray();
      return categories;
    },
    async createOne({ title, photo }) {
      const category = await categoryModel.insertOne({
        title,
        photo,
        createdAt: new Date(),
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
      const category = await categoryModel.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return category;
    },
  };
};
