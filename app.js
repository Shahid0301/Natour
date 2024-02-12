const express = require('express');


const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// middleware....
app.use(morgan('dev'));
app.use(express.json());

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/id', updateTour);
// app.delete('/api/v1/tour', deleteTour);\



app.use('/api/v1/tours', tourRouter);
app.use('api/v1/users', userRouter);
const port = 3000;
app.listen(port, () => {
  console.log('app running on port ');
});
