import express from'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {config}  from 'dotenv'
import morgan from 'morgan';
import userRoutes from './routes/User.routes.js'
import errorMiddleware from './middlewares/error.middle.js';
import CourseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
config();


const app = express();
app.use(express.json());

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true


}));



// Other middleware and route declarations come here


app.use(cookieParser());
app.use(morgan('dev'));
app.use('/ping', function(req, res){
    res.send('/pong');
});

// routes of 3 modules 
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/courses',CourseRoutes)
app.use('/api/vi/Payments',paymentRoutes)

app.all('*',(req, res) =>{
    res.status(404).send('OOPS!! 404 page not found')
});

app.use(errorMiddleware);

export default app;