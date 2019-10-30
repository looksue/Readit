module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING,
    genre: DataTypes.STRING,
    rating: DataTypes.STRING,
    cover: DataTypes.STRING
  });
  return Book;
};
