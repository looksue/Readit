module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define(
    "Book",
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      summary: DataTypes.STRING,
      genre: DataTypes.STRING,
      rating: DataTypes.STRING,
      cover: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );
  return Book;
};
