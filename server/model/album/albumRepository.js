import { ObjectId } from "@fastify/mongodb";

export const albumRepository = (mongo) => {
  const albumModel = mongo.collection("photos");

  return {
    async getAll(collectionId) {
      const album = await albumModel
        .find({
          collectionId: collectionId.toString(),
        })
        .sort({ _id: -1 });
      return album.toArray();
    },
    async create({ photo, collectionId, type }) {
      const album = await albumModel.insertOne({
        photo,
        collectionId,
        type,
      });
      return album;
    },
    async deleteByCollectionId(collectionId) {
      const albums = await albumModel
        .find({ collectionId: collectionId.toString() })
        .toArray();
      await albumModel.deleteMany({
        collectionId: collectionId.toString(),
      });
      return albums;
    },
    async deleteManyById({ categoryId, collectionId }) {
      const deleted = await albumModel.deleteMany({
        categoryId,
        collectionId,
      });
      return deleted;
    },
    async deleteById(id) {
      const deleted = await albumModel.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return deleted;
    },
  };
};
