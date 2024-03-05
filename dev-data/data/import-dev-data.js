const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour=require('./../../models/tourModel')
dotenv.config({ path: './config.env' });
//db string
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
// console.log( process.env);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('DB connection successfull');
  });
//read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
//import data into db
const importData = async()=> {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

// Delete All data form db
const deleteData = async()=> {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}
if (process.argv[ 2 ] === '--import') {
    importData();
} else if (process.argv[ 2 ] === '--delete') { 
    deleteData();
}
console.log(process.argv);