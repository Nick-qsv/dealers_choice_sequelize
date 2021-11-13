const express = require("express");
const chalk = require("chalk");
const app = express();
const {
    syncAndSeed,
    models: { Author, Book },
  } = require("./db");

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