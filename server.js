const express = require("express");
const chalk = require("chalk");
const app = express();
const {
    syncAndSeed,
    models: { Author, Book },
  } = require("./db");


  app.get("/api/books", async (req, res, next)=>{
      try{
        res.send(
            await Book.findAll({
                include: [
                    {model: Author, as: "author"}
                ]
            })
        )
      }
      catch(ex){
          next(ex);
      }
  });


  app.get("/api/authors", async (req, res, next)=>{
    try{
      res.send(
          await Author.findAll({
            include: [
              {model: Book, as: "authored"}
            ]
          })
      )
    }
    catch(ex){
        next(ex);
    }
});

  const init = async () => {
    try {
      await syncAndSeed();
      const port = process.env.PORT || 3000;
      app.listen(port, () =>
        console.log(chalk.green(`listening on port ${port}`))
      );
    } catch (err) {
      console.log(chalk.red(err.stack));
    }
  };
  
  init();