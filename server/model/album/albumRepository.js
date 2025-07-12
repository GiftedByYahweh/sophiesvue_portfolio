export const albumRepository = (mongo) => {
  const albumModel = mongo.collection("photos");

  return {
    async getAll({ collectionId, categoryId }) {
      const album = await albumModel.find({
        collectionId,
        categoryId,
      });
      return album.toArray();
    },
    async deleteManyById({ categoryId, collectionId }) {
      const deleted = await albumModel.deleteMany({
        categoryId,
        collectionId,
      });
      return deleted;
    },
  };
};
