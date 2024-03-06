const express = require('express');
const AppError = require('./utils/appError');
const globalErrorHandler=require('./controllers/errorController')
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// middleware....
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`))
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/id', updateTour);
// app.delete('/api/v1/tour', deleteTour);\
// app.use((req, res, next) => {
//   console.log("hello from the middleware");
//   next();
// });
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); 
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//not specified route then
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'failed',
  //   message: `Cant find ${req.originalUrl} on this server!`
  // })
  // const err = new Error(`Cant find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  //if any argument passed to next then it knows that it will be an error
  next(new AppError(`Cant find ${req.originalUrl} on this server!`,404));
});
//if we specify four parameter then express know that it is for error handingling
app.use(globalErrorHandler);
module.exports = app;
