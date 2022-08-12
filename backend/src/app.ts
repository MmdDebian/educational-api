require('dotenv').config();

import express, { Application } from 'express' ;
import morgan from 'morgan';
import cors from 'cors' ;
import routes from './routes/' ;

const app:Application = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(routes);

export default app ;