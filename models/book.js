//This should be utilizing the GOOD READS API to create a BOOK Table
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define(
    "Book",
    // Giving the BOOK model elements a name of type STRING
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      summary: DataTypes.STRING,
      genre: DataTypes.STRING,
      rating: DataTypes.STRING,
      cover: DataTypes.STRING
    },
    {
      //DB will not work properly without time stamp set to false, unsure why
      timestamps: false
    }
  );
  return Book;
};
