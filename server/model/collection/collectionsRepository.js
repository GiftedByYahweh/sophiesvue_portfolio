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
    async create({ title, photo, status, categoryId, categoryTitle }) {
      const collection = await collectionsModel.insertOne({
        title,
        photo,
        status,
        categoryId: new ObjectId(categoryId),
        categoryTitle,
      });
      return collection;
    },
    async alreadyExist({ categoryId, title }) {
      const collection = await collectionsModel.findOne({
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
    async findByCategoryTitles(categoryTitle) {
      const collection = await collectionsModel
        .find({ categoryTitle }, { projection: { _id: 1, title: 1 } })
        .toArray();
      return collection;
    },
    async findByCategoryId(categoryId) {
      const collections = await collectionsModel.find({
        categoryId: new ObjectId(categoryId),
      });
      return collections.toArray();
    },
    async deleteById(id) {
      const collection = await collectionsModel.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return collection;
    },
    async deleteByCategoryId(id) {
      const collections = await collectionsModel
        .find({
          categoryId: new ObjectId(id),
        })
        .toArray();
      await collectionsModel.deleteMany({
        categoryId: new ObjectId(id),
      });
      return collections;
    },
  };
};
