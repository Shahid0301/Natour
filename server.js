const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
//db string
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
  );
  const app = require('./app');
  // console.log( process.env);
  process.on('uncaughtException', err => {
    console.log('Uncaught Excepitons! Shutting down');
    console.log(err.name, err.message);
    process.exit(1);
  
  });
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('DB connection successfull');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('app running on port ');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection Shutting down');
  server.close(() => {
    process.exit(1);
  });

});
