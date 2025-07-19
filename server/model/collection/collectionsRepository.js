import { ObjectId } from "@fastify/mongodb";

export const collectionsRepository = (mongo) => {
  const collectionsModel = mongo.collection("collections");

  return {
    async getAll(categoryId) {
      const collections = await collectionsModel.find({
        categoryId: categoryId,
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
    async alreadyExist({ categoryId, title }) {
      const collection = await collectionsModel.find({
        categoryId: new ObjectId(categoryId),
        title,
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
      const collection = await collectionsModel.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return collection;
    },
    async deleteByCategoryId(id) {
      const collection = await collectionsModel.deleteMany({
        categoryId: new ObjectId(id),
      });
      return collection;
    },
  };
};
