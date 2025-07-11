import { ALBUM_NAME, COLLECTIONS_NAME } from "../../../utils/mongodb.js";

export const albumRepository = (mongo) => {
  const collectionsModel = mongo.collection(COLLECTIONS_NAME);
  const albumModel = mongo.collection(ALBUM_NAME);

  return {
    async getAll(collection) {
      const currentCollection = await collectionsModel.findOne({
        title: collection,
      });
      if (!currentCollection) return;
      const album = await albumModel.find({
        collectionPhotos: currentCollection._id,
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
