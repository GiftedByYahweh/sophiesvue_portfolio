export const priceRepository = (mongo) => {
  const priceModel = mongo.collection("price");

  return {
    async getAll() {
      const profile = await priceModel.find().sort({ _id: -1 }).toArray();
      return profile;
    },
    async findOne(category) {
      const profile = await priceModel.findOne({ category });
      return profile;
    },
    async create({ price, description, importantInfo, photo, category }) {
      const newPrice = await priceModel.insertOne({
        price,
        description,
        importantInfo,
        photo,
        category,
      });
      return newPrice;
    },
    async update({ price, description, importantInfo, photo, category }) {
      const updated = await priceModel.findOneAndUpdate(
        { category: category },
        {
          $set: {
            price,
            description,
            importantInfo,
            photo,
            category,
          },
        }
      );
      return updated;
    },
  };
};
