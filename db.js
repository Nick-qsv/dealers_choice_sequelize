const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4 } = Sequelize;
const conn = new Sequelize(
    process.env.DATABASE_URL || "postgres://localhost/dealer_books_seq"
  );

  const Author = conn.define("author", {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
  });

  Author.belongsTo(Book, {as: "author"});
  Book.hasMany(Author, {foreignKey: "authorId"});
  
  const Book = conn.define("book", {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
  });

  const syncAndSeed = async() =>{
      await conn.sync({force:true})
      const []
  }


  module.exports = {
    conn,
    syncAndSeed,
    models: { Author, Book },
  };
  