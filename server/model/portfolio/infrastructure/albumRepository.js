const { ALBUM_NAME, COLLECTIONS_NAME } = require("../../../utils/mongodb");

module.exports.albumRepository = (mongo) => {
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
  };
};
